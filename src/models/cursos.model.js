
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
export const cursosModel = sequelize.define("cursos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull:false,
  },
  descripcion:{
    type: DataTypes.STRING(100),
    allowNull:false,
  },
  duracion_curso:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modalidad:{
    type: DataTypes.STRING(50),
    allowNull:false,
  },
  cupo_maximo:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  institucion_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  direccion_dictado_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
  }
},{
  tableName: "cursos",
  timestamps: true,
  createdAt: "created_at",
  updateAt:"update_At",
});
