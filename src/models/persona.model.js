import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const PersonaModel = sequelize.define(
  "Persona",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "personas",
    timestamps: true,
    underscored: true,
  },
);
