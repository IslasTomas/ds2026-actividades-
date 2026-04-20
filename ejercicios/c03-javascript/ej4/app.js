// <!-- Crear un array con al menos 8 números
// ● Usando for o for...of, calcular y mostrar en consola:
// ○ La suma total
// ○ El promedio
// ○ El número mayor
// ○ El número menor
// ● Crear una función generarAsteriscos(n) que reciba un número y
// retorne un string con esa cantidad de asteriscos (ej:
// generarAsteriscos(5) → "*****"). Usar un bucle for. -->

const numeros = [11, 22, 32, 54, 215, 26, 767, 118];
let sumaTotal = 0;
console.log(`Los numeros son: ${numeros}`);

for (const numero of numeros) {
    sumaTotal += numero;
}
console.log(`La suma total es: ${sumaTotal}`);
console.log(`El promedio es: ${sumaTotal / numeros.length}`);
console.log(`El numero mayor es: ${Math.max(...numeros)}`);
console.log(`El numero menor es: ${Math.min(...numeros)}`);

const generarAsteriscos = (numeroAsteriscos) => {
    let asteriscos = "";
    for (let i = 0; i < numeroAsteriscos; i++) {
        asteriscos += "*";
    }
    return asteriscos;
}

console.log(generarAsteriscos(5));

console.log(generarAsteriscos(10));