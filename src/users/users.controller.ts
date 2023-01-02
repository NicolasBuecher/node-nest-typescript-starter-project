import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

/**
 * Control users route handlers.
 */
@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   *
   * @param user User to create.
   * @returns The created user entity.
   * @throws If the user creation failed.
   */
  @Post()
  @ApiOperation({ description: "Create a new user." })
  @ApiCreatedResponse({
    type: UserEntity,
    description: "Created. The user has been successfully created.",
  })
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  /**
   * Fetch all users.
   *
   * @returns An array of the fetched user entities.
   */
  @Get()
  @ApiOperation({ description: "Fetch all users." })
  @ApiOkResponse({
    type: [UserEntity],
    description: "OK. The users have been successfully fetched.",
  })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  /**
   * Fetch one user.
   *
   * @param id ID of the user to fetch.
   * @returns The fetched user entity or null.
   * @throws If the request failed.
   */
  @Get(":id")
  @ApiOperation({ description: "Fetch one user." })
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully fetched.",
  })
  async findOne(@Param("id") id: string): Promise<UserEntity | null> {
    return this.usersService.findOne(+id);
  }

  /**
   * Update one user.
   *
   * @param id ID of the user to update.
   * @param user User data to update.
   * @returns The updated user entity.
   * @throw If the update failed.
   */
  @Patch(":id")
  @ApiOperation({ description: "Update one user." })
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully updated.",
  })
  async update(@Param("id") id: string, @Body() user: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(+id, user);
  }

  /**
   * Delete one user.
   *
   * @param id ID of the user to delete.
   * @returns The deleted user entity.
   * @throws If the deletion failed.
   */
  @Delete(":id")
  @ApiOperation({ description: "Delete one user." })
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully deleted.",
  })
  remove(@Param("id") id: string): Promise<UserEntity> {
    return this.usersService.remove(+id);
  }
}
