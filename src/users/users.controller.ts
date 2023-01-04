import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
   */
  @Post()
  @ApiOperation({ description: "Create a new user." })
  @ApiCreatedResponse({ type: UserEntity, description: "Created. The user has been successfully created." })
  @ApiConflictResponse({ description: "Conflict. Cannot update without corrupt the database." })
  @ApiBadRequestResponse({ description: "Bad Request. Invalid body content." })
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
  @ApiOkResponse({ type: [UserEntity], description: "OK. The users have been successfully fetched." })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  /**
   * Fetch one user.
   *
   * @param id ID of the user to fetch.
   * @returns The fetched user entity or null.
   */
  @Get(":id")
  @ApiOperation({ description: "Fetch one user." })
  @ApiOkResponse({ type: UserEntity, description: "OK. The user has been successfully fetched." })
  @ApiNotFoundResponse({ description: "Not Found. The user doesn't exist." })
  @ApiBadRequestResponse({ description: "Bad Request. Invalid id param." })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  /**
   * Update one user.
   *
   * @param id ID of the user to update.
   * @param user User data to update.
   * @returns The updated user entity.
   */
  @Patch(":id")
  @ApiOperation({ description: "Update one user." })
  @ApiOkResponse({ type: UserEntity, description: "OK. The user has been successfully updated." })
  @ApiNotFoundResponse({ description: "Not Found. The user to update doesn't exist." })
  @ApiConflictResponse({ description: "Conflict. Cannot update without corrupt the database." })
  @ApiBadRequestResponse({ description: "Bad Request. Invalid body content and/or id param." })
  async update(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(id, user);
  }

  /**
   * Delete one user.
   *
   * @param id ID of the user to delete.
   * @returns The deleted user entity.
   */
  @Delete(":id")
  @ApiOperation({ description: "Delete one user." })
  @ApiOkResponse({ type: UserEntity, description: "OK. The user has been successfully deleted." })
  @ApiNotFoundResponse({ description: "Not Found. The user to delete doesn't exist." })
  @ApiBadRequestResponse({ description: "Bad Request. Invalid id param." })
  remove(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.remove(id);
  }
}
