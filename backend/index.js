import cors from "cors";
import "dotenv/config";
import express from "express";
import { cuncunaLogs } from './middlewares/log.middleware.js'

import authRoute from "./routes/auth.route.js";
import usuariosRouter from './routes/clientes.route.js'
import categoriaRoute from "./routes/categoria.route.js"

import productoRoute from "./routes/producto.route.js";
import ventaRoute from "./routes/venta.route.js";
import comentarioRoute from "./routes/comentario.route.js";
import carroRoute from "./routes/carro.route.js"
import favoritoRoute from "./routes/favorito.route.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(cuncunaLogs)
// Auth: login y registro
app.use("/api/auth", authRoute); 

// Usuarios: perfil y CRUD
app.use("/api/user", usuariosRouter);

//Categorias
app.use("/api/categorias", categoriaRoute)

//carro
app.use("/api", carroRoute)

//favoritos
app.use("/api", favoritoRoute)

//Ventas
app.use("/api/ventas", ventaRoute); 

//Productos
app.use("/api/productos", productoRoute); 

app.use("/api/comentarios", comentarioRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
