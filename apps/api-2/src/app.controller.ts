import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { type Todo } from 'proto/todo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos() {
    return this.appService.getAllTodos();
  }

  @Post()
  postTodo(@Body() data: Todo) {
    return this.appService.postTodo(data);
  }

  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getTodo(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteTodo(id);
  }
}
