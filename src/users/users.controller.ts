import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private userInfo: UsersService) {}
  @Get("/get")
  getUser() {
    return this.userInfo.getUserInfo();
  }
}
