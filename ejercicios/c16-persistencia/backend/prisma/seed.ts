import { prisma, pool } from "../src/lib/prisma";

// Los id no se escriben a mano: los pone Postgres con autoincrement().

const libros = [
  { titulo: "El principito", autor: "Saint-Exupery", imagen: "https://picsum.photos/seed/libro1/400/240", precio: 8990 },
  { titulo: "Cien anos de soledad", autor: "Garcia Marquez", imagen: "https://picsum.photos/seed/libro2/400/240", precio: 12500 },
  { titulo: "Rayuela", autor: "Cortazar", imagen: "https://picsum.photos/seed/libro3/400/240", precio: 9800 },
  { titulo: "Ficciones", autor: "Borges", imagen: "https://picsum.photos/seed/libro4/400/240", precio: 7990 },
  { titulo: "Pedro Paramo", autor: "Rulfo", imagen: "https://picsum.photos/seed/libro5/400/240", precio: 6500 },
  { titulo: "Martin Fierro", autor: "Hernandez", imagen: "https://picsum.photos/seed/libro6/400/240", precio: 4990 },
];

const autores = [
  { nombre: "Antoine de Saint-Exupery", nacionalidad: "Francia" },
  { nombre: "Gabriel Garcia Marquez", nacionalidad: "Colombia" },
  { nombre: "Julio Cortazar", nacionalidad: "Argentina" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Juan Rulfo", nacionalidad: "Mexico" },
];

async function main() {
  // Vaciamos primero para que no se dupliquen las filas si el seed
  // se corre mas de una vez.
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });

  console.log(`Seed listo: ${libros.length} libros y ${autores.length} autores.`);
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
