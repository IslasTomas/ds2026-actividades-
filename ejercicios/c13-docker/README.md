# C13 - Docker

Libreria dockerizada con tres servicios: frontend (React + Vite), backend (Express + TypeScript) y Postgres.

```
c13-docker/
├── docker-compose.yml
├── backend/     # Express + TypeScript
└── frontend/    # app de c11-hooks
```

## Levantar

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:3000
- Postgres: interno, la API la usa como `db:5432`

## Comandos

```bash
docker compose down                 # bajar
docker compose down -v              # bajar y borrar los datos
docker compose logs -f api          # logs del backend
docker compose exec db psql -U postgres -d libreria_db
```
