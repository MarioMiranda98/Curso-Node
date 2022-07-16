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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find((e) => e.id === id);

    if(empleado) {
        callback(null, empleado); //Si no hay ningun error se manda null
    } else {
        callback(`El empleado con id: ${id} no existe`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find((e) => e.id === id);

    if(salario) {
        callback(null, salario);
    } else {
        callback(`El salario con id: ${id} no existe`);
    }
}

//console.log(getEmpleado(1));
const id = 3;

getEmpleado(id, (err, empleado) => {
    if(err) {
        console.log("Error");
        return console.log(err);
    } 

    console.log("Empleado Existe");
    console.log(empleado);
});

getSalario(id, (err, salario) => {
    if(err) {
        console.log("Error");
        return console.log(err);
    }

    console.log("Salario Existe");
    console.log(salario);
});

//Entrando al Callback Hell
getEmpleado(id, (err, empleado) => {
    if(err) {
        console.log("Error");
        return console.log(err);
    } 

    getSalario(id, (err, salario) => {
        if(err) {
            console.log("Error");
            return console.log(err);
        }
    
        console.log('El empleado:', empleado?.nombre, ',tiene un salario de:', salario?.salario);
    });
});

