import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UserType } from 'src/users/user.model';
import { PostType } from './posts.model';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel('Posts') private readonly postsModel: Model<PostType>,
    @InjectModel('Users') private readonly usersModel: Model<UserType>
  ) { }

  async getPost(postId: string) {
    const post = await this.postsModel.findOne({ _id: postId })
    console.log(post)
    return post;
  }

  async getPostLikers(postId: string) {
    const { likes } = await this.postsModel.findOne({ _id: postId })
    const users = await this.usersModel.find({ _id: { $in: likes } })
    const likesCount = users.length
    const usersShortened = users.slice(0, 30)
    console.log(users)  
    return { likesCount: likesCount, users: usersShortened }
  }

}
