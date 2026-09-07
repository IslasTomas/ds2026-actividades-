export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export type AutorNuevo = Omit<Autor, "id">;
