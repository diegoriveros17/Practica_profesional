import { Router } from "express";
import { agregarInstitucion, eliminarInstituciones, verTodasInstituciones } from "../controllers/instituciones.controllers.js";

export const institucionRouter = Router();
institucionRouter.post('/institucion',agregarInstitucion)
institucionRouter.get('/institucion',verTodasInstituciones)
institucionRouter.delete('/institucion/:id',eliminarInstituciones);