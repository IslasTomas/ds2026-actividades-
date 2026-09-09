import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Los origenes permitidos salen del .env, separados por coma. Es una lista
// concreta y no "*": con "*" cualquier pagina de internet podria pegarle a
// esta API desde el navegador de un usuario logueado.
const origenesPermitidos = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origen) => origen.trim())
  .filter((origen) => origen.length > 0);

app.use(cors({ origin: origenesPermitidos }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);

// Si ningun router agarro la request, contestamos 404 en JSON. Sin esto,
// Express manda su pagina de error en HTML y el front no la puede leer.
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `No existe la ruta ${req.method} ${req.originalUrl}` });
});

// Va ultimo: recibe lo que tiren los controllers y los middlewares.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
