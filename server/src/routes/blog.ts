import ('../auth/index')

import express from 'express';
import passport from 'passport'

const router = express.Router();

import { getBlogsFromDatabase, 
         updateBlogInDatabase, 
         deleteBlogFromDatabase, 
         createBlogInDatabase, 
         getBlogFromDatabase
       } from '../controllers/blog';

router
.route('/')
.get(passport.authenticate('jwt', { session: false }), getBlogsFromDatabase)
.post(passport.authenticate('jwt', { session: false }), createBlogInDatabase)

router
  .route('/:id')
  .put(passport.authenticate('jwt', { session: false }), updateBlogInDatabase)
  .delete(deleteBlogFromDatabase)
  .get(passport.authenticate('jwt', { session: false }), getBlogFromDatabase)

export default router;
