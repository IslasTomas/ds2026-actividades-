/**
 * Open Library search (logic from C05 ej3).
 * UI strings sin acentos a pedido del proyecto.
 */

async function buscarLibros(valorBusqueda) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(valorBusqueda)}`
  );
  if (!response.ok) {
    throw new Error("HTTP error");
  }
  const data = await response.json();
  if (!data.docs) {
    throw new Error("La API no devolvio resultados validos");
  }
  return data.docs;
}

function coverUrl(doc) {
  if (doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
  }
  return "https://picsum.photos/seed/openlib/400/240";
}

function renderCatalogoCards(container, docs) {
  container.innerHTML = "";
  const maxCards = 18;
  const slice = docs.slice(0, maxCards);

  const row = document.createElement("div");
  row.className =
    "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center";

  slice.forEach((doc) => {
    const col = document.createElement("div");
    col.className = "col d-flex justify-content-center";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm w-100";
    card.style.maxWidth = "22rem";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = coverUrl(doc);
    img.alt = doc.title ? `Portada: ${doc.title}` : "Portada";

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column text-center";

    const titleEl = document.createElement("h3");
    titleEl.className = "card-title h5";
    titleEl.textContent = doc.title || "(Sin titulo)";

    const authorEl = document.createElement("p");
    authorEl.className = "card-text text-muted small";
    authorEl.textContent =
      doc.author_name && doc.author_name.length
        ? doc.author_name.join(", ")
        : "Autor desconocido";

    const yearEl = document.createElement("p");
    yearEl.className = "card-text small text-secondary mb-2";
    yearEl.textContent = doc.first_publish_year
      ? String(doc.first_publish_year)
      : "";

    const link = document.createElement("a");
    link.className = "btn btn-outline-primary mt-auto";
    link.href = "libro.html";
    link.textContent = "Ver mas";

    body.append(titleEl, authorEl, yearEl, link);
    card.append(img, body);
    col.append(card);
    row.append(col);
  });

  container.append(row);
}

function initCatalogoBusqueda() {
  const input = document.getElementById("catalogoBuscadorInput");
  const button = document.getElementById("catalogoBuscadorBtn");
  const resultados = document.getElementById("catalogoResultados");
  const validacion = document.getElementById("catalogoValidacion");
  const errorEl = document.getElementById("catalogoError");
  const cargando = document.getElementById("catalogoCargando");

  if (!input || !button || !resultados) {
    return;
  }

  function ocultarMensajes() {
    if (validacion) validacion.classList.add("d-none");
    if (errorEl) errorEl.classList.add("d-none");
    if (cargando) cargando.classList.add("d-none");
  }

  button.addEventListener("click", async () => {
    ocultarMensajes();
    const valor = input.value.trim();
    if (valor === "" || valor.length < 3) {
      if (validacion) {
        validacion.textContent =
          "Escriba al menos 3 caracteres para buscar.";
        validacion.classList.remove("d-none");
      }
      return;
    }

    if (cargando) cargando.classList.remove("d-none");
    resultados.innerHTML = "";

    try {
      const libros = await buscarLibros(valor);
      if (cargando) cargando.classList.add("d-none");

      if (libros.length === 0) {
        if (errorEl) {
          errorEl.textContent = "No se encontraron libros.";
          errorEl.classList.remove("d-none");
        }
        return;
      }

      renderCatalogoCards(resultados, libros);
    } catch (err) {
      console.error(err);
      if (cargando) cargando.classList.add("d-none");
      if (errorEl) {
        errorEl.textContent = "Error al buscar. Intenta de nuevo.";
        errorEl.classList.remove("d-none");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", initCatalogoBusqueda);
