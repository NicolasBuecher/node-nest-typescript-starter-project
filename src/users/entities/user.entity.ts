import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  /**
   * User id in database.
   */
  @ApiProperty({ description: "User id in database." })
    id: number;

  /**
   * User email.
   */
  @ApiProperty({ description: "User email." })
    email: string;

  /**
   * User name.
   */
  @ApiProperty({ description: "User name." })
    name: string;

  /**
   * User phone number. Null if missing.
   */
  // Swagger doesn't support union types, that's why the use of the `type` property is mandatory
  // See https://github.com/nestjs/swagger/issues/1665
  @ApiProperty({ description: "User phone number.", type: "string", nullable: true })
    phone: string | null;
}
