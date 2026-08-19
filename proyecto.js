import express from "express";
import { sequelize, startDataBase } from "./src/config/database.js";
import { cursosModel } from "./src/models/cursos.model.js";
import { institucionesModel } from "./src/models/instituciones.model.js";
import { representanteInstituModel } from "./src/models/representante_institucion.model.js";
const app = express();
const PORT = 3000;
app.use(express.json());
const probarBaseDatos = async () => {
  try {
    await sequelize.sync({force:false});
      console.log('ningun error, conexion de tu base de datos exitosa');
      await sequelize.sync();
      console.log('tablas conectadas correctamente')    
  } catch (error) {
    console.log('uuffs, no hubo conexion con la base de datos')
  }
}
app.listen(PORT, async () => {
  await probarBaseDatos();
  await startDataBase();
  console.log(`servidor funcionando en el puerto ${PORT}`);
  console.log(`Servidor: http://localhost:${PORT}`);
});
