"use strict";
const inputBuscador = document.getElementById("inputBuscador");
const buttonBuscador = document.getElementById("buttonBuscador");
const cardsContainer = document.getElementById("cardsContainer");
const validacionInput = document.getElementById("validacionInput");
const errorbuscador = document.getElementById("errorbuscador");
const cargando = document.getElementById("cargando");
async function buscarLibros(valorBusqueda) {
    const response = await fetch(`https://openlibrary.org/search.json?q=${valorBusqueda}`);
    const data = await response.json();
    if (!data.docs) {
        console.log("data", data);
        throw new Error("La API no devolvió resultados válidos");
    }
    return data.docs;
}
buttonBuscador.addEventListener("click", () => {
    errorbuscador.style.display = "none";
    cargando.style.display = "block";
    validacionInput.style.display = "none";
    const valorBuscador = inputBuscador.value.trim();
    if (valorBuscador === "" || valorBuscador.length < 3) {
        validacionInput.style.display = "block";
        validacionInput.textContent = "INGRESE UNA PALABRA MAYOR A 3 CARACTERES";
        return;
    }
    buscarLibros(valorBuscador).then((libros) => {
        if (libros.length === 0) {
            errorbuscador.style.display = "block";
            errorbuscador.textContent = "No se encontraron libros";
            return;
        }
        cargando.style.display = "none";
        libros.forEach(libro => {
            const card = document.createElement("div");
            card.innerHTML = `
                <h2>${libro.title}</h2>
                <p>${libro.author_name?.join(", ")}</p>
                <p>${libro.first_publish_year}</p>`;
            cardsContainer.appendChild(card);
        });
    }).catch(error => {
        validacionInput.style.display = "none";
        console.log("valorBuscador", valorBuscador);
        console.log("error", error);
        errorbuscador.style.display = "block";
        errorbuscador.textContent = `Error al buscar los libros ${error}`;
    });
});
