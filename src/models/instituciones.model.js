import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const institucionesModel = sequelize.define('instituciones',{
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
 },
 nombre:{
    type: DataTypes.STRING(200),
    allowNull:false,

 },
 cuit:{
    type: DataTypes.STRING(20),
    allowNull: false,
    unique:true,
 },
direccion_id:{
    type: DataTypes.STRING(100),
    allowNull:false,
    }
})