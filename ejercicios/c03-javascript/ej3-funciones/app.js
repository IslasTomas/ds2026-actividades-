//  Crear función calcularPrecioFinal(monto, medioPago) donde
// medioPago es "E" (efectivo), "D" (débito) o "C" (crédito):
// ○ Monto menor a $200: sin descuento
// ○ Entre $200 y $400: 30% off en efectivo, 20% débito, 10%
// crédito
// ○ Mayor a $400: 40% off para todos
// ○ Retornar el monto final
// ● Probar con al menos 5 combinaciones diferentes de monto y
// medio de pago. Mostrar cada resultado en consola con template
// literals: "Monto: $X | Pago: Y | Final: $Z" 
const calcularPrecioFinal = (monto, medioPago) => {
    if (monto < 200) { 
        return `Monto: $${monto} | Pago: ${medioPago} | Final: $${monto}`;
    } else if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") {
            return `Monto: $${monto} | Pago: ${medioPago} | Final: $${monto*0.7}`;
        } else if (medioPago === "D") {
            return `Monto: $${monto} | Pago: ${medioPago} | Final: $${monto*0.8}`;
        } else if (medioPago === "C") {
            return `Monto: $${monto} | Pago: ${medioPago} | Final: $${monto*0.9}`;
        }
    } else {
        return `Monto: $${monto} | Pago: ${medioPago} | Final: $${monto*0.6}`;
    }
}

console.log(calcularPrecioFinal(100, "E"));
console.log(calcularPrecioFinal(200, "D"));
console.log(calcularPrecioFinal(200, "E"));

console.log(calcularPrecioFinal(300, "C"));
console.log(calcularPrecioFinal(300, "D"));
console.log(calcularPrecioFinal(400, "E"));
console.log(calcularPrecioFinal(400, "C"));
console.log(calcularPrecioFinal(500, "D"));
console.log(calcularPrecioFinal(600, "E"));
console.log(calcularPrecioFinal(600, "C"));