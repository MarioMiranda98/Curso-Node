import { getPokemonById } from "../../js-foundation/06-promises";

describe('Tests at 06 Promises', () => {
  test("Should return a Pokemon name", async () => {
    const pokemonId = 1;

    const pokemon = await getPokemonById(pokemonId);

    expect(pokemon).toBe('bulbasaur')
  });

  test("Should return a undefined when Pokemon does not exist", async () => {
    const pokemonId = 1000000000000;

    try {
      await getPokemonById(pokemonId);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBe(`Pokemon not found with id: ${pokemonId}`);
    }
  });
})
