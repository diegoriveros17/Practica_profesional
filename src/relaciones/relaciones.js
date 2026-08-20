import { cursosModel } from "../models/cursos.model.js";
import { institucionesModel } from "../models/instituciones.model.js";
import { representanteInstituModel } from "../models/representante_institucion.model.js";
//relacion de instituciones a cursos 
institucionesModel.hasMany(cursosModel,{foreignKey:'institucion_id',as:'cursos'});
//relacion de cursos a instituciones 
cursosModel.belongsTo(institucionesModel,{foreignKey:'institucion_id',as:'instituciones'});
//Instituciones tiene muchos representantes
institucionesModel.hasMany(representanteInstituModel,{foreignKey:"institucion_id"});
//representante pertenece a instituciones
representanteInstituModel.belongsTo(institucionesModel,{foreignKey:'institucion_id',as:'institucion'})
