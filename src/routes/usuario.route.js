import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controllers/usuario.controller.js";

export const routerRegistro = Router();

// POST http://localhost:3000/api/usuarios/registro
routerRegistro.post("/registro", registrarUsuario);

// POST http://localhost:3000/api/usuarios/login
router.post("/login", loginUsuario);
