const db = require('../db/db');

class Comment {
    constructor({ comment_id, post_id, user_id, username, content, timestamp }) {
        this.comment_id = comment_id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.username = username;
        this.content = content;
        this.timestamp = timestamp;
    }

    static async getCommentById(id) {
        const response = await db.query('SELECT * FROM comments WHERE comment_id = $1', [id]);
        if (response.rows.length != 1) {
            throw new Error('Unable to locate comment');
        }
        return new Comment(response.rows[0]);
    }

    static async getAllByPostId(postId) {
        const response = await db.query(
            'SELECT username, content, timestamp FROM comments JOIN users ON comments.user_id = users.user_id WHERE post_id = $1',
            [postId]
        );
        return response.rows.map((comment) => new Comment(comment));
    }

    static async create(postId, data) {
        const { user_id, content } = data;
        const response = await db.query(
            'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [postId, user_id, content]
        );
        return new Comment(response.rows[0]);
    }

    async update(data) {
        const { post_id, user_id, content } = data;
        const response = await db.query(
            'UPDATE comments SET post_id = $1, user_id = $2, content = $3 WHERE comment_id = $4 RETURNING *',
            [post_id, user_id, content, this.comment_id]
        );
        if (response.rows.length != 1) {
            throw new Error('Unable to update comment');
        }
        return new Comment(response.rows[0]);
    }

    async delete() {
        const response = await db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [
            this.comment_id,
        ]);
        if (response.rows.length != 1) {
            throw new Error('Unable to delete comment');
        }
        return new Comment(response.rows[0]);
    }
}

module.exports = Comment;
