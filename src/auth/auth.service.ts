import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const userFindEmail = await this.usersService.findUserByEmail(
      userDto.email
    );
    const backHashPasswod = await bcrypt.compare(
      `${userDto.passsword}`,
      userFindEmail.password
    );
    if (userFindEmail && backHashPasswod) {
      return this.generateToken(userFindEmail);
    }
    throw new UnauthorizedException({
      message: "Некоректный email или пароль",
    });
  }

  async registration(userDto: CreateUserDto) {
    const findUser = await this.usersService.findUserByEmail(userDto.email);
    if (findUser) {
      throw new HttpException(
        "Пользователь c таким enail существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(`${userDto.passsword}`, 5);
    const user = await this.usersService.createUser(userDto);
    await this.usersService.updateHashPassword(userDto.email, hashPassword);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtservice.sign(payload),
    };
  }
}
