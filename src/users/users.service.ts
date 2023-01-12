import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { PostType } from 'src/posts/posts.model';
import { HashService } from './hash.service';
import { User, UserDTO, UserType } from './user.model';

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

  async getUserByUserhandle(username: string) {
    const user = await this.usersModel.findOne({ username: username })
    console.log(user)
    return user;
  }

  async registerUser(createUserDTO: UserDTO) {
    // validate DTO
    if (createUserDTO.password !== createUserDTO.passwordConfirm) {
      throw new Error('Password mismatch')
    }
    const transformedDTO = {
      ...createUserDTO,
      bio: 'This person prefers to have a mysterious aura',
      userImage: 'random',
      posts: [],
      likedPosts: []
    }
    const createUser = new this.usersModel(transformedDTO);
    // check if user exists
    const user = await this.getUserByUserhandle(createUser.userHandle);
    if (user) {
      throw new BadRequestException('User with this user handle already exists');
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
