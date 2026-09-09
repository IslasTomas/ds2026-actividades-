# C19 - Integracion

La libreria de la Clase 18, con el frontend conectado a la API de verdad.
Se fue el `public/libros.json`: ahora el catalogo, el detalle y la home
piden los datos a Express.

```
frontend/src/
├── services/api.ts       # apiFetch: URL desde la env, token y errores
├── vite-env.d.ts         # tipa import.meta.env
├── types/                # los tipos, calcados del JSON de la API
├── pages/Login.tsx       # login con zod, guarda el token
└── pages/AltaLibro.tsx   # alta que manda el token
```

## Levantar

```bash
cp backend/.env.example backend/.env      # POSTGRES_PASSWORD y JWT_SECRET
cp frontend/.env.example frontend/.env    # VITE_API_URL
docker compose up --build -d

docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api

Los dos `.env` estan en `.gitignore`; el repo trae solo los `.env.example`.

## Las dos variables de entorno

`FRONTEND_URL` (backend) es la lista de origenes que pueden pegarle a la API
desde un navegador. Si hay mas de uno se separan con coma. **No es `"*"`**:
con un comodin, cualquier pagina de internet podria hacer requests a esta API
desde el navegador de un usuario logueado y su token viajaria igual.

`VITE_API_URL` (frontend) es la URL base de la API. Apunta a `localhost:3000`
y no a `api:3000` porque el navegador corre en tu maquina, no adentro de
docker. Solo las variables que empiezan con `VITE_` llegan al bundle, y
`vite-env.d.ts` las tipa para que un typo no pase de largo.

## apiFetch

Todo el front habla con la API por `services/api.ts`, que hace tres cosas:

1. Arma la URL pegandole el path a `VITE_API_URL`.
2. Si hay token en `localStorage`, lo manda en `Authorization: Bearer`.
   Las rutas publicas lo ignoran; las privadas lo necesitan.
3. Si la respuesta no es ok, tira un `ApiError` **con el mensaje que mando
   la API**, no con uno generico. Cuando el back manda `detalles` (los
   errores de zod), los suma al mensaje.

Por eso la pantalla de login muestra "Email o contrasena incorrectos" y el
alta muestra "No tenes permiso para hacer esto": son textos del backend, no
del front.

## Permisos vistos desde el front

El alta manda el token que guardo el login. Segun quien sea:

| Quien | Que pasa |
|-------|----------|
| sin login | 401, "Falta el token" |
| CLIENTE | 403, "No tenes permiso para hacer esto" |
| ADMIN | 201 y el libro aparece en el catalogo |

Los usuarios del seed son `admin@libreria.com` / `admin1234` y
`cliente@libreria.com` / `cliente1234`.

## 404 en JSON

El backend cierra con un middleware que contesta 404 en JSON para cualquier
ruta que no exista. Sin eso Express devuelve su HTML de error y `apiFetch`
no puede leer el mensaje.

```bash
curl http://localhost:3000/api/no-existe
# {"error":"No existe la ruta GET /api/no-existe"}
```

## Chequear los tipos

```bash
cd frontend && npx tsc -p tsconfig.app.json --noEmit
```
