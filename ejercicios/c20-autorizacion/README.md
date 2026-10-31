# C20 - Autorizacion

La libreria de C19 con sesion en React: AuthContext, rutas protegidas y links segun el rol.

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
