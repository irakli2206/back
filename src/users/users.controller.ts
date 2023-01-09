import { Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':userId')
    async getUser(@Param('userId') userId: string) {
        let user = await this.usersService.getUser(userId)
        return user
    }

    @Get(':userId/posts')
    async getUserPosts(@Param('userId') userId: string) {
        let userPosts = await this.usersService.getUserPosts(userId)
        return userPosts
    }
}
