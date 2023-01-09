import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './posts.model';
import { UsersSchema } from 'src/users/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema, collection: 'posts' }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema, collection: 'users' }])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
