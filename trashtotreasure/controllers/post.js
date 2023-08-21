const Post = require('../models/Post');

const index = async (req, res) => {
    try {
        const posts = await Post.getAll();
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const result = (await Post.getById(parseInt(req.params.id))).rows;
        if (result.length === 0) {
            throw new Error('Post was not found');
        }
        return res.send(result);
    } catch (error) {
        return res.status(404).send('Could not find specified post with specified id!');
    }
};

const addOne = async (req, res) => {
    const data = req.body;
    const user_id = req.headers['authorization'];
    const response = await Post.create(data, user_id);
    const newPost = response.rows[0];
    return res.status(201).send(newPost);
};

const putOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const post = await Post.getOne(id);
        const response = await post.update(data);
        const updatedPost = response.rows[0];
        return res.send(updatedPost);
    } catch (error) {
        return res.status(500).send('Could not update post with specified id!');
    }
};

const deleteOne = async (req, res) => {
    try {
        const post = await Post.getById(req.params.id);
        const result = await post.delete();
        return res.send(result);
    } catch (error) {
        return res.status(500).send('Could not delete post with specified id!');
    }
};

module.exports = { index, getOne, addOne, putOne, deleteOne };
