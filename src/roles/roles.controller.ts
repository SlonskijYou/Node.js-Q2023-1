import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.create(roleDto);
  }

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRole();
  }
}
