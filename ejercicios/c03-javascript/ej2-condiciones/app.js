let clasificarNota = (nota) => {
    if (nota < 4) {
        return `Desaprobado  con nota ${nota}`;
    } else if (nota >= 4 && nota <= 7) {
        return `Aprobado con nota ${nota}`;
    } else {
        return `Promocionado con nota ${nota}`;
    }
}

let diaDeLaSemana = (numero) => {
    switch (numero) {
        case 1:
            return `Lunes con numero ${numero}`;
        case 2:
            return `Martes con numero ${numero}`;
        case 3:
            return `Miercoles con numero ${numero}`;
        case 4:
            return `Jueves con numero ${numero}`;
        case 5:
            return `Viernes con numero ${numero}`;
        case 6:
            return `Sabado (fin de semana) con numero ${numero}`;
        case 7:
            return `Domingo (fin de semana) con numero ${numero}`;
        default:
            return `El numero ${numero} no corresponde a un dia de la semana`;
    }
}

console.log(clasificarNota(5));
console.log(clasificarNota(8));
console.log(clasificarNota(2));
console.log(diaDeLaSemana(1));
console.log(diaDeLaSemana(6));
console.log(diaDeLaSemana(7));
console.log(diaDeLaSemana(8));