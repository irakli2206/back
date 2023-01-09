import { ObjectId } from "mongoose"
import * as mongoose from 'mongoose'

export const PostsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    comments: { type: Object, required: true },
    likes: { type: Array<String>, required: true },
    coordinates: { type: Object, required: true },
})

export type PostType = {
    userId: string
    content: string
    comments: Comment[]
    likes: string[]
    coordinates: Coordinates
}

export type Comment = {
    userId: string 
    content: string 
}

export type Coordinates = {
    latitude: number
    longitude: number
}