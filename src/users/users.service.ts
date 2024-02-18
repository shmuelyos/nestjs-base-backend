import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema'; // Define your User schema under the schemas folder

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(googleProfile: any): Promise<User> {
        const newUser = new this.userModel({
            email: googleProfile.email,
            name: googleProfile.name,
            googleId: googleProfile.sub, // Assuming 'sub' is the Google ID
            // Add other necessary fields
        });
        return newUser.save();
    }
}
