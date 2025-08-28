import { getAge } from "../../plugins";

describe("Tests at get age plugin", () => {
  test("getAge() sholud return the of the person", () => {
    const birthdate = "1998-08-05";
    const expectedAge = 27;
    const age = getAge(birthdate);

    expect(typeof age).toBe('number');
    expect(age).toBe(expectedAge);
  });

  test("getAge should return 0 years", () => {
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1998);

    const birthdate = "1998-08-05";
    const age = getAge(birthdate);

    expect(age).toBe(0);
  });
});