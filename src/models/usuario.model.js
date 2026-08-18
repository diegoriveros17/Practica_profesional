import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const UsuarioModel = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email_login: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    acepta_notificaciones: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    underscored: true,
  },
);
