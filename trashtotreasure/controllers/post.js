const Post = require("../models/Post");
const Token = require("../models/Token");
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
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const addOne = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers["authorization"].split("=")[1];
    const userId = await Token.getUserIdByToken(token);
    const result = await Post.create(data, userId);
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
    return res.status(204).send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const update = async (req, res) => {
  const data = req.body;
  const post = await Post.getById(data.post_id);
  const newPost = await post.update(data);

  res.status(201).send(newPost);
};

module.exports = { index, getOne, addOne, putOne, deleteOne, update };
