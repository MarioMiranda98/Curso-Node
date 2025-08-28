import { buildMakePerson } from "../../js-foundation/05-factory"
import { getUUID } from '../../plugins/get_id.plugin';

describe('Test at 05 factory', () => {
  const getUUID = () => "1234";
  const getAge = () => 35;

  test("Should return a function", () => {
    const makePerson = buildMakePerson({ getUUID: getUUID, getAge: getAge });

    expect(typeof makePerson).toBe('function');
  })

  test("Should makePerson return a person", () => {
    const makePerson = buildMakePerson({ getUUID: getUUID, getAge: getAge });

    const jhonDoe = makePerson({ name: 'John Doe', birthdate: '1985-10-21' });

    expect(jhonDoe).toStrictEqual({
      name: 'John Doe',
      birthdate: '1985-10-21',
      id: '1234',
      age: 35,
    });
  });
})
