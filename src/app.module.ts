import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule, MongooseModule.forRoot("mongodb+srv://irakli2206:2206Ilkari@cluster0.jvigiyl.mongodb.net/?retryWrites=true&w=majority", {dbName: 'chirper'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
