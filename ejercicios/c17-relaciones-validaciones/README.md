# C17 - Relaciones y validaciones

La libreria de la Clase 16, ahora con relaciones entre tablas y con la
validacion sacada de los controllers.

```
backend/src/
├── validations/          # schemas de zod (create, update y params)
├── middlewares/          # validate, validateParams y errorHandler
├── types/                # los tipos con relaciones, via GetPayload
├── services/             # las consultas con include
├── controllers/          # sin un solo try / catch
└── routes/               # cada ruta declara que valida antes de entrar
```

## Levantar

```bash
cp backend/.env.example backend/.env      # y completar POSTGRES_PASSWORD
docker compose up --build -d

docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

Para volver a empezar de cero (el reset no corre el seed solo):

```bash
docker compose exec api npx prisma migrate reset --force
docker compose exec api npx prisma db seed
```

## Las relaciones

```
Autor  1 ─── N  Libro       un autor escribe muchos libros
Libro  N ─── M  Categoria   via la tabla intermedia que arma Prisma
```

`Libro.autor` dejo de ser un `String`: ahora es `autorId` mas la relacion.
La 1:N quedo con `ON DELETE RESTRICT`, asi que Postgres no deja borrar un
autor que todavia tiene libros.

El seed carga **autores y categorias primero** y despues los libros, que se
enganchan con `connect` buscando por nombre. Ningun id se escribe a mano.

En los services, el listado trae cada libro con su autor y el detalle suma
las categorias. Los tipos de esas respuestas salen de `GetPayload`, asi que
si cambia el `include` el tipo se rompe solo:

```ts
export type LibroListado = Prisma.LibroGetPayload<{ include: { autor: true } }>;
```

## Validaciones y errores

`validate` y `validateParams` parsean el body y el `:id` con zod. Si algo
falla, mandan el `ZodError` a `errorHandler`, que es el unico lugar que arma
respuestas de error. Por eso los controllers no tienen `try / catch`: los
services usan `findUniqueOrThrow` y Express 5 reenvia solo las promesas
rechazadas.

| Que paso | Codigo | Respuesta |
|----------|--------|-----------|
| El body o el `:id` no pasan el schema | ZodError | 400 |
| La fila no existe | P2025 | 404 |
| Titulo o nombre repetido | P2002 | 409 |
| Referencia rota entre tablas | P2003 | 409 |

P2003 salta en dos casos: crear un libro con un `autorId` que no existe, o
borrar un autor que todavia tiene libros.

## Endpoints

| Metodo | Ruta | Devuelve |
|--------|------|----------|
| GET | `/api/libros` | cada libro con su autor |
| GET | `/api/libros/:id` | el libro con autor y categorias |
| POST | `/api/libros` | 201; acepta `categoriaIds` para enganchar |
| PUT | `/api/libros/:id` | 200; `categoriaIds` reemplaza la lista entera |
| DELETE | `/api/libros/:id` | 204 |

`/api/autores` tiene los mismos 5, con `nombre` y `nacionalidad`.

Las categorias se cargan con el seed y se usan desde los libros, con
`categoriaIds` en el POST y el PUT.

Los 23 requests estan en `backend/api.http`, en orden y separados por
seccion: los casos felices primero y despues los de 400, 404 y 409.
