const deadpool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "Regeneracion",
    getNombre() {
        return `${this.nombre} ${this.apellido}`;
    }
};

const { nombre, apellido, poder} = deadpool;

console.log(nombre);
console.log(apellido);
console.log(poder);
console.log(deadpool.getNombre());

function imprimeHeroe(heroe) {
    const { nombre, apellido, poder } = heroe;

    console.log(nombre);
    console.log(apellido);
    console.log(poder);
    console.log(heroe.getNombre());
}

imprimeHeroe(deadpool);

function imprimeHeroe2({ nombre, apellido, poder }) {
    console.log(nombre);
    console.log(apellido);
    console.log(poder);
}

imprimeHeroe2(deadpool);

//Desestructurar arreglos
const heroes = ['Deadpool', 'Superman', 'Batman'];

const [h1, h2, h3] = heroes;

console.log(h1, h2, h3);

const [, , he3] = heroes;

console.log(he3);