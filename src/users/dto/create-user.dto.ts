import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
    email: string;

  @ApiProperty()
    name: string;

  @ApiProperty({ required: false })
    phone?: string;
}
