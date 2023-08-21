const Post = require("../models/Post");

const getAll = async (req, res) => {
  try {
    return res.send((await Post.getAllPosts()).rows);
  } catch (error) {
    return res.status(500).send("Internal Server Error!" + error);
  }
};

const getOne = async (req, res) => {
  try {
    const result = (await Post.getById(parseInt(req.params.id))).rows;
    if (result.length === 0) {
      throw new Error("Post was not found");
    }
    return res.send(result);
  } catch (error) {
    return res
      .status(404)
      .send("Could not find specified post with specified id!");
  }
};

const addOne = async (req, res) => {
  // const post = new Post(req.body.name, parseInt(req.body.age), req.body.breed); change this as necessary
  post.owner = res.locals.user;
  return res.status(201).send((await Post.add(post)).rows);
};

const deleteOne = async (req, res) => {
  try {
    return res.send((await Post.delete(parseInt(req.params.id))).rows);
  } catch (error) {
    return res.status(500).send("Could not delete post with specified id!");
  }
};

module.exports = { getAll, getOne, addOne, deleteOne };
