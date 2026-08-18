import { type } from "node:os";
import { DataTypes, Sequelize } from "sequelize";
import { FOREIGNKEYS } from "sequelize/lib/query-types";
export const cursosModel = Sequelize.define("cursos", {
  id: {
    type: DataTypes.INTEGER,
    foreignkeys: true,
    autoIncrement: true,
  },
  titulo: {},
});
