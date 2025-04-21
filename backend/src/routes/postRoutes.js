const express = require('express');
const router = express.Router();
const { createPost, getPosts, votePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.post('/:postId/vote', auth, votePost);
router.delete('/:postId', auth, deletePost);

module.exports = router; 