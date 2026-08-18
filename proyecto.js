import express from "express";
import { startDataBase } from "./src/config/database.js";
const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, async () => {
  await startDataBase();
  console.log(`servidor funcionando en el puerto ${PORT}`);
  console.log(`Servidor: http://localhost:${PORT}`);
});
