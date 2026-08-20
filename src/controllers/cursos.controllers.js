import { cursosModel } from "../models/cursos.model.js";
export const agregarCursos = async (req,res) => {
    try {
        const {titulo,descripcion,duracion_curso,modalidad,cupo_maximo,institucion_id,direccion_dictado_id} = req.body;
        const errores = [];

    // Validaciones independientes
    if (!titulo) errores.push("No puede estar sin titulo, ingresa un titulo");
    if (!descripcion) errores.push("Es obligatorio que tenga una descripcion el curso");
    if (!duracion_curso) errores.push("Agrega la duracion");
    if (!modalidad) errores.push("Modalidad obligatoria");
    if (!cupo_maximo) errores.push("Agrega el cupo maximo");
    if (!institucion_id) errores.push("Ingresa la institucion");
    if (!direccion_dictado_id) errores.push("Ingresa la direccion de dictado");

    // Si hay al menos un error, devolvemos la lista completa
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
        const curso = await cursosModel.create({
            titulo,
            descripcion,
            duracion_curso,
            modalidad,
            cupo_maximo,
            institucion_id,
            direccion_dictado_id
        })
        return res.status(201).json({mensaje:'Curso agregado correctamente',curso})
    } catch (error) {
        return res.status(500).json({mensaje:'error al poder agregar en la base de datos',error:error.message})
    }
}
export const verTodosCursos = async (req,res) => {
    try {
        const cursos = await cursosModel.findAll();
        return res.status(200).json({mensaje:'Estos son todos los cursos',cursos})
    } catch (error) {
        return res.status(500).json({mensaje:'Error en poder agregar',error:error.message})
    }
}
export const borrarCursos = async (req,res) =>{
    try {
        const eliminarCursos = await cursosModel.destroy({where:{id: req.params.id}});
        if (eliminarCursos) {
            return res.status(200).json({mensaje:'curso eliminado con exito'})
        }else{
            return res.status(404).json({mensaje:'no se encontró este curso'})
        }
    } catch (error) {
        return res.status(500).json({mensaje:'Error al borrar el curso',error:error.message})
    }
}