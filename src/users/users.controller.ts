import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("/users")
export class UsersController {
  constructor(private userServise: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userServise.createUser(userDto);
  }
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers() {
    return this.userServise.getAllUsers();
  }
}
