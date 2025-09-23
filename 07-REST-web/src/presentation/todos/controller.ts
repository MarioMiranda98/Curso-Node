import type { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/index.ts';
import {
  CreateTodo,
  CustomErrors,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from '../../domain/index.ts';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) { }

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomErrors) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }

  public async getTodos(_req: Request, res: Response) {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  }

  public async getTodoById(req: Request, res: Response) {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(Number(id ?? '0'))
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  }

  public async createTodo(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ message: error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => this.handleError(res, error));
  }

  public async updateTodo(req: Request, res: Response) {
    const { id } = req.params;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json({ todo }))
      .catch((error) => this.handleError(res, error));
  }

  public async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'ID is required' });
    if (isNaN(+id)) return res.status(400).json({ message: 'Invalid ID' });

    new DeleteTodo(this.todoRepository)
      .execute(+id!)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  }
}
