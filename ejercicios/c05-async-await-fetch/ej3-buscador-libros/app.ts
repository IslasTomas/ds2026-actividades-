const inputBuscador = document.getElementById("inputBuscador") as HTMLInputElement;
const buttonBuscador = document.getElementById("buttonBuscador") as HTMLButtonElement;
const cardsContainer = document.getElementById("cardsContainer") as HTMLDivElement;
const validacionInput = document.getElementById("validacionInput") as HTMLParagraphElement;
const errorbuscador = document.getElementById("errorbuscador") as HTMLParagraphElement;
const cargando = document.getElementById("cargando") as HTMLParagraphElement;

interface Libro {
    title: string;
    author_name?: string[];   // array de autores, puede no existir
    first_publish_year?: number;
  }

async function buscarLibros(valorBusqueda: string) : Promise<Libro[]> {
    const response = await fetch(`https://openlibrary.org/search.json?q=${valorBusqueda}`);
    const data = await response.json();
    if (!data.docs) {
        console.log("data", data);
        throw new Error("La API no devolvió resultados válidos");
      }
    return data.docs as Libro[];   
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
    buscarLibros(valorBuscador).then((libros: Libro[]) => {
        if (libros.length === 0) {
            errorbuscador.style.display = "block";
            errorbuscador.textContent = "No se encontraron libros";
            return;
        }
        cargando.style.display = "none";
        libros.forEach(libro => {
            const card = document.createElement("div");
            card.innerHTML=`
                <h2>${libro.title}</h2>
                <p>${libro.author_name?.join(", ")}</p>
                <p>${libro.first_publish_year}</p>`
            cardsContainer.appendChild(card);
        });
        }).catch( error => {
        validacionInput.style.display = "none";
        console.log("valorBuscador", valorBuscador);
        console.log("error", error);
        errorbuscador.style.display = "block";
        errorbuscador.textContent = `Error al buscar los libros ${error}`;
        });
    });


