import { getUUID } from "../../plugins"

describe('Test at Get UUID', () => {
  test("Should return an UUID", () => {
    const uuid = getUUID();

    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
  })
})
