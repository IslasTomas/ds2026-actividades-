# C23 - Deploy

La libreria de C21 deployada en Render (back y front) y Neon (Postgres).

- Front: (completar)
- API: (completar)

## Levantar

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up --build -d
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

Despues de clonar: `docker compose exec api npx prisma generate` (el cliente queda en `src/generated`).

Usuarios: `admin@libreria.com` / `admin1234` y `cliente@libreria.com` / `cliente1234`.

## Que hay

- `context/AuthContext.tsx`: usuario, cargando, login, logout, tieneRol. Al recargar llama a `/auth/yo`.
- `components/PrivateRoute.tsx`: sin login va a `/login`, sin rol va a `/sin-permiso`.
- `/libros/nuevo` solo para ADMIN. El link "Nuevo libro" solo lo ve ADMIN.
- `services/api.ts`: un 401 con token cierra la sesion.

| Endpoint | Invitado | CLIENTE | ADMIN | UI |
|----------|----------|---------|-------|----|
| `GET /api/libros` | ✅ | ✅ | ✅ | Catalogo publico |
| `POST /api/libros` | 401 | 403 | 201 | Ruta y link solo ADMIN |
| `GET /api/auth/yo` | 401 | ✅ | ✅ | Se usa al recargar |

## Testing

```bash
cd backend && npm test        # sin DB
cd backend && npm run test:db # necesita docker compose up -d db, migrate y seed
cd frontend && npm test
```

| Archivo | Tipo |
|---------|------|
| `backend/src/validations/libro.validation.test.ts` | Unitario (schema Zod) |
| `backend/src/middlewares/auth.middleware.test.ts` | `authorize` con `vi.fn()` |
| `backend/src/routes/libros.routes.test.ts` | Supertest: POST sin token 401, CLIENTE 403 |
| `backend/src/routes/libros.db.test.ts` | Supertest contra la DB (aparte) |
| `frontend/src/components/Navbar.test.tsx` | Testing Library: link segun el rol |

## Deploy

1. **Neon**: proyecto nuevo en AWS us-east-1. Copiar la `DATABASE_URL` directa (no pooled).
2. **Render, Web Service**: Docker, root `ejercicios/c23-deploy/backend`, Dockerfile `Dockerfile.prod`.
   Env: `DATABASE_URL`, `JWT_SECRET` (generado), `FRONTEND_URL=http://localhost:5173` (provisorio).
3. **Render, Static Site**: root `ejercicios/c23-deploy/frontend`, build `npm install && npm run build`, publish `dist`.
   Env: `VITE_API_URL=https://<back>.onrender.com/api`. Rewrite `/*` -> `/index.html`.
4. **CORS**: en el back, `FRONTEND_URL=https://<front>.onrender.com` (sin `/` al final).
5. **Seed**: `docker compose run --rm -e DATABASE_URL="<neon>" api npx prisma db seed`
