import bcrypt from "bcryptjs";
import { prisma, pool } from "../src/lib/prisma";

// Ningun id se escribe a mano: los pone Postgres con autoincrement() y los
// libros se enganchan a su autor y a sus categorias por nombre, con connect.

const autores = [
  { nombre: "Antoine de Saint-Exupery", nacionalidad: "Francia" },
  { nombre: "Gabriel Garcia Marquez", nacionalidad: "Colombia" },
  { nombre: "Julio Cortazar", nacionalidad: "Argentina" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Juan Rulfo", nacionalidad: "Mexico" },
  { nombre: "Jose Hernandez", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Cuento" },
  { nombre: "Poesia" },
  { nombre: "Clasico" },
  { nombre: "Latinoamericana" },
  { nombre: "Infantil" },
];

// Las contrasenas van en texto plano SOLO aca, para poder probar el login.
// Lo que se guarda en la base es el hash.
const usuarios = [
  { email: "admin@libreria.com", nombre: "Admin", password: "admin1234", rol: "ADMIN" as const },
  { email: "cliente@libreria.com", nombre: "Cliente", password: "cliente1234", rol: "CLIENTE" as const },
];

const libros = [
  {
    titulo: "El principito",
    imagen: "https://picsum.photos/seed/libro1/400/240",
    precio: 8990,
    autor: "Antoine de Saint-Exupery",
    categorias: ["Infantil", "Clasico"],
  },
  {
    titulo: "Cien anos de soledad",
    imagen: "https://picsum.photos/seed/libro2/400/240",
    precio: 12500,
    autor: "Gabriel Garcia Marquez",
    categorias: ["Novela", "Latinoamericana"],
  },
  {
    titulo: "Rayuela",
    imagen: "https://picsum.photos/seed/libro3/400/240",
    precio: 9800,
    autor: "Julio Cortazar",
    categorias: ["Novela", "Latinoamericana"],
  },
  {
    titulo: "Ficciones",
    imagen: "https://picsum.photos/seed/libro4/400/240",
    precio: 7990,
    autor: "Jorge Luis Borges",
    categorias: ["Cuento", "Latinoamericana"],
  },
  {
    titulo: "Pedro Paramo",
    imagen: "https://picsum.photos/seed/libro5/400/240",
    precio: 6500,
    autor: "Juan Rulfo",
    categorias: ["Novela", "Latinoamericana"],
  },
  {
    titulo: "Martin Fierro",
    imagen: "https://picsum.photos/seed/libro6/400/240",
    precio: 4990,
    autor: "Jose Hernandez",
    categorias: ["Poesia", "Clasico"],
  },
];

async function main() {
  // Los libros van primero porque apuntan a los autores: si borraramos los
  // autores antes, Postgres no lo dejaria.
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.categoria.deleteMany();

  // Autores y categorias primero, para que existan cuando los libros los
  // busquen con connect.
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const libro of libros) {
    await prisma.libro.create({
      data: {
        titulo: libro.titulo,
        imagen: libro.imagen,
        precio: libro.precio,
        autor: { connect: { nombre: libro.autor } },
        categorias: {
          connect: libro.categorias.map((nombre) => ({ nombre })),
        },
      },
    });
  }

  // upsert en vez de create: si el usuario ya existe no se toca, asi el
  // seed se puede correr las veces que haga falta sin chocar con el unique
  // del email ni volver a hashear.
  for (const { password, ...usuario } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: usuario.email },
      update: {},
      create: { ...usuario, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  console.log(
    `Seed listo: ${autores.length} autores, ${categorias.length} categorias, ${libros.length} libros y ${usuarios.length} usuarios.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
