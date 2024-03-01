import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Post,
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
  async getUser(@Param('id') userId: string) {
    const user = await this.usersService.getUserById(userId);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      email,
      firstName,
      lastName,
    );
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
  }
}
