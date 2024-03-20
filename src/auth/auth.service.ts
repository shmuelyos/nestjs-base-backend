//auth.service
import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(googleProfile: any): Promise<any> {
    const { email } = googleProfile;
    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      user = await this.userService.create(googleProfile);
    }

    return user;
  }
}
