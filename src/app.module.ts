import { join } from "path";
import { CacheModule, Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { redisStore } from "cache-manager-redis-yet";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 3600000,
      // @ts-ignore
      store: redisStore,
      url: process.env.REDIS_URL,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "swagger-static"),
      serveRoot: process.env.NODE_ENV === "development" ? "/" : "/api",
    })],
})
export class AppModule {}
