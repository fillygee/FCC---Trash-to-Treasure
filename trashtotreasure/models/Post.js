const db = require("../db/db");

class Post {
  constructor(name, age, breed) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.instagram = "@instagram/"+this.name;
  }

  static getAllPosts = async () => {
    return await db.query("SELECT * FROM post");
  };

  static getById = async (id) => {
    return await db.query("SELECT * FROM post WHERE id = $1", [id]);
  };

  static add = async (post) => {
    await db.query(
      "INSERT INTO post (name, age, owner, breed, instagram) VALUES ($1, $2, $3, $4, $5);",
      [post.name, post.age, post.owner, post.breed, post.instagram]
    );

    return await this.getAllPosts();
  };

  static delete = async (id) => {
    await db.query("DELETE FROM post WHERE id = $1", [id]);

    return await this.getAllPosts();
  };
}

module.exports = Post;
