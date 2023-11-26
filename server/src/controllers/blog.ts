import { RequestHandler } from "express";

import { BlogInterface } from '../types/blog';
import { StatusCodes } from "http-status-codes";
import { Constants } from "../utility/constants";
import logger from "../config/logger";
import { handleBlogCreationRequest, 
         handleBlogDeletionRequest, 
         handleBlogUpdationRequest, 
         handleBlogsFetchingRequest, 
         handleBlogFetchingRequest 
       } from "../services/blog";

export const createBlogInDatabase : RequestHandler<unknown, unknown, BlogInterface , unknown> = async (req, res, next) => {
  try {
    const blog = await handleBlogCreationRequest(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      data: blog,
      message: Constants.createdBlogSuccessfully
    })

  } catch (error: unknown) {
    if(error instanceof Error) {
      logger.error(error.message)
      next(error.message)
    }
  }
}


export const updateBlogInDatabase : RequestHandler<{ id: number }, unknown, BlogInterface , unknown> = async (req, res, next) => {
  try {
      const { id } = req.params;

      const blog = await handleBlogUpdationRequest(id, req.body)
      
      const skip = 0

      const limit = 10
      
      const blogs = await handleBlogsFetchingRequest(skip, limit)

      res.status(StatusCodes.OK).json({
        success: true,
        data: blogs,
        message: Constants.updatedBlogSuccessfully
      })

  } catch (error: unknown) {
    if(error instanceof Error) {
      logger.error(error.message)
      next(error.message)
    }
  }
}

export const deleteBlogFromDatabase : RequestHandler<{ id: number }, unknown, BlogInterface , unknown> = async (req, res, next) => {
  try {
      const { id } = req.params;

      const blog = await handleBlogDeletionRequest(id);

      const skip = 0

      const limit = 10
      
      const blogs = await handleBlogsFetchingRequest(skip, limit)

      res.status(StatusCodes.OK).json({
        success: true,
        data: blogs,
        message: Constants.deletedBlogSuccessfully
      })

  } catch (error:unknown) {
    if(error instanceof Error) {
      logger.error(error.message)
      next(error.message)
    }
  }
}

export const getBlogsFromDatabase : RequestHandler<{ _id: number }, unknown, BlogInterface , { page: number, limit: number }> = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;

    const blogs = await handleBlogsFetchingRequest(skip, limit)
    
    res.status(StatusCodes.OK).json({
      success: true,
      data: blogs,
      message: Constants.fetchedAllBlogsSuccessfully
    })

  } catch (error: unknown) {
    if(error instanceof Error) {
      logger.error(error.message)
      next(error.message)
    }
  }
}

export const getBlogFromDatabase : RequestHandler<{ id: number }, unknown, BlogInterface , unknown > = async (req, res, next) => {
  try {
    
    const { id } = req.params

    const blog = await handleBlogFetchingRequest(id)

    res.status(StatusCodes.OK).json({
      success: true,
      data: blog,
      message: Constants.fetchedAllBlogsSuccessfully
    })

  } catch (error: unknown) {
    if(error instanceof Error) {
      logger.error(error.message)
      next(error.message)
    }
  }

}