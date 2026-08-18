import { Sequelize } from "sequelize";

export const baseDatos = new Sequelize("proyecto_dataBase", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const startDataBase = async () => {
  try {
    await baseDatos.authenticate();
    console.log("conexion de base de datos exitosa");
    await baseDatos.sync();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos");
  }
};
