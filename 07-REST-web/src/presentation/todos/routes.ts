import { Router } from 'express';
import { TodosController } from './controller.ts';
import { TodoRepositoryImpl } from '../../data/repositories/todo.repository.impl.ts';
import { TodoDatasourceImpl } from '../../data/datasources/todo.datasource.impl.ts';
import type { TodoDatasource } from '../../domain/datasources/todo.datasource.ts';
import { TodoRepository } from '../../domain/repositories/todo.repository.ts';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoDatasource: TodoDatasource = new TodoDatasourceImpl();
    const todoRepository: TodoRepository = new TodoRepositoryImpl(
      todoDatasource
    );

    const todosController = new TodosController(todoRepository);

    router.get('/', todosController.getTodos.bind(todosController));
    router.get('/:id', todosController.getTodoById.bind(todosController));
    router.post('/', todosController.createTodo.bind(todosController));
    router.put('/:id', todosController.updateTodo.bind(todosController));
    router.delete('/:id', todosController.deleteTodo.bind(todosController));

    return router;
  }
}
