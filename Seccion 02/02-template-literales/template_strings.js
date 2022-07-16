const nombre = "Deadpool";
const real = "Wade Winston";

//para concatenar el nombre y el real
const normal = nombre + ' ' + real;

console.log(normal);

//Usando templates-strings
const template = `${nombre} ${real}`;
console.log(template);

console.log(normal === template)

const html = `
    <h1>Hola</h1>
    <p>Mundo</p>
`;

console.log(html);