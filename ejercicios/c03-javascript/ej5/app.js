// Crear un HTML con un <input type="number"> y un <button>
// "Generar"
// ● Al hacer click, leer el número del input y generar un "medio-
// árbol" de asteriscos de esa altura.
// Ejemplo para altura 4:
// *
// **
// ***
// ****
// ● Mostrar el resultado en un <pre> en la página (no en consola)
// ● Validar: si el input está vacío o es menor a 1, mostrar un
// mensaje de error en la página

const inputAsteriscos = document.getElementById("inputAsteriscos");
const buttonAsteriscos = document.getElementById("buttonAsteriscos");
const preAsteriscos = document.getElementById("preAsteriscos");

const generarAsteriscos = (altura) => {
    let asteriscos = "";
    for (let i = 1; i <= altura; i++) {
        asteriscos+="*".repeat(i);
        asteriscos+="\n";
    }
    return asteriscos;
}


buttonAsteriscos.addEventListener("click", () => {
    const altura = inputAsteriscos.value;
    if (altura < 1) {
        alert("La altura debe ser mayor a 0");
    } else {
        preAsteriscos.innerHTML = generarAsteriscos(altura);
    }
});