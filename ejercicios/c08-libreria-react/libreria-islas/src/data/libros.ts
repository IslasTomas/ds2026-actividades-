export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    imagen: string;
    precio: number;
  }

export const libros: Libro[] = [
    { id: 1, titulo: "El principito",        autor: "Saint-Exupéry",  imagen: "https://picsum.photos/seed/libro1/400/240", precio: 8990 },
    { id: 2, titulo: "Cien años de soledad", autor: "García Márquez", imagen: "https://picsum.photos/seed/libro2/400/240", precio: 12500 },
    { id: 3, titulo: "Rayuela",              autor: "Cortázar",       imagen: "https://picsum.photos/seed/libro3/400/240", precio: 9800 },
    { id: 4, titulo: "Ficciones",            autor: "Borges",         imagen: "https://picsum.photos/seed/libro4/400/240", precio: 7990 },
    { id: 5, titulo: "Pedro Páramo",         autor: "Rulfo",          imagen: "https://picsum.photos/seed/libro5/400/240", precio: 6500 },
    { id: 6, titulo: "Martín Fierro",        autor: "Hernández",      imagen: "https://picsum.photos/seed/libro6/400/240", precio: 4990 },
  ];