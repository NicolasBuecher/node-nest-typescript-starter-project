import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const { code, message } = exception;

    // Log full error message on the server
    console.error(message);

    // Trim error message for the client
    const trimmedMessage = message.substring(message.lastIndexOf("\n") + 1);

    // Map Prisma Client exception codes to their corresponding HTTP status code
    switch (code) {
      case "P2000":
        super.catch(new HttpException(trimmedMessage, HttpStatus.BAD_REQUEST), host);
        break;
      case "P2002":
        super.catch(new HttpException(trimmedMessage, HttpStatus.CONFLICT), host);
        break;
      case "P2025":
        super.catch(new HttpException(trimmedMessage, HttpStatus.NOT_FOUND), host);
        break;
      default:
        super.catch(exception, host);
    }
  }
}
