import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Assuming you have a service to manage user data

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(googleProfile: any): Promise<any> {
        // Extract necessary info from googleProfile
        const { email } = googleProfile;
        let user = await this.usersService.findOneByEmail(email);

        if (!user) {
            // Create a new user if doesn't exist
            user = await this.usersService.create(googleProfile);
        }

        // You can perform additional checks or transformations here
        return user;
    }
}
