import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.routes";
import librosRouter from "./routes/libros.routes";
import autoresRouter from "./routes/autores.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);

// Va ultimo: recibe lo que tiren los controllers y los middlewares.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
