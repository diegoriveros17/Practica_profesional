import { cursosModel } from "../models/cursos.model.js";
export const agregarCursos = async (req,res) => {
    try {
        const curso = await cursosModel.create(req.body);
        return res.status(201).json({mensaje:'Curso agregado correctamente',curso})
    } catch (error) {
        return res.status(500).json({mensaje:'error al poder agregar en la base de datos',error:error.message})
    }
}