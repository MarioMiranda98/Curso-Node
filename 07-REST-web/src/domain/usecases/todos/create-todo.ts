import type { CreateTodoDto } from '../../dtos/index.ts';
import type { TodoEntity } from '../../entities/todo.entity.ts';
import type { TodoRepository } from '../../repositories/todo.repository.ts';

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(dto);
  }
}
