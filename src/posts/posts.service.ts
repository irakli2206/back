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

  //Get posts within the frontend map constraints
  async getAreaPosts(minLat: number, maxLat: number, minLong: number, maxLong: number) {
    const posts = await this.postsModel.find({
      'coordinates.latitude': { $gt: minLat, $lt: maxLat },
      'coordinates.longitude': { $gt: minLong, $lt: maxLong },
    })

    return posts
  }

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

  async createPost(userId: string, content: string) {
    const newPost = new this.postsModel({
      userId,
      content,
      coordinates: {
        latitude: 42,
        longitude: 42
      },
      comments: [],
      likes: []
    })

    const savedPost = await newPost.save()

    return savedPost
  }

  //also handles unliking
  async likePost(userId: string, postId: string) {
    const oldPost = await this.postsModel.findOne({ _id: postId })
    const oldUser = await this.usersModel.findOne({ _id: userId })

    let newPost, newUser

    if (oldPost.likes.includes(userId)) {
      console.log('reached')
      newPost = { ...oldPost.toObject(), likes: [...oldPost.toObject().likes.filter(user => user != userId)] }
      newUser = { ...oldUser.toObject(), likedPosts: [...oldUser.toObject().likedPosts.filter(post => post != postId)] }

    }
    else {
      newPost = { ...oldPost.toObject(), likes: [...oldPost.toObject().likes, new ObjectId(userId)] }
      newUser = { ...oldUser.toObject(), likedPosts: [...oldUser.toObject().likedPosts, new ObjectId(postId)] }
    }


    const updatedPost = await this.postsModel.updateOne({ _id: postId }, newPost)
    const updatedUser = await this.usersModel.updateOne({ _id: userId }, newUser)

    return { updatedPost, updatedUser }
  }

}