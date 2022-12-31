import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User | null> {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
