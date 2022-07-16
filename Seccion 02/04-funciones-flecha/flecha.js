//Funcion tradicional
function sumar(a, b) { return a + b; }
console.log(sumar(5, 10));

//funcion de flecha
const sumarFlecha = (a, b) => {
    return a + b;
};

console.log(sumarFlecha(5, 10));

//Cuando la funcion tiene una sola linea se puede resumir
const sumarFlechaRes = (a, b) => a + b;

console.log(sumarFlechaRes(5, 10));

//Saludar 
const saludar = () => 'Hola mundo';

console.log(saludar());