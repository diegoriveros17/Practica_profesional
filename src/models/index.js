import { sequelize } from "../config/database.js";
import { PersonaModel } from "./persona.model.js";
import { RolModel } from "./rol.model.js";
import { UsuarioModel } from "./usuario.model.js";

// Relación 1:1 entre Persona y Usuario
PersonaModel.hasOne(UsuarioModel, { foreignKey: "persona_id", as: "usuario" });
UsuarioModel.belongsTo(PersonaModel, {
  foreignKey: "persona_id",
  as: "persona",
});

// Relación 1:N entre Rol y Usuario
RolModel.hasMany(UsuarioModel, { foreignKey: "rol_id", as: "usuarios" });
UsuarioModel.belongsTo(RolModel, { foreignKey: "rol_id", as: "rol" });

export { sequelize, PersonaModel, RolModel, UsuarioModel };
