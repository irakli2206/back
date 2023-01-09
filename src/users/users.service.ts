import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PostType } from 'src/posts/posts.model';
import { UserType } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UserType>,
    @InjectModel('Posts') private readonly postsModel: Model<PostType>
  ) { }

  async getUser(userId: string) {
    const user = await this.usersModel.findOne({ _id: userId })
    console.log(user)
    return user;
  }

  async getUserPosts(userId: string) {
    const { posts } = await this.usersModel.findOne({ _id: userId })
    const userPosts = await this.postsModel.find({ _id: { $in: posts } })
    console.log(userPosts)
    return userPosts
  }
}
