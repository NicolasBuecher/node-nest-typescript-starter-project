import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

/**
 * Expose CRUD operations on user records with Prisma ORM.
 */
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Create a new user record in database.
   *
   * @param user User data to create the record with.
   * @returns The created user entity.
   * @throws If the user creation query failed.
   */
  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.user.create({ data: user });
  }

  /**
   * Fetch all user records in database.
   *
   * @returns An array of the fetched user entities.
   * @throws If the query failed.
   */
  async findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany();
  }

  /**
   * Fetch one user record in database.
   *
   * @param id ID of the user record to fetch.
   * @returns The fetched user entity or null.
   * @throws If the query failed.
   */
  async findOne(id: number): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  /**
   * Update one user record in database.
   *
   * @param id ID of the user record to update.
   * @param user User data to update the record with.
   * @returns The updated user entity.
   * @throws If the update query failed.
   */
  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id },
      data: user,
    });
  }

  /**
   * Delete one user record in database.
   *
   * @param id ID of the user record to delete.
   * @returns The deleted user entity.
   * @throws If the deletion query failed.
   */
  async remove(id: number): Promise<UserEntity> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
