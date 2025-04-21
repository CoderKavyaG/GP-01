const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.user._id,
      image
    });

    await post.save();
    
    // Add post to user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post._id }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

const votePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { direction } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user has already voted
    const user = await User.findById(req.user._id);
    const existingVote = user.votes.find(vote => vote.postId.toString() === postId);

    if (existingVote) {
      // If voting in same direction, remove vote
      if (existingVote.direction === direction) {
        post.votes -= direction;
        user.votes = user.votes.filter(vote => vote.postId.toString() !== postId);
      } else {
        // If voting in opposite direction, update vote
        post.votes += direction * 2;
        existingVote.direction = direction;
      }
    } else {
      // Add new vote
      post.votes += direction;
      user.votes.push({ postId, direction });
    }

    await post.save();
    await user.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error voting on post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      author: req.user._id
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Remove post from user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { posts: post._id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

module.exports = {
  createPost,
  getPosts,
  votePost,
  deletePost
}; 