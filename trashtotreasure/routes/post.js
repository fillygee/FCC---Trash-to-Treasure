const express = require('express');
const router = express.Router();
const post = require('../controllers/post');
const authenticator = require('../middleware/authenticator');

router.get('/', post.index);
router.get('/:id', post.getOne);
router.post('/', post.addOne);
router.put('/:id', post.putOne);
router.delete('/:id', post.deleteOne);

module.exports = router;
