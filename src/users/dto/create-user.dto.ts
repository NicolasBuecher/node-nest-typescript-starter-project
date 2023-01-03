import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPhoneNumber,
} from "class-validator";

export class CreateUserDto {
  /**
   * User email.
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "User email." })
    email: string;

  /**
   * User name.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User name." })
    name: string;

  /**
   * User phone number.
   */
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({ description: "User phone number.", required: false })
    phone?: string;
}
