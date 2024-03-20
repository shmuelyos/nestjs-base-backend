import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(googleProfile: any): Promise<User> {
    const newUser = new this.userModel({
      email: googleProfile.email,
      firstName: googleProfile.firstName,
      lastName: googleProfile.lastName
    });
    return newUser.save();
  }

  async getUser(email) {
    return this.userModel.findOne({ email }).exec();
  }

  async destroySession(session) {
    return await session.destroy();
  }
}
