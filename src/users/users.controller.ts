import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':userId')
    async getUser(@Param('userId') userId: string) {
        let user = await this.usersService.getUser(userId)
        return user
    }

    @Post('/register')
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registerUser(createUserDto);
    }

    @Get(':userId/posts')
    async getUserPosts(@Param('userId') userId: string) {
        let userPosts = await this.usersService.getUserPosts(userId)
        return userPosts
    }
}
