import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("proyecto_dataBase", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const startDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("conexion de base de datos exitosa");
    await sequelize.sync();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos");
  }
};
