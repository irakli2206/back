import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema, collection: 'users' }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
