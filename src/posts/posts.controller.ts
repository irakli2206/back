import { Controller, Get, Post, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

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
}
