const db = require("../db/db");

class User {
  constructor({ user_id, username, password, isAdmin }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  static getAllUsers = async () => {
    return await db.query("SELECT * FROM users;");
  };

  static getById = async (id) => {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    return new User(response.rows[0]);
  };

  static async create(data) {
    const { username, password, isAdmin } = data;
    let response = await db.query(
      "INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING user_id",
      [username, password, isAdmin]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  async delete() {
    const response = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [this.user_id]
    );
    if (response.rows.length != 1) {
      throw new Error("Not able to delete user");
    }
    return response.rows[0];
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return response.rows[0];
  }
}

module.exports = User;
