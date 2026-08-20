import { institucionesModel } from "../models/instituciones.model.js";
export const agregarInstitucion = async (req,res) => {
    try {
        const {nombre,cuit,direccion_id,} = req.body;
        const errores = [];
        if (!nombre) errores.push("se necesita un nombre");
    if (!cuit) errores.push("Es obligatorio que tenga un cuit");
    if (!direccion_id) errores.push("se necesita en que direccion está");
    if (errores.length > 0) {
        return res.status(404).json({errores})
    }
    const institucion = await institucionesModel.create({
        nombre,
        cuit,
        direccion_id,
    })
    return res.status(201).json({mensaje:'Institucion agregada'});
    } catch (error) {
        return res.status(500).json({mensaje:'Error al poder agregar institucion',error:error.message})
    }
}
export const verTodasInstituciones = async (req,res) =>{
    try {
        const institucion = await institucionesModel.findAll();
        return res.status(200).json({mensaje:'Estas son las instituciones',institucion});

    } catch (error) {
        return res.status(500).json({mensaje:'Error al ver las instituciones',error:error.message})
    }
}
export const eliminarInstituciones = async (req,res) => {
    try {
        const borraInstitucion = await institucionesModel.destroy({where:{id:req.params.id}});
        if (eliminarInstituciones) {
            return res.status(201).json({mensaje:'Borrado institucion con exito'})
        }else {
            return res.status(404).json({mensaje:'institucion no fue encontrada'})
        }
    } catch (error) {
        return res.status(500).json({mensaje:'Error al poder eliminar instituciones',error:error.message})
    }
}