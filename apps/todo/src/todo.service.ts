import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetTodoId, Todo, Todos } from 'proto/todo';
import { PrismaService } from './index';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  private todos: Todo[] = [{ id: 1, task: 'Sample Task' }];

  async getAllTodos(): Promise<Todos> {
    const todos = await this.prisma.todo.findMany();
    return { todos: todos };
  }

  async postTodo(todo: Todo): Promise<Todo> {
    this.todos.push({ ...todo, id: this.todos.length + 1 });
    const newTodo = await this.prisma.todo.create({
      data: { task: todo.task },
    });
    return newTodo;
  }

  async getTodo(id: GetTodoId): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id: id.id },
    });
    if (!todo) {
      throw new RpcException({
        message: 'Todo not found',
        code: status.NOT_FOUND,
      });
    }
    return todo;
  }

  async deleteTodo(id: GetTodoId) {
    const deletedTodos = await this.prisma.todo.delete({
      where: { id: id.id },
    });
    return deletedTodos;
  }
}
