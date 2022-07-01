console.log("Inicio de programa");

setTimeout(() => {
    console.log("Primer Time Out")
}, 3000);

setTimeout(() => {
    console.log("Segundo Time Out")
}, 0);

setTimeout(() => {
    console.log("Tercer Time Out")
}, 0);

console.log("Fin de programa");