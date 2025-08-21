// controllers/checkout.controller.js
import pool from "../../db/config.js";

export const checkoutController = async (req, res) => {
  const clienteId = parseInt(req.params.clienteId);
  if (!Number.isInteger(clienteId)) {
    return res.status(400).json({ error: "clienteId inválido" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 0) Carrito con items
    const cart = await client.query(
      `SELECT c.producto_id, c.cantidad, p.precio
         FROM carros c
         JOIN productos p ON p.id = c.producto_id
        WHERE c.cliente_id = $1`,
      [clienteId]
    );
    if (cart.rowCount === 0) throw new Error("El carrito está vacío");

    // 1) Crear venta
    const ventaRes = await client.query(
      `INSERT INTO ventas (cliente_id, total, estado, fecha)
       VALUES ($1, 0, 'pendiente', now())
       RETURNING id`,
      [clienteId]
    );
    const ventaId = ventaRes.rows[0].id;

    // 2) Insertar detalle desde carrito (snapshot precio actual)
    await client.query(
      `INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario)
       SELECT $1, c.producto_id, c.cantidad, p.precio
         FROM carros c
         JOIN productos p ON p.id = c.producto_id
        WHERE c.cliente_id = $2`,
      [ventaId, clienteId]
    );

    // 3) Descontar stock de forma atómica (falla si no alcanza)
    //    - Actualiza productos solo cuando p.stock >= dv.cantidad
    //    - Verifica que se actualizaron TODOS los items de la venta
    const stockRes = await client.query(
      `
      WITH dv_items AS (
        SELECT producto_id, cantidad
          FROM detalle_venta
         WHERE venta_id = $1
      ),
      upd AS (
        UPDATE productos p
           SET stock = p.stock - dv.cantidad
          FROM dv_items dv
         WHERE p.id = dv.producto_id
           AND p.stock >= dv.cantidad
      RETURNING p.id
      )
      SELECT
        (SELECT COUNT(*) FROM dv_items)  AS total_items,
        (SELECT COUNT(*) FROM upd)       AS updated_items;
      `,
      [ventaId]
    );
    const { total_items, updated_items } = stockRes.rows[0];
    if (Number(updated_items) !== Number(total_items)) {
      throw new Error("Stock insuficiente para uno o más productos");
    }

    // 4) Calcular total
    const totalRes = await client.query(
      `SELECT SUM(cantidad * precio_unitario)::decimal AS total
         FROM detalle_venta
        WHERE venta_id = $1`,
      [ventaId]
    );
    const total = totalRes.rows[0].total ?? 0;

    await client.query(
      `UPDATE ventas SET total = $2 WHERE id = $1`,
      [ventaId, total]
    );

    // 5) Vaciar carrito
    await client.query(`DELETE FROM carros WHERE cliente_id = $1`, [clienteId]);

    await client.query("COMMIT");
    return res.status(201).json({
      message: "Compra creada",
      venta: { id: ventaId, cliente_id: clienteId, total, estado: "pendiente" }
    });
  } catch (e) {
    await client.query("ROLLBACK");
    return res.status(400).json({ error: e.message });
  } finally {
    client.release();
  }
};
