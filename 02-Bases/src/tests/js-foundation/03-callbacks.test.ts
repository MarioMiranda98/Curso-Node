import { getUserById } from '../../js-foundation/04-arrow';

describe("Test at 03-callbacks", () => {
  test("getUserById should return an error when user does not exist", (done) => {
    const userId = 10;

    getUserById(userId, (error, user) => {
      expect(error).toBeTruthy();
      expect(user).toBeUndefined();

      done();
    });
  });

  test("Should return John Doe when userId = 1", (done) => {
    const userId = 1;

    getUserById(userId, (error, user) => {
      expect(error).toBeUndefined();
      expect(user).toStrictEqual({
        id: 1,
        name: 'John Doe'
      });
      done();
    })
  })
});