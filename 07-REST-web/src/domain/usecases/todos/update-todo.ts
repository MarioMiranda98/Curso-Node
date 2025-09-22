import type { UpdateTodoDto } from '../../dtos/index.ts';
import type { TodoEntity } from '../../entities/todo.entity.ts';
import type { TodoRepository } from '../../repositories/todo.repository.ts';

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.updateTodo(dto);
  }
}
