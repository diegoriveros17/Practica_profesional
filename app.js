import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/usuario.route.js";
import { authRouter } from "./src/routes/auth.route.js";
import { RolModel } from "./src/models/rol.model.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Agrupamos las rutas bajo /api/usuarios
// app.use("/api/users", userRouter);

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await startDB();
  await inicializarRoles(); // <-- Ejecutamos la carga inicial
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const inicializarRoles = async () => {
  try {
    const rolesExistentes = await RolModel.count();

    // Si la tabla de roles está vacía, insertamos los valores básicos
    if (rolesExistentes === 0) {
      await RolModel.bulkCreate([
        { nombre: "ciudadano" },
        { nombre: "representante" },
        { nombre: "admin" },
      ]);
      console.log("✅ Roles iniciales creados con éxito.");
    }
  } catch (error) {
    console.error("❌ Error al inicializar roles:", error);
  }
};
