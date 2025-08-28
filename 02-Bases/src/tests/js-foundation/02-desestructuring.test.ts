import { characters } from "../../js-foundation/02-desectructuring";

describe('Test at 02-desesctructuring', () => {
  test("Character should contain Flash and Superman", () => {
    expect(characters).toContain('Flash');
    expect(characters).toContain('Superman');
  });

  test('First character should be Flash, Superman should be the second one', () => {
    const [flash, superman] = characters;

    expect(flash).toBe('Flash');
    expect(superman).toBe('Superman');
  })
});
