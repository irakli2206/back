import { ObjectId } from "mongoose"
import * as mongoose from 'mongoose'

export const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userHandle: { type: String, required: true },
    userImage: { type: String, required: true },
    bio: { type: String, required: true },
    posts: { type: Array<ObjectId>, required: true },
    likedPosts: { type: Array<ObjectId>, required: true },
})

export type UsersType = {
    username: string
    userHandle: string
    userImage: string
    bio: string
    posts: string[]
    likedPosts: string[]
}