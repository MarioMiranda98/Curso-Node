import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import { TodoEntity } from '../../../src/domain';
import { text } from 'stream/consumers';

describe('Testing en las rutas de Rodos', async () => {
  beforeAll(async () => {
    await testServer.start();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterAll(() => {
    testServer.close();
  });

  const todo1: TodoEntity = {
    id: 1,
    text: 'Hola mundo 1',
    completedAt: null,
    isCompleted: false,
  };
  const todo2: TodoEntity = {
    id: 2,
    text: 'Hola mundo 2',
    completedAt: null,
    isCompleted: false,
  };

  test('Should return TODOs', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const response = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    const { body } = response.body;

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeNull();
  });

  test('Should return TODOs api/todos/:id', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo1.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo1.id,
      text: todo1.text,
      completedAt: todo1.completedAt,
    });
  });

  test("Should return 404 Todo /api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` })
  });

  test("Should return a new Todo /api/todos", async () => {
    const { body } = await request(testServer.app).post('/api/todos').send(todo1).expect(201);

    expect(body).toEqual({
      id: todo1.id,
      text: todo1.text,
      completedAt: todo1.completedAt
    });
  });

  test("Should return an error if text is not valid api/todos", async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({
      ...todo1,
      text: '',
    }).expect(400);

    expect(body).toEqual({ error: 'Text property is not valid' });
  });

  test("Should return an error if text is not send api/todos", async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({
      ...todo1,
      text: null,
    }).expect(400);

    expect(body).toEqual({ error: 'Text property is not valid' });
  });

  test("Shoudl return an updated TODO /api/todos/:id", async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const newTodoData: TodoEntity = {
      id: todo1.id,
      text: 'New data',
      completedAt: new Date(),
      isCompleted: true,
    };

    const { body } = await request(testServer.app).put(`/api/todos/${todo1.id}`).send({ ...newTodoData }).expect(200);

    expect(body).toEqual({
      id: newTodoData.id,
      text: newTodoData.text,
      completedAt: newTodoData.completedAt,
    });
  });

  test("Should return a 404 if updated TODO is not found /api/todos/:id", async () => {
    const todoId = 999;
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const { body } = await request(testServer.app).put(`/api/todos/${todoId}`).send({}).expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` });
  });

  test("Shoudl return an updated TODO /api/todos/:id only date", async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const newTodoData: TodoEntity = {
      id: todo1.id,
      text: 'New data',
      completedAt: new Date(),
      isCompleted: true,
    };

    const { body } = await request(testServer.app).put(`/api/todos/${todo1.id}`).send({ ...todo1, completedAt: newTodoData.completedAt }).expect(200);

    expect(body).toEqual({
      id: todo1.id,
      text: todo1.text,
      completedAt: newTodoData.completedAt,
    });
  });

  test("Should delete a TODO api/todos/:id", async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const { body } = await request(testServer.app).delete(`/api/todos/${todo1.id}`).expect(204);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: todo1.completedAt,
    });
  });

  test("Should return a 404 if todo to delete does not exist", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app).delete(`/api/todos/${todoId}`).expect(400);

    expect(body).toEqual({ error: `Todo with id: ${todoId} not found` });
  });
});
