import { createWriteStream } from "fs";
import { get } from "http";
import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

const DEFAULT_PORT = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("Node + Nest + TypeScript starter project API")
    .setDescription("Basic User API generated with @nestjs/swagger")
    .setVersion("1.0")
    .addTag("users")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || DEFAULT_PORT);

  const serverUrl = await app.getUrl();
  console.log(`Application is running on: ${serverUrl}`);

  // Everytime the app starts in development mode, copy the swagger files to a static folder
  // This is a hack because swagger doesn't work in production
  // See https://stackoverflow.com/a/74708365/5053300
  if (process.env.NODE_ENV === "development") {
    get(
      `${serverUrl}/api/swagger-ui-bundle.js`,
      (response) => {
        response.pipe(createWriteStream("swagger-static/swagger-ui-bundle.js"));
        console.log("Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'");
      },
    );

    get(
      `${serverUrl}/api/swagger-ui-init.js`,
      (response) => {
        response.pipe(createWriteStream("swagger-static/swagger-ui-init.js"));
        console.log("Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'");
      },
    );

    get(
      `${serverUrl}/api/swagger-ui-standalone-preset.js`,
      (response) => {
        response.pipe(createWriteStream("swagger-static/swagger-ui-standalone-preset.js"));
        console.log("Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'");
      },
    );

    get(
      `${serverUrl}/api/swagger-ui.css`,
      (response) => {
        response.pipe(createWriteStream("swagger-static/swagger-ui.css"));
        console.log("Swagger UI css file written to: '/swagger-static/swagger-ui.css'");
      },
    );
  }
}

bootstrap();
