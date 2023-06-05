import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body('email') userEmail: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const generatedId = await this.usersService.createUser(
      userEmail,
      firstName,
      lastName,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    await this.usersService.updateUser(userId, email, firstName, lastName);
    return null;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
  }
}
