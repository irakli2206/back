import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.model';
import { PostsSchema } from 'src/posts/posts.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/strategy/constants';
import { HashService } from './hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema, collection: 'users' }]),
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema, collection: 'posts' }]),

  ],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService, HashService]
})
export class UsersModule { }
