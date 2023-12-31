const { v4: uuidv4 } = require("uuid");

const db = require("../db/db");

class Token {
  constructor({ token_id, username, token }) {
    this.token_id = token_id;
    this.username = username;
    this.token = token;
  }

  static async create(user_id) {
    const token = uuidv4();
    const response = await db.query(
      "INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING token_id;",
      [user_id, token]
    );
    const newId = response.rows[0].token_id;
    const newToken = await Token.getOneById(newId);
    return newToken;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM tokens WHERE token_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  static async getOneByToken(token) {
    const response = await db.query("SELECT * FROM tokens WHERE token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  static async deleteByToken(token) {
    await db.query("DELETE FROM tokens WHERE token = $1", [token]);
  }

   static async getUserIdByToken(token) {
    const response = await db.query("SELECT * FROM tokens WHERE token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to get user_id");
    }
    const userId = response.rows[0].user_id;
    return userId;
  } 
}

module.exports = Token;
