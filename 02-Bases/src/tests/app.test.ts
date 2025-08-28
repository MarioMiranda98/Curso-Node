describe('App', () => {
  test('Should be 30', () => {
    // 1 Arranage
    const num1 = 10;
    const num2 = 20;

    // 2 Act
    const res = num1 + num2;

    // 3 Assert
    expect(res).toBe(30);
  })
});