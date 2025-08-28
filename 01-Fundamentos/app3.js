const fs = require("fs");

const data = fs.readFileSync("README.md", "utf-8");

const words = data.split(" ");
const wordCount = words.length;

const reactWordCount = data.match(/react/gi ?? []).length;

console.log(`Palabras: ${wordCount}`);
console.log(`Palabras: ${reactWordCount}`);
