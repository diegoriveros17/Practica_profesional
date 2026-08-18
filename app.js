import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuario.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Agrupamos las rutas bajo /api/usuarios
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
