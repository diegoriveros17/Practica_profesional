import { representanteInstituModel } from "../models/representante_institucion.model.js";

export const agregarRepresentanteIntu = async (req,res) => {
    try {
        const {usuario_id,institucion_id,cargo} = req.body;
        const errores = [];
        if(!usuario_id) errores.push('el usuario es obligaritorio');
        if(!institucion_id) errores.push('institucion debe ser obligatorio');
        if(!cargo) errores.push('el cargo debe ser obligatorio');
        if (errores.length > 0) {
            return res.status(404).json({errores});
        }
        const representanteInstitu = await representanteInstituModel.create({
            usuario_id,
            institucion_id,
            cargo
        });
        return res.status(201).json({mensaje:'representante agregado con exito',representanteInstitu})
    } catch (error) {
        return res.status(500).json({mensaje:'uffs,error al agregar representantes',error:error.message
        })
    }
}
export const getTodayRepresentantes = async (req,res) =>{
    try {
        const representanteInstitu = await representanteInstituModel.findAll()
        return res.status(200).json({mensaje:'estos son todos los representantes de cada intitucion',representanteInstitu})
    } catch (error) {
        return res.status(500).json({mensaje:'Error al ver todos los representantes',error:error.message})
    }
}