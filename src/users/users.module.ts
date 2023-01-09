import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.model';
import { PostsSchema } from 'src/posts/posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema, collection: 'users' }]),
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema, collection: 'posts' }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
