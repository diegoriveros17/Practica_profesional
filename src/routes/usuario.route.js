import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controllers/usuario.controller.js";

export const userRouter = Router();

// POST http://localhost:3000/api/usuarios/registro
userRouter.post("/register", registrarUsuario);

// POST http://localhost:3000/api/usuarios/login
userRouter.post("/login", loginUsuario);
