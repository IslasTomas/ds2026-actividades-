# Repaso: Promesas, async/await y .then

## 1. ¿Qué es una Promise?

Una **Promise** representa un trabajo que va a terminar **más tarde** (fetch, timer, leer un archivo, etc.).

- Se **resuelve** (resolve) con un **valor** si sale bien.
- Se **rechaza** (reject) con un **error** si sale mal.
- No bloquea el resto del programa mientras espera.

`fetch(url)` devuelve una Promise que, cuando termina, da un objeto `Response`.

---

## 2. .then() y .catch()

- `.then(callback)` → se ejecuta **cuando la promesa se cumple**. El callback recibe el **valor** con el que se resolvió.
- `.catch(callback)` → se ejecuta si la promesa **falla** (o si dentro se hace `throw`).

Ejemplo:

```ts
fetch("https://api.example.com/users")
  .then((response) => response.json())
  .then((usuarios) => console.log(usuarios))
  .catch((error) => console.error(error));
```

### De dónde sale cada parámetro

- Primer `.then((response) => ...)` → `response` es lo que devolvió `fetch` (un `Response`).
- El callback devuelve `response.json()`, que es **otra promesa**.
- Segundo `.then((usuarios) => ...)` → recibe el **valor** con el que se resolvió esa promesa interna (el JSON parseado).

**Regla:** lo que **devuelve** un `.then` es lo que recibe el siguiente. Si devolvés una promesa, la cadena la espera y el siguiente `.then` recibe ya el valor final.

---

## 3. async / await

- `async function` → la función **siempre** devuelve una Promise.
- `await` → solo dentro de funciones `async`. Espera a que la promesa termine y guarda el valor.
- Mientras espera, el resto del programa **sigue corriendo**.
- Lo que está **debajo del await** en esa misma función no corre hasta que la promesa termine.

Equivalente al ejemplo anterior:

```ts
async function cargarUsuarios() {
  const response = await fetch("https://api.example.com/users");
  const usuarios = await response.json();
  console.log(usuarios);
}
```

### Errores con async/await

```ts
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error(error);
}
```

Equivale al `.catch()` al final de una cadena.

---

## 4. ¿Por qué dos await en mi código?

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/users");
const data = await response.json();
```

- `fetch` es asíncrono → da un `Response` (cabeceras + cuerpo "en camino").
- `response.json()` también es asíncrono → lee y parsea el cuerpo a JS.
- Sin el segundo `await`, `data` sería una **Promise**, no el array.

---

## 5. Llamar una función async desde el "afuera"

En el nivel superior del archivo no se puede usar `await` directo (salvo configuraciones especiales). Por eso usamos `.then`:

```ts
obtenerUsuarios()
  .then((usuarios) => {
    console.log("usuarios desde la promesa", usuarios);
  })
  .catch((error) => {
    console.log("error desde la promesa", error);
  });
```

- `usuarios` es lo que devolvió `obtenerUsuarios` con `return usuariosInterfaz` → un `Usuario[]`.
- `error` es lo que se rechazó (objeto `Error`, mensaje, etc.).

Alternativa equivalente con async/await:

```ts
async function main() {
  try {
    const usuarios = await obtenerUsuarios();
    console.log("usuarios desde la promesa", usuarios);
  } catch (error) {
    console.log("error desde la promesa", error);
  }
}
main();
```

---

## 6. Mini chuleta

| Idea            | Con .then                   | Con async/await                 |
| --------------- | --------------------------- | ------------------------------- |
| Esperar un paso | `.then(v => ...)`           | `const v = await ...`           |
| Manejar error   | `.catch(err => ...)`        | `try { ... } catch (err) {...}` |
| Retornar valor  | `return Promise.resolve(x)` | `return x` dentro de `async`    |

---

## 7. Tip de console.log

- `console.log(obj)` → DevTools muestra el objeto navegable.
- `` `texto ${obj}` `` → fuerza string y muestra `[object Object]` para objetos. Para arrays: `[object Object],[object Object],...`
- Si querés verlo todo como texto: `JSON.stringify(obj, null, 2)`.

---

## 8. Promise.all (varias promesas en paralelo)

Cuando tenés que hacer **varias llamadas asíncronas independientes** (no dependen una de otra), no conviene hacerlas en serie con varios `await` seguidos: eso suma los tiempos. **`Promise.all`** las dispara **al mismo tiempo** y espera a que terminen **todas**.

### Sintaxis básica

```ts
const [a, b, c] = await Promise.all([
  promesaA,
  promesaB,
  promesaC,
]);
```

- Recibe un **array de promesas**.
- Devuelve **una sola promesa** que se resuelve con un **array de resultados**, en el **mismo orden** del array de entrada.
- Si **cualquiera** de las promesas **falla**, `Promise.all` falla **inmediatamente** con ese error (las otras siguen corriendo, pero ya no se usan sus resultados).

### Comparación: serie vs paralelo

**En serie (lento):**

```ts
const usuarios = await fetch("/users").then((r) => r.json());
const posts = await fetch("/posts").then((r) => r.json());
const todos = await fetch("/todos").then((r) => r.json());
```

Cada `await` espera a que el anterior termine. Si cada uno tarda 1 segundo, total ≈ **3 segundos**.

**En paralelo con `Promise.all` (rápido):**

```ts
const [usuarios, posts, todos] = await Promise.all([
  fetch("/users").then((r) => r.json()),
  fetch("/posts").then((r) => r.json()),
  fetch("/todos").then((r) => r.json()),
]);
```

Las tres salen al mismo tiempo. Si cada una tarda 1 segundo, total ≈ **1 segundo**.

### Ejemplo real con tipos

```ts
interface Usuario { id: number; name: string; }
interface Post { id: number; title: string; }

async function cargarTodo(): Promise<{ usuarios: Usuario[]; posts: Post[] }> {
  const [usuariosRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  const [usuarios, posts] = await Promise.all([
    usuariosRes.json() as Promise<Usuario[]>,
    postsRes.json() as Promise<Post[]>,
  ]);

  return { usuarios, posts };
}
```

Notar el patrón: **dos `Promise.all` encadenados**, uno para los `fetch` y otro para los `.json()`.

### Manejo de errores

```ts
try {
  const [a, b] = await Promise.all([promesaA, promesaB]);
} catch (error) {
  console.error("Falló alguna de las dos:", error);
}
```

Con un solo `try/catch` cubrís cualquier error de las promesas del array.

### Variantes útiles (para conocer)

- **`Promise.allSettled([...])`** → no falla si una rechaza; devuelve un array con `{ status: "fulfilled", value }` o `{ status: "rejected", reason }` por cada promesa. Útil cuando querés **saber qué falló y qué no**, sin abortar todo.
- **`Promise.race([...])`** → se resuelve (o rechaza) con la **primera** promesa que termine. Útil para timeouts.
- **`Promise.any([...])`** → se resuelve con la primera que **cumpla**; solo falla si **todas** rechazan.

### Cuándo NO usar Promise.all

Si una llamada **depende del resultado** de otra (ejemplo: primero buscar el usuario y después sus posts por id), **no se puede paralelizar**: tiene que ir en serie con `await` uno detrás del otro.

---

## 9. Modelo mental rápido

1. Una función `async` **siempre** devuelve una `Promise`.
2. `await` **pausa** solo a esa función hasta que la promesa termine; el resto del programa sigue.
3. `fetch` devuelve `Response`; **`response.json()` también es asíncrono** → necesita su propio `await`.
4. Para reaccionar a una promesa desde fuera de un `async`, usás `.then(...)` y `.catch(...)`.
5. Lo que **devolvés** dentro de un `.then` es lo que **recibe** el siguiente `.then`.
6. Para correr **varias asíncronas independientes** en paralelo: **`Promise.all`**.
