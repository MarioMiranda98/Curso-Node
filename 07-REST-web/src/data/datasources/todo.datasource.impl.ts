import {
  TodoEntity,
  type CreateTodoDto,
  type TodoDatasource,
  type UpdateTodoDto,
} from '../../domain/index.ts';
import { prisma } from '../postgres/index.ts';

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const createdTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(createdTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todosPrisma = await prisma.todo.findMany();
    const todos: TodoEntity[] = todosPrisma.map((todo) =>
      TodoEntity.fromObject(todo)
    );

    return todos;
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!todo) throw 'Todo not found';

    const te: TodoEntity = TodoEntity.fromObject(todo);

    return te;
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updateTodoDto.id);

    if (!todo) throw `Todo with id: ${updateTodoDto.id} does not exist`;

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(updateTodoDto.id) },
      data: updateTodoDto!.values,
    });

    const ute: TodoEntity = TodoEntity.fromObject(updatedTodo);

    return ute;
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deleted = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return TodoEntity.fromObject(deleted);
  }
}
