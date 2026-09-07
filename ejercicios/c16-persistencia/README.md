# C16 - Persistencia

El sitio de la libreria de la Clase 15, ahora con los datos en Postgres.
Los arrays en memoria de `services/` se cambiaron por consultas de Prisma:
lo que se crea o se borra por la API sobrevive al reinicio del contenedor.

```
backend/
├── prisma.config.ts        # config del CLI de Prisma
├── prisma/
│   ├── schema.prisma       # los modelos Libro y Autor
│   ├── seed.ts             # datos iniciales, sin id a mano
│   └── migrations/
└── src/
    ├── lib/prisma.ts       # el PrismaClient
    ├── types/              # los tipos ahora salen del schema
    ├── services/           # las consultas a la base (async)
    ├── controllers/
    └── routes/
```

## Levantar

```bash
cp backend/.env.example backend/.env      # y completar POSTGRES_PASSWORD
docker compose up --build -d

docker compose exec api npx prisma migrate deploy   # crea las tablas
docker compose exec api npx prisma db seed          # carga los datos
```

- API: http://localhost:3000/api

`backend/.env` esta en `.gitignore`: el repo solo trae `.env.example`.

## La base

En `docker-compose.yml` el servicio `db` es un `postgres:16-alpine` con un
healthcheck de `pg_isready`. La `api` arranca recien cuando ese healthcheck
pasa, asi no intenta conectarse a una base que todavia no acepta conexiones.
Los datos viven en el volumen `pgdata`.

La `api` tambien monta `backend/prisma/` y `backend/prisma.config.ts`, para
que las migraciones que se generan adentro del contenedor queden en el repo.

### Los modelos

`Libro` y `Autor` son dos tablas independientes: no hay relacion entre ellas.
`Libro.autor` sigue siendo un `String`, igual que en la Clase 15.

Los `id` los pone Postgres con `autoincrement()`, el seed no los escribe.

Para cambiar el schema:

```bash
docker compose exec api npx prisma migrate dev --name lo_que_cambiaste
```

Para volver a empezar de cero (borra la base y reaplica las migraciones).
El reset no corre el seed solo, hay que pedirlo aparte:

```bash
docker compose exec api npx prisma migrate reset --force
docker compose exec api npx prisma db seed
```

## Endpoints

| Metodo | Ruta | Devuelve |
|--------|------|----------|
| GET | `/api/libros` | 200 con el array |
| GET | `/api/libros/:id` | 200, 404 si no existe, 400 si el id no es numero |
| POST | `/api/libros` | 201 con el creado, o 400 si faltan datos |
| PUT | `/api/libros/:id` | 200 con el modificado, 400 o 404 |
| DELETE | `/api/libros/:id` | 204 sin body, 400 o 404 |

`/api/autores` tiene los mismos 5, con `nombre` y `nacionalidad`.

Los 19 requests estan en `backend/api.http` para REST Client, separados en
libros, autores y casos de error.
