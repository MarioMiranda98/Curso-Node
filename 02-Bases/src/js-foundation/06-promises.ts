// const getPokemonById = (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

//   return fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((pokemon) => pokemon.name);
// };

import { httpClient } from "../plugins";

export const getPokemonById = async (id: number): Promise<String> => {
  try {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemon = await httpClient.get(url);

    return pokemon.name;
  } catch (error) {
    throw `Pokemon not found with id: ${id}`
  }
};