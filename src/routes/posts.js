// src/routes/posts.js
import express from 'express';
const router = express.Router();
import Post from '../models/Post.js';
//import  isAuthenticated  from '../auth.js';

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
    console.log(heloooooooooooooooooooooooo);
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// Protected route: Create a new post
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author, genre });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//**********************************************************************
// Example route handling after successful GitHub authentication
router.get('/profile', isAuthenticated, (req, res) => {
  // Access GitHub profile data
  const githubProfile = req.user;

  // You can now use the data in githubProfile
  res.json({ user: githubProfile });
});

//**********************************************************************


// Get a specific post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get posts by genre
router.get('/by-genre/:genre', async (req, res) => {
  try {
    const posts = await Post.find({ genre: req.params.genre });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get the latest N posts
router.get('/latest', async (req, res) => {
  try {
    const { n = 10 } = req.query; // Default to 10 posts if N is not specified
    const latestPosts = await Post.find().sort({ createdAt: -1 }).limit(parseInt(n));
    res.json(latestPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route: Update a post by ID
router.put('/:postId', isAuthenticated, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a post by ID
router.delete('/:postId',isAuthenticated,  async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// OAuth 2.0 protected route: Retrieve user's preferences
router.get('/user/preferences', isAuthenticated, async (req, res) => {
  try {
    // Return user's preferences
    res.json({ preferences: req.user.preferences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;


