import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async getAreaPosts(
        @Body('minLat') minLat: number,
        @Body('maxLat') maxLat: number,
        @Body('minLong') minLong: number,
        @Body('maxLong') maxLong: number,
    ) {
        console.log('lat ')
        console.log(minLat)
        let posts = await this.postsService.getAreaPosts(minLat, maxLat, minLong, maxLong)
        console.log(posts)
        return posts
    }

    @Get(':postId')
    async getPost(@Param('postId') postId: string) {
        let post = await this.postsService.getPost(postId)
        return post
    }

    @Get(':postId/likes')
    async getPostLikers(@Param('postId') postId: string) {
        let user = await this.postsService.getPostLikers(postId)
        return user
    }

    @Post('create')
    async createPost(
        @Body('userId') userId: string,
        @Body('content') content: string
    ) {
        let createdPost = await this.postsService.createPost(userId, content)
        return createdPost
    }

    @Post('like')
    async likePost(
        @Body('userId') userId: string,
        @Body('postId') postId: string
    ) {
        let { updatedUser, updatedPost } = await this.postsService.likePost(userId, postId)
        return { updatedUser, updatedPost }
    }
}
