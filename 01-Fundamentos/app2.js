const fs = require("fs");

const data = fs.readFileSync("README.md", "utf-8");

const nData = data.replaceAll(/React/gi, "Angular");

console.log(nData);

fs.writeFileSync("README-Angular.md", nData);
