const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment');
const authenticator = require('../middleware/authenticator');

// Returns all comments for a given post (specified by post_id in DB)
router.get('/:postId', comment.index);
// Creates a new comment under a given post (specified by post_id in DB)
router.post('/:postId', comment.create);
// Updates a comment (specified by comment_id in DB)
router.put('/:id', comment.update);
// Deletes a comment (specified by comment_id in DB)
router.delete('/:id', comment.destroy);

module.exports = router;
