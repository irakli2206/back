import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PostType } from 'src/posts/posts.model';
import { CreateUserDto } from './create-user.dto';
import { HashService } from './hash.service';
import { UserType } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UserType>,
    @InjectModel('Posts') private readonly postsModel: Model<PostType>,
    private hashService: HashService
  ) { }

  async getUser(userId: string) {
    const user = await this.usersModel.findOne({ _id: userId })
    console.log(user)
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.usersModel.findOne({ username: username })
    console.log(user)
    return user;
  }

  async registerUser(createUserDto: CreateUserDto) {
    // validate DTO

    const createUser = new this.usersModel(createUserDto);
    // check if user exists
    const user = await this.getUser(createUser.id);
    if (user) {
      throw new BadRequestException();
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(createUser.password);

    return createUser.save();
  }

  async getUserPosts(userId: string) {
    const { posts } = await this.usersModel.findOne({ _id: userId })
    const userPosts = await this.postsModel.find({ _id: { $in: posts } })
    console.log(userPosts)
    return userPosts
  }
}
