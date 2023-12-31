const db = require("../db/db");

class Post {
  constructor({
    post_id,
    user_id,
    item_name,
    item_category,
    item_description,
    address,
    postcode,
    timestamp,
  }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.item_name = item_name;
    this.item_category = item_category;
    this.item_description = item_description;
    this.address = address;
    this.postcode = postcode;
    this.timestamp = timestamp;
  }

  static async getAll() {
    const response = await db.query(
      "SELECT * FROM posts ORDER BY TIMESTAMP DESC"
    );
    return response.rows.map((p) => new Post(p));
  }

  static async getById(id) {
    const response = await db.query("SELECT * FROM posts WHERE post_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Could not locate post");
    }
    return new Post(response.rows[0]);
  }

  static async create(data, user_id) {
    const { item_name, item_category, item_description, address, postcode } =
      data;
    const response = await db.query(
      "INSERT INTO posts (user_id, item_name, item_category, item_description, address, postcode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING post_id",
      [user_id, item_name, item_category, item_description, address, postcode]
    );
    const newId = response.rows[0].post_id;
    const newPost = await Post.getById(newId);
    return newPost;
  }

  async update(data) {
    const { item_name, item_category, item_description, address, postcode } =
      data;
    const response = await db.query(
      "UPDATE posts SET item_name = $1, item_category = $2, item_description = $3, address = $4, postcode = $5 WHERE post_id = $6 RETURNING post_id",
      [
        item_name,
        item_category,
        item_description,
        address,
        postcode,
        this.post_id
      ]
    );
    if (response.rows.length != 1) {
      throw new Error("Could not update post");
    }
    const updatedPost = await Post.getById(response.rows[0]["post_id"]);
    return updatedPost;
  }

  async delete() {
    const response = await db.query(
      "DELETE FROM posts WHERE post_id = $1 RETURNING *",
      [this.post_id]
    );
    if (response.rows.length != 1) {
      throw new Error("Could not delete post");
    }
    const deletedPost = response.rows[0];
    return deletedPost;
  }
}

module.exports = Post;
