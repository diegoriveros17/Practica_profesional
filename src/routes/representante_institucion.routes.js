import { Router } from "express";
import { agregarRepresentanteIntu, getTodayRepresentantes } from "../controllers/representantes.inti.controllers.js";

export const representanteIntiRouter = Router();

representanteIntiRouter.post('/representanteIntu',agregarRepresentanteIntu);
representanteIntiRouter.get('/representanteIntu',getTodayRepresentantes);