import { User } from 'src/entities/user.schema';
import { UserService } from './user.service';
import { CreateuserDto } from './createUser-dto';
import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';

import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from '../quiz/quiz-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateuserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsersQuiz();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return (await this.userService.getUserById(id));
  }

  @Put(':id') 
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: CreateuserDto
  ): Promise<User | null> {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User | null> {
    return this.userService.deleteUser(id);
  }
}