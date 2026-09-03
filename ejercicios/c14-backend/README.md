# C14 - Backend

Sitio de la libreria de la Clase 13 mas un endpoint propio en la API.

```
c14-backend/
├── docker-compose.yml
├── backend/
│   ├── api.http          # requests para REST Client
│   └── src/
│       ├── index.ts      # rutas
│       └── libros.ts     # libros hardcodeados
└── frontend/             # app de c11-hooks
```

## Levantar

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:3000

## Endpoints

| Metodo | Ruta | Devuelve |
|--------|------|----------|
| GET | `/` | mensaje de la API |
| GET | `/libros` | array de libros |

Se prueban desde `backend/api.http` con la extension REST Client.

## Modo dev

El compose monta `./backend/src:/app/src`, asi que `tsx watch` reinicia el server
solo al guardar un archivo. No hace falta rebuildear la imagen para ver los cambios.

## Comandos

```bash
docker compose down
docker compose down -v
docker compose logs -f api
```
