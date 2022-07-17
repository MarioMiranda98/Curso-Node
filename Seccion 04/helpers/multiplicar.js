const colors = require('colors');
const fs = require('fs');

const multiplicarArchivo = async (base = 5) => {
    try {
        console.log('=================================');
        console.log(`           Tabla del ${base}           `);
        console.log('=================================');
        

        let buffer = "";
        for(let i = 1; i <= 10; i++) {
            //console.log(`${base} * ${i} = ${base * i}`);
            buffer += `${base} * ${i} = ${base * i}` + '\n';
        }

        fs.writeFileSync(`tabla${base}.txt`, buffer);
        return `tabla${base}.txt`;
    } catch(error) {
        return error;
    }
}

let listarTabla = (base, limite = 10) => {

    console.log('=================='.green);
    console.log(`tabla de ${ base }`.green);
    console.log('=================='.green);

    for (let i = 1; i <= limite; i++) {
        console.log(`${ base } * ${ i } = ${ base * i }`)
    }


}

module.exports = {
    multiplicarArchivo,
    listarTabla
};