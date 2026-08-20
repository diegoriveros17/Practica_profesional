import { Router } from "express"
import { agregarCursos, borrarCursos, verTodosCursos } from "../controllers/cursos.controllers.js";
export const cursosRoutes = Router();

cursosRoutes.post('/cursos',agregarCursos);
cursosRoutes.get('/cursos',verTodosCursos);
cursosRoutes.delete('/cursos/:id',borrarCursos);