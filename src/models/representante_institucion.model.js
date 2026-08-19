import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
export const representanteInstituModel = sequelize.define('representante_institucion',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull:false,

    },
    institucion_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cargo:{
        type: DataTypes.STRING(100),
        allowNull:false,

    }
})