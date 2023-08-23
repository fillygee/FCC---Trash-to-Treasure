const Post = require("../models/Post");

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
    const id = req.params.id;
    const result = await Post.getById(id);
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const addOne = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const token = res.locals.authorization;
    console.log(token);
    const userId = await Token.getUserIdByToken(token);
    console.log(userId);

    const result = await Post.create(data, userId);
    console.log(result);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const post = await Post.getById(id);
    const result = await post.update(data);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    const result = await post.delete();
    return res.send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { index, getOne, addOne, putOne, deleteOne };
