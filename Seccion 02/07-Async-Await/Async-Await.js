const empleados = [
    {
        id: 1,
        nombre: 'Mario'
    },
    {
        id: 2,
        nombre: 'Mario 2'
    },
    {
        id: 3,
        nombre: 'Mario 3'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
];

const getEmpleado = (id) => {
    const promesa = new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => e.id === id)?.nombre;
        (empleado) ?
            resolve(empleado)
        : reject(`No existe el empleado con id: ${id}`);
    });

    return promesa;
}

const getSalario = (id) => {
    const promesa = new Promise((resolve, reject) => {
        const salario = salarios.find((e) => e.id === id)?.salario;
        (salario) ?
            resolve(salario)
        : reject(`No existe el salario con id: ${id}`);
    });

    return promesa;
}

const id = 10;

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El empleado: ${empleado} tiene un salario de ${salario}`;
    } catch(error) {
        return error;
    }
}

getInfoUsuario(id).then(msg => console.log(msg));