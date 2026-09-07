import express from "express";
import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
