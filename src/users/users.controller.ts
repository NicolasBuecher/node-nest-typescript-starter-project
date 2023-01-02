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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserEntity,
    description: "Created. The user has been successfully created.",
  })
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOkResponse({
    type: [UserEntity],
    description: "OK. The users have been successfully fetched.",
  })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully fetched.",
  })
  @ApiNotFoundResponse({ description: "Not Found. The user doesn't exist." })
  async findOne(@Param("id") id: string): Promise<UserEntity | null> {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully updated.",
  })
  async update(@Param("id") id: string, @Body() user: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(+id, user);
  }

  @Delete(":id")
  @ApiOkResponse({
    type: UserEntity,
    description: "OK. The user has been successfully deleted.",
  })
  remove(@Param("id") id: string): Promise<UserEntity> {
    return this.usersService.remove(+id);
  }
}
