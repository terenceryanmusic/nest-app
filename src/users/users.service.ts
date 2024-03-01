import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {}

  // create a new user
  async createUser(email: string, firstName: string, lastName: string) {
    const newUser = new this.usersModel({
      email,
      firstName,
      lastName,
    });
    const result = await newUser.save();
    return result.id as string;
  }
  // get all users
  async getAllUsers() {
    const users = await this.usersModel.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  }
  // get a single user
  async getUserById(userId: string) {
    const user = await this.usersModel.findById(userId);
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
  // update a user
  async updateUser(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    const updatedUser = await this.usersModel.findById(userId);
    if (firstName) {
      updatedUser.firstName = firstName;
    }
    if (lastName) {
      updatedUser.lastName = lastName;
    }
    updatedUser.save();

    return updatedUser;
  }
  // delete a user
  async deleteUser(userId: string) {
    const result = await this.usersModel.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersModel.findById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
