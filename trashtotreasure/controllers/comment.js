const Comment = require('../models/Comment');

async function index(req, res) {
    try {
        const postId = req.params.postId;
        const result = await Comment.getAllByPostId(postId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        // req.body must contain user_id of commenter
        const postId = req.params.postId;
        const data = req.body;
        const result = await Comment.create(postId, data);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const comment = await Comment.getCommentById(id);
        const result = await comment.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const comment = await Comment.getCommentById(id);
        const result = await comment.delete();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { index, create, update, destroy };
