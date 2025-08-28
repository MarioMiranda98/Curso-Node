import { httpClientPlugin } from "../../plugins/http-client.plugin"

describe("test at http client plugin", () => {
  test("httpClientPlugin should return an Object", async () => {
    const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1');

    expect(typeof data).toBe("object");
    expect(data).toEqual(
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": expect.any(Boolean)
      }
    );
  })

  test("httpClientPlugin should have POST, PUT and DELETE methods", () => {
    const postMethod = httpClientPlugin.post;
    const putMethod = httpClientPlugin.put;
    const deleteMethod = httpClientPlugin.delete;

    expect(typeof postMethod).toBe('function');
    expect(typeof putMethod).toBe('function');
    expect(typeof deleteMethod).toBe('function');
  });
})