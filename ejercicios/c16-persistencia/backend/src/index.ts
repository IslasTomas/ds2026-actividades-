import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);

// Express lo toma como manejador de errores porque tiene 4 parametros.
// Sin esto, un error de la base (o cualquier promesa rechazada) deja la
// request colgada en vez de contestar.
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
