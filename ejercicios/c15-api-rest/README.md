# C15 - API REST

Sitio de la libreria de la Clase 14 con el backend separado en capas y dos
recursos con CRUD completo.

```
backend/src/
├── index.ts                 # solo levanta el server y monta los routers
├── types/
│   ├── libro.ts
│   └── autor.ts
├── services/                # los datos y la logica
│   ├── libros.service.ts
│   └── autores.service.ts
├── controllers/             # req / res y codigos de estado
│   ├── libros.controller.ts
│   └── autores.controller.ts
└── routes/                  # que ruta llama a que controlador
    ├── libros.routes.ts
    └── autores.routes.ts
```

## Levantar

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api

## Endpoints

| Metodo | Ruta | Devuelve |
|--------|------|----------|
| GET | `/api/libros` | 200 con el array |
| GET | `/api/libros/:id` | 200, o 404 si no existe |
| POST | `/api/libros` | 201 con el creado, o 400 si faltan datos |
| PUT | `/api/libros/:id` | 200 con el modificado, o 404 |
| DELETE | `/api/libros/:id` | 204 sin body, o 404 |

`/api/autores` tiene los mismos 5, con `nombre` y `nacionalidad`.

Los 17 requests estan en `backend/api.http` para REST Client, separados en
libros, autores y casos de error.
