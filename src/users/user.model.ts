import { ObjectId } from "mongoose"
import * as mongoose from 'mongoose'
import {
    Schema,
    SchemaFactory,
    Prop
} from "@nestjs/mongoose";
import {
    Document
} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    userHandle: string;
    @Prop({ required: true })
    userImage: string;
    @Prop({ required: true })
    bio: string;
    @Prop({ required: true })
    posts: string[];
    @Prop({ required: true })
    likedPosts: string[];

}

export const UsersSchema = SchemaFactory.createForClass(User);


export type UserType = {
    username: string
    password: string
    userHandle: string
    userImage: string
    bio: string
    posts: string[]
    likedPosts: string[]
}

export type UserDTO = {
    userHandle: string
    username: string
    password: string
    passwordConfirm: string
}

export type UserLogin = {
    userhandle: string 
    password: string
}