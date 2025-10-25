import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import {
  Todo,
  TODO_PACKAGE_NAME,
  TODO_SERVICE_NAME,
  TodoServiceClient,
} from 'proto/todo';

@Injectable()
export class AppService implements OnModuleInit {
  private todoServiceClient: TodoServiceClient;

  constructor(@Inject(TODO_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.todoServiceClient =
      this.clientGrpc.getService<TodoServiceClient>(TODO_SERVICE_NAME);
  }

  getAllTodos() {
    return this.todoServiceClient.getAllTodos({});
  }

  postTodo(data: Todo) {
    return this.todoServiceClient.postTodo(data);
  }

  getTodo(id: number) {
    return this.todoServiceClient.getTodo({ id });
  }

  deleteTodo(id: number) {
    return this.todoServiceClient.deleteTodo({ id });
  }
}
