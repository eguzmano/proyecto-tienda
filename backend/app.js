// app.js
import cors from "cors";
import "dotenv/config";
import express from "express";
import { cuncunaLogs } from "./middlewares/log.middleware.js";

import authRoute from "./routes/auth.route.js";
import usuariosRouter from "./routes/clientes.route.js";
import categoriaRoute from "./routes/categoria.route.js";
import productoRoute from "./routes/producto.route.js";
import cometarioRoute from "./routes/comentario.route.js";
import carroRoute from "./routes/carro.route.js";
import favoritoRoute from "./routes/favorito.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cuncunaLogs);

// Auth
app.use("/api/auth", authRoute);
// Usuarios
app.use("/api/user", usuariosRouter);
// Categorías
app.use("/api/categorias", categoriaRoute);
// Carro / Favoritos
app.use("/api", carroRoute);
app.use("/api", favoritoRoute);
// Productos / Comentarios
app.use("/api/productos", productoRoute);
app.use("/api/comentarios", cometarioRoute);

// 404
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
