# C18 - Autenticacion

La libreria de la Clase 17, ahora con usuarios, login por token y permisos
por rol. Leer el catalogo sigue siendo publico; escribir es solo para ADMIN.

```
backend/src/
├── validations/auth.validation.ts   # registroSchema y loginSchema
├── middlewares/auth.middleware.ts   # authenticate y authorize
├── services/auth.service.ts         # hash, token y login
├── controllers/auth.controller.ts
├── routes/auth.routes.ts
└── types/express.d.ts               # para que exista req.usuario
```

## Levantar

```bash
cp backend/.env.example backend/.env   # completar POSTGRES_PASSWORD y JWT_SECRET
docker compose up --build -d

docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

El seed deja dos usuarios para probar:

| Email | Password | Rol |
|-------|----------|-----|
| admin@libreria.com | admin1234 | ADMIN |
| cliente@libreria.com | cliente1234 | CLIENTE |

Usa `upsert` por email, asi que se puede correr las veces que haga falta sin
chocar con el unique ni volver a hashear las contrasenas.

## Como funciona

Al registrarse, la contrasena se hashea con bcrypt y **nunca** se guarda en
texto plano. El `rol` no se acepta en el body: todo el que se registra queda
como `CLIENTE`, que es el default del enum en el schema.

El login devuelve un token firmado con `JWT_SECRET`. Adentro del token van
solo el `id` y el `rol`. Si el mail no existe o la password esta mal, la
respuesta es **el mismo 401 con el mismo mensaje** en los dos casos: si
fueran distintos, cualquiera podria averiguar que mails estan registrados.

`authenticate` lee el header `Authorization: Bearer <token>`, lo verifica y
deja el usuario en `req.usuario`. `authorize("ADMIN")` se usa siempre despues,
y mira que el rol alcance.

> 401 es "no se quien sos", 403 es "se quien sos y no te alcanza".

## Endpoints

| Metodo | Ruta | Quien puede |
|--------|------|-------------|
| POST | `/api/auth/registro` | cualquiera; 201 sin el hash, 409 si el mail existe |
| POST | `/api/auth/login` | cualquiera; 200 con token, 401 si falla |
| GET | `/api/auth/yo` | con token; devuelve el usuario de `req.usuario` |
| GET | `/api/libros`, `/api/autores` | publico |
| POST, PUT, DELETE | `/api/libros`, `/api/autores` | solo ADMIN |

## Errores

| Que paso | Status |
|----------|--------|
| El body o el `:id` no pasan el schema | 400 |
| Falta el token, o no sirve, o el login fallo | 401 |
| El rol no alcanza | 403 |
| La fila no existe (P2025) | 404 |
| Valor repetido (P2002) o referencia rota (P2003) | 409 |

Los 401 y 403 salen de `HttpError`, que vive en `errorHandler.ts`: sigue
siendo el unico lugar del backend que arma respuestas de error.

Los 35 requests estan en `backend/api.http`, arrancando por los 12 casos de
autenticacion. El token del login se captura con `@name` y despues se reusa
como `{{tokenAdmin}}`.
