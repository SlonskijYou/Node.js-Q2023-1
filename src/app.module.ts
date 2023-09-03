import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "slret234658",
      database: "Nest-DataBase",
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
