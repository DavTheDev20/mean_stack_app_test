import express from 'express';
import Post from '../models/post';

const postsRouter = express.Router();

interface PostResponse {
  title?: string;
  content?: string;
}

postsRouter
  .get('/', async (req, res, next) => {
    try {
      const postsData = await Post.find({});
      return res.status(200).json({ success: true, posts: postsData });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  })
  .get('/:postId', async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId });
      return res.status(200).json({ success: true, post: post });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const responseData = <PostResponse>req.body;
      if (!responseData.title && !responseData.content) {
        return res.status(400).json({
          success: false,
          error: 'Please include title and content in request json body.',
        });
      }
      const newPost = await Post.create(responseData);
      return res.status(200).json({ success: true, post: newPost });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  });

export default postsRouter;
