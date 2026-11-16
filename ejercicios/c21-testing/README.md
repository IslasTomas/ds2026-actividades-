# C21 - Testing

La libreria de C20 con tests en back y front (Vitest).

## Levantar

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up --build -d
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

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
