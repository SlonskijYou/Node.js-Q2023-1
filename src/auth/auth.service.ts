import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as simplecrypt from "simplecrypt";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService
  ) {}

  async login(userDto: CreateUserDto) {}

  async registration(userDto: CreateUserDto) {
    const sc = simplecrypt();
    const findUser = await this.usersService.findUserByEmail(userDto.email);
    if (findUser) {
      throw new HttpException(
        "Пользователь c таким enail существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await sc.encrypt(userDto.passsword);
    const user = await this.usersService.createUser({
      ...userDto,
      passsword: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtservice.sign(payload),
    };
  }
}
