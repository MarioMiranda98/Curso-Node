import type { TodoEntity } from '../../entities/todo.entity.ts';
import type { TodoRepository } from '../../repositories/todo.repository.ts';

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.todoRepository.getAll();
  }
}
