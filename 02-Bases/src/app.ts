const templateModule = require("./js-foundation/01-template");
// require("./js-foundation/02-desectructuring");
// const { getUserById } = require("./js-foundation/03-callbacks");
const { getUserById } = require("./js-foundation/04-arrow")
const { buildMakePerson } = require("./js-foundation/05-factory");
const { getAge, getUuid, buildLogger } = require("./plugins");
const { getPokemonById } = require("./js-foundation/06-promises");

console.log(templateModule.emailTemplate);
const logger = buildLogger("app.js");
logger.log("Hola mundo");
logger.error("Esto es algo malo");

interface User {
  id: 1,
  name: string,
}

getUserById(1, (error?: string, user?: User) => {
  if (error) {
    throw new Error("User not found with id");
  }

  console.log({ user });
});

const makePerson = buildMakePerson(getUuid, getAge);

const obj = { name: "John Doe", birthdate: "1998-08-05" };

const john = makePerson(obj);

console.log(john);

(async () => {
  const pokemon = await getPokemonById(1);

  console.log(pokemon);
})();
