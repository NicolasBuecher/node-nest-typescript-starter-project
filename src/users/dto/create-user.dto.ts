import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
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
   * User phone number.
   */
  @ApiProperty({ description: "User phone number.", required: false })
    phone?: string;
}
