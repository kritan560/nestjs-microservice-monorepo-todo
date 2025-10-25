import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  type Empty,
  type GetTodoId,
  type Todo,
  TODO_SERVICE_NAME,
  Todos,
  TodoServiceController,
} from 'proto/todo';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';

@Controller()
export class TodoController implements TodoServiceController {
  constructor(private readonly todoService: TodoService) {}

  @GrpcMethod(TODO_SERVICE_NAME, 'getAllTodos')
  getAllTodos(request: Empty): Promise<Todos> | Observable<Todos> | Todos {
    return this.todoService.getAllTodos();
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'postTodo')
  postTodo(request: Todo): Promise<Todo> | Observable<Todo> | Todo {
    return this.todoService.postTodo(request);
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'getTodo')
  getTodo(request: GetTodoId) {
    const todo = this.todoService.getTodo(request);
    if (todo) {
      return todo;
    }
    throw new Error('Todo not found');
  }

  @GrpcMethod(TODO_SERVICE_NAME, 'deleteTodo')
  deleteTodo(request: GetTodoId): Promise<Empty> | Observable<Empty> | Empty {
    return this.todoService.deleteTodo(request);
  }
}
