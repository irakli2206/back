import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UsersType } from './user.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel('Users') private readonly usersModel: Model<UsersType>) { }

  async getUser(userId: string) {
    const user = await this.usersModel.findOne({_id: userId})
    console.log(user)
    return user;
  }
}
