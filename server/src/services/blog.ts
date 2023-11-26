import mongoose from 'mongoose';

import Blog from '../models/blog';
import { BlogInterface } from '../types/blog';

export const handleBlogCreationRequest = (blog: BlogInterface) => {
    return Blog.create(blog)
}

export const handleBlogUpdationRequest = ( _id: number, body: BlogInterface ) => {
    const { title, description } = body
    return Blog.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, { $set: { title , description} });
}

export const handleBlogDeletionRequest = (_id: number) => {
    return Blog.deleteOne({ _id })
}

export const handleBlogsFetchingRequest = (skip: number, limit: number) => {
    return Blog.find().skip(skip).limit(limit).lean()
}

export const handleBlogFetchingRequest = (id: number) => {
    return Blog.findById(id).lean()
}