import type { TodoEntity } from '../../entities/todo.entity.ts';
import type { TodoRepository } from '../../repositories/todo.repository.ts';

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.findById(id);
  }
}
