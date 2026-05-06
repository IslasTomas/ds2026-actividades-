"use strict";
// Ejercicio 1 - Medio-árbol de asteriscos TIPADO
// Objetivo: tomar el Ejercicio 5 de C03 (DOM: input y botón) y
// reconvertirlo a TypeScript para ver la diferencia.
// Pasos:
// ● Copiar el ejercicio 05 de la clase anterior
// ● Crear un archivo app.ts con las funciones convertidas a
// typescript.
// ● Traspilar: tsc app.ts
// ● Abrir en el navegador y probar.
// ● Romper algo a propósito: cambiar la firma de la función
// generarAsteriscos() para que reciba string en vez de number, y
// ver cómo tsc "se queja" antes de generar el .js.
const inputAsteriscos = document.getElementById("inputAsteriscos");
const buttonGenerarAsteriscos = document.getElementById("buttonGenerarAsteriscos");
const preAsteriscos = document.getElementById("preAsteriscos");
const generateAsteriscos = (altrura) => {
    let asteriscos = "";
    for (let i = 1; i <= altrura; i++) {
        // += para no perder los asteriscos anteriores
        asteriscos += "*".repeat(i);
        // con esto hacemos el salto de linea
        asteriscos += "\n";
    }
    return asteriscos;
};
console.log("arbolito", generateAsteriscos(4));
buttonGenerarAsteriscos?.addEventListener("click", () => {
    const altura = inputAsteriscos?.valueAsNumber;
    if (altura < 1) {
        alert("La altura debe ser mayor a 0");
    }
    else {
        // aca estamos diceindoloe a  ts que preAsteriscos no es null o undefined
        preAsteriscos.innerHTML = generateAsteriscos(altura);
        // aca estamos chequeando si preAsteriscos es null o undefined
        if (preAsteriscos) {
            preAsteriscos.innerHTML = generateAsteriscos(altura);
        }
    }
});
