import { Injectable } from "@nestjs/common";
import { Role } from "./roles.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getAllRole() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}
