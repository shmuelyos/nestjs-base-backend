//auth.service
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(googleProfile: any): Promise<any> {

        const { email } = googleProfile;
        let user = await this.usersService.findOneByEmail(email);

        if (!user) {
            user = await this.usersService.create(googleProfile);
        }

        return user;
    }
}
