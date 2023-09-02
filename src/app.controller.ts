import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController {
  @Get("/users")
  getUser() {
    return { id: 1, firstname: "Maksim", surname: "Slonskij" };
  }
}
