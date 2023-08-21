const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const authenticator = require('../middleware/authenticator');

router.get('/', authenticator, post.getAll);
router.get('/:id', authenticator, post.getOne);
router.post('/add', authenticator, post.addOne);
router.delete('/delete/:id', authenticator, post.deleteOne);

module.exports = router;
