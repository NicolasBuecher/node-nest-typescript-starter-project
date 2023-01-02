import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty()
    id: number;

  @ApiProperty()
    email: string;

  @ApiProperty()
    name: string;

  // Swagger doesn't support union types, that's why the use of the `type` property is mandatory
  // See https://github.com/nestjs/swagger/issues/1665
  @ApiProperty({ type: "string", nullable: true })
    phone: string | null;
}
