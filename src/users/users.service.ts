import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  getUserInfo() {
    return { id: 1, firstname: "Maksim", surname: "Slonskij" };
  }
}
