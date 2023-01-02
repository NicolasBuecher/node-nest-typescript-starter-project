import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.user.create({ data: user });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id },
      data: user,
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
