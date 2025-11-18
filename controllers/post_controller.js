

import Post from '../models/post_mode.js';
import asyncHandler from '../utils/async_handler.js';
import ErrorResponse from '../utils/error_response.js';



export const getPosts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  

  let query = { status: 'published' };
  
  
  if (req.query.category) {
    query.categories = req.query.category;
  }
  
  // Search
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  
  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .populate('author', 'name avatar')
    .populate('categories', 'name')
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);


  const pagination = {};
  if (startIndex + limit < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});


export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name avatar bio')
    .populate('categories', 'name')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    });

  if (!post || post.status !== 'published') {
    return next(new ErrorResponse('Post not found', 404));
  }

  post.views += 1;
  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});


export const createPost = asyncHandler(async (req, res, next) => {
  
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});



export default {getPost, createPost}



