import { yarg } from './config/plugins';
console.log(yarg);

const fs = require('fs');


const message = "Hola Mundo"

console.log(message);

const { b: base, l: limit, s: show } = yarg;
const format: string[] = [];
const multipliers: number[] = Array.from<number>(Array(limit).keys()).map(x => x + 1);

const header = `
=================================
  Tabla del ${base}           
=================================
`;


if (show) console.log(header)
console.log("")

format.push(header);

multipliers.forEach((element) => {
  const f = `${base} X ${element} = ${base * element}`;

  format.push(f);
  if (show) console.log(f);
});

console.log("")

const outputPath = "outputs";

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/m${base}.txt`, format.join('\n'));