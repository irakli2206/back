import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Coordinates } from './posts.model';
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
        let posts = await this.postsService.getAreaPosts(minLat, maxLat, minLong, maxLong)
        return posts
    }

    @Get(':postId')
    async getPost(@Param('postId') postId: string) {
        let post = await this.postsService.getPost(postId)
        return post
    }

    @Post('/filtered')
    async getFilteredPosts(@Body('postIds') postIds: string[]) {
        let post = await this.postsService.getFilteredPosts(postIds)
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
        @Body('content') content: string,
        @Body('coordinates') coordinates: Coordinates
    ) {
        let createdPost = await this.postsService.createPost(userId, content, coordinates)
        return createdPost
    }

    @Post('like')
    async likePost(
        @Body('userId') userId: string,
        @Body('postId') postId: string
    ) {
        console.log(userId, postId)
        let { newUser, newPost } = await this.postsService.likePost(userId, postId)
        return { newUser, newPost }
    }

    @Post(':postId/write-comment')
    async writePostComment(
        @Param('postId') postId: string,
        @Body('userId') userId: string,
        @Body('content') content: string,
    ) {
        let { newPost, user } = await this.postsService.writePostComment(postId, userId, content)
        return { newPost, user }
    }
}
