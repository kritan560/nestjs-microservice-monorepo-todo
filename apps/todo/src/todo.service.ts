import { Injectable } from '@nestjs/common';
import { GetTodoId, Todo, Todos } from 'proto/todo';

@Injectable()
export class TodoService {
  private todos: Todo[] = [{ id: 1, task: 'Sample Task' }];

  getAllTodos(): Todos {
    return { todos: this.todos };
  }

  postTodo(todo: Todo): Todo {
    this.todos.push({ ...todo, id: this.todos.length + 1 });
    return todo;
  }

  getTodo(id: GetTodoId) {
    return this.todos.find((todo) => todo.id === id.id);
  }

  deleteTodo(id: GetTodoId) {
    this.todos = this.todos.filter((todo) => todo.id !== id.id);
    return {};
  }
}
