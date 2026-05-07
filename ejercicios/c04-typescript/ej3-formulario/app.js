"use strict";
const catalogoListado = document.getElementById("listado");
const pStats = document.getElementById("stats");
const filtroAutor = document.getElementById("filtroAutor");
const buttonFiltrar = document.getElementById("filtrar");
const buttonMostrarDisponibles = document.getElementById("mostrarDisponibles");
const buttonMostrarTodos = document.getElementById("mostrarTodos");
const libroFormulario = document.getElementById("libroFormulario");
const errorFormulario = document.getElementById("errorFormulario");
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
        const btnEliminar = document.createElement("button");
        li.textContent = `${libro.titulo} - ${libro.autor} - ${libro.precio} `;
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            catalogo.splice(catalogo.indexOf(libro), 1);
            renderizar(catalogo);
        });
        li.append(btnEliminar);
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
libroFormulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit del formulario ", event);
    const formData = new FormData(libroFormulario);
    const generoCampo = String(formData.get("genero") ?? "").trim();
    const libro = {
        isbn: "AUTO-" + Date.now(),
        titulo: String(formData.get("titulo") ?? ""),
        autor: String(formData.get("autor") ?? ""),
        precio: Number(formData.get("precio")),
        disponible: Boolean(formData.get("disponible")),
        ...(generoCampo !== "" ? { genero: generoCampo } : {}),
    };
    console.log("libro ", libro);
    const validado = validateForm(libro);
    if (validado === false) {
        const titulo = libro.titulo.trim();
        const autor = libro.autor.trim();
        if (titulo === "" || autor === "") {
            errorFormulario.textContent = "Completa titulo y autor.";
        }
        else {
            errorFormulario.textContent = "El precio debe ser un numero mayor a 0.";
        }
        return;
    }
    errorFormulario.textContent = "";
    catalogo.push(validado);
    renderizar(catalogo);
    libroFormulario.reset();
});
function validateForm(libro) {
    const titulo = libro.titulo.trim();
    const autor = libro.autor.trim();
    if (titulo === "" || autor === "") {
        return false;
    }
    const precio = libro.precio;
    if (precio <= 0) {
        return false;
    }
    let generoOpcional = {};
    if (libro.genero !== undefined) {
        const genero = String(libro.genero).trim();
        if (genero !== "") {
            generoOpcional = { genero };
        }
    }
    const { genero: _omitGenero, ...resto } = libro;
    return { ...resto, titulo, autor, ...generoOpcional };
}
