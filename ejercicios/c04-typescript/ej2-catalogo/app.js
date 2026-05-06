"use strict";
const catalogoListado = document.getElementById("listado");
const pStats = document.getElementById("stats");
const filtroAutor = document.getElementById("filtroAutor");
const buttonFiltrar = document.getElementById("filtrar");
const buttonMostrarDisponibles = document.getElementById("mostrarDisponibles");
const buttonMostrarTodos = document.getElementById("mostrarTodos");
const catalogo = [
    {
        isbn: "978-9877252863",
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 8990,
        disponible: true,
        genero: "Ficción",
    },
    {
        isbn: "978-9505156249",
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        precio: 15200,
        disponible: false,
        genero: "Novela",
    },
    {
        isbn: "978-9877803343",
        titulo: "Ficciones",
        autor: "Jorge Luis Borges",
        precio: 12100,
        disponible: true,
        genero: "Cuentos",
    },
    {
        isbn: "978-9875668644",
        titulo: "Pedro Páramo",
        autor: "Juan Rulfo",
        precio: 9800,
        disponible: true,
    },
    {
        isbn: "978-8491053460",
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: 18900,
        disponible: true,
        genero: "Novela",
    },
    {
        isbn: "978-9875668651",
        titulo: "Historia de una maestra",
        autor: "Josefina Aldecoa",
        precio: 7600,
        disponible: false,
        genero: "Novela",
    },
    {
        isbn: "978-9500736335",
        titulo: "Martín Fierro",
        autor: "José Hernández",
        precio: 4500,
        disponible: true,
        genero: "Poesía",
    },
    {
        isbn: "978-9877380540",
        titulo: "La invención de Morel",
        autor: "Adolfo Bioy Casares",
        precio: 8300,
        disponible: true,
    },
];
function buscarPorAutor(autor) {
    console.log("buscando por autor", autor);
    return catalogo.filter((libro) => libro.autor.includes(autor)); // si el autor contiene el autor que se pasa por parametro, se devuelve el libro
}
function librosDisponibles() {
    console.log("buscando libros disponibles");
    return catalogo.filter((libro) => libro.disponible === true);
}
function precioPromedio(libros) {
    console.log("calculando  el promeido del precio de los libros");
    let sumaTotal = libros.reduce((acumulador, libro) => acumulador + libro.precio, 0);
    let promedio = sumaTotal / libros.length;
    console.log(`total ${sumaTotal} promedio ${promedio}`);
    return promedio;
}
precioPromedio(catalogo);
console.log("libros disponibles", librosDisponibles());
console.log("libros por autor ", buscarPorAutor("Antoine de Saint-Exupéry"));
function renderizar(libros) {
    console.log("renderizando los libros", libros);
    catalogoListado.innerHTML = "";
    libros.forEach((libro) => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - ${libro.precio}`;
        catalogoListado.append(li);
    });
    pStats.textContent = `Cantidad de libros: ${libros.length} - Precio promedio: ${precioPromedio(libros)}`;
}
buttonMostrarTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
buttonMostrarDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
buttonFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(filtroAutor.value));
});
renderizar(catalogo);
