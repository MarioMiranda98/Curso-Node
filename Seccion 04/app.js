const { multiplicarArchivo, listarTabla } = require('./helpers/multiplicar');
const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

/* Con Fines educativos
const [ , , arg3 = 5] = process.argv;
const [ , base = 5] = arg3.split('='); */
// console.log(argv);
// console.log(argv.b);

// multiplicarArchivo(argv.b)
//     .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
//     .catch(err => console.log(err));

let comando = argv._[0];
console.log(argv._[0])
switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite);
        break;

    case 'crear':
        multiplicarArchivo(argv.base, argv.limite)
            .then(archivo => console.log(`Archivo creado: `, colors.green(archivo)))
            .catch(e => console.log(e));
        break;

    default:
        console.log('Comando no reconocido');

}