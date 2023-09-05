import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("/users")
export class UsersController {
  constructor(private userServise: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userServise.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.userServise.getAllUsers();
  }
}
