export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Libro {
  id: number;
  titulo: string;
  imagen: string;
  precio: number;
  autorId: number;
  autor: Autor;
}

// GET /api/libros/:id suma las categorias.
export interface LibroDetalle extends Libro {
  categorias: Categoria[];
}
