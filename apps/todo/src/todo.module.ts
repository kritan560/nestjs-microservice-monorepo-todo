import { Module } from '@nestjs/common';
import { PrismaModule } from './index';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
  imports: [PrismaModule],
})
export class TodoModule {}
