import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Rol } from "../../generated/prisma/client";
import { HttpError } from "../middlewares/errorHandler";
import { Login, Registro } from "../validations/auth.validation";

// Se lee en una funcion para que el tipo quede string y no string | undefined:
// asi TypeScript sabe adentro de sign y verify que el secreto existe.
function leerSecreto(): string {
  const secreto = process.env.JWT_SECRET;
  if (!secreto) {
    throw new Error("Falta JWT_SECRET en el .env");
  }
  return secreto;
}

const JWT_SECRET = leerSecreto();

// Lo que viaja adentro del token. Nada sensible: solo con que identificar al
// usuario y saber que puede hacer.
export type PayloadToken = { id: number; rol: Rol };

// El passwordHash nunca sale del backend.
const sinPassword = { passwordHash: true };

export async function registrar(datos: Registro) {
  const passwordHash = await bcrypt.hash(datos.password, 10);
  // El rol no se toma del body: queda el CLIENTE por default del schema.
  return prisma.usuario.create({
    data: { email: datos.email, nombre: datos.nombre, passwordHash },
    omit: sinPassword,
  });
}

export async function login({ email, password }: Login) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  // El mismo mensaje si el mail no existe y si la password esta mal: si
  // fueran distintos, cualquiera podria averiguar que mails estan registrados.
  if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
    throw new HttpError(401, "Email o contrasena incorrectos");
  }

  const payload: PayloadToken = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
  };
}

// Devuelve null en vez de tirar, asi el middleware no necesita try / catch.
export function verificarToken(token: string): PayloadToken | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return { id: payload.id, rol: payload.rol };
  } catch {
    return null;
  }
}

export function buscarPorId(id: number) {
  return prisma.usuario.findUniqueOrThrow({ where: { id }, omit: sinPassword });
}
