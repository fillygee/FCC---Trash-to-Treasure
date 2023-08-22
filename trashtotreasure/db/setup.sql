-- Every created table should always have a DROP TABLE IF EXISTS statement at the top
DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS tokens;

DROP TABLE IF EXISTS users;

-- CREATE TABLE statements
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (30) UNIQUE NOT NULL,
    password CHAR(60) UNIQUE NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    item_name VARCHAR (60) NOT NULL,
    item_category VARCHAR (30) NOT NULL,
    item_description VARCHAR (500) NOT NULL,
    address VARCHAR (200) NOT NULL,
    postcode CHAR (12) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR (500) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR (36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (username, password) VALUES
    ('user1', 'password1'),
    ('user2', 'password2'),
    ('user3', 'password3');

INSERT INTO posts (user_id, item_name, item_category, item_description, address, postcode) VALUES
    (1, 'Elegant Dining Table', 'Furniture', 'A beautiful oak dining table with intricate carvings. Perfect for hosting dinner parties.', '12 Primrose Avenue', 'AB12 3CD'),
    (2, 'Comfy Leather Sofa', 'Furniture', 'A cozy leather sofa in excellent condition. Seats three comfortably. Great for family movie nights.', '34 Rosewood Street', 'EF23 4GH'),
    (1, 'Vintage Writing Desk', 'Furniture', 'An antique writing desk with a roll-top design. Several compartments for storage. Adds a touch of nostalgia to any room.', '56 Chestnut Lane', 'GH45 6IJ'),
    (3, 'Modern Bedroom Set', 'Furniture', 'Complete bedroom set including a sleek platform bed, two nightstands, and a spacious dresser. Clean lines and minimalist design.', '78 Willow Close', 'IJ56 7KL'),
    (2, 'Rustic Bookshelf', 'Furniture', 'A sturdy wooden bookshelf with a rustic finish. Ample space for your book collection and decorative items.', '90 Oakwood Road', 'KL67 8MN'),
    (1, 'Chic Coffee Table', 'Furniture', 'A glass-topped coffee table with a metal base. Adds a touch of elegance to any living room setup.', '23 Elm Gardens', 'MN78 9OP');

INSERT INTO comments (post_id, user_id, content) VALUES
    (1, 1, 'Lovely dining table! Would love to have this in my home.'),
    (1, 3, 'Wow, the carving details are amazing. Great find!'),
    (2, 2, 'This leather sofa looks super comfy. Is it still available?'),
    (3, 1, 'I adore vintage furniture! This writing desk is a gem.'),
    (4, 3, 'The modern bedroom set is so sleek and stylish. Love it!'),
    (4, 2, 'What are the dimensions of the bed?'),
    (5, 1, 'The rustic bookshelf is just what I need for my books.'),
    (6, 3, 'Chic coffee table indeed. Would be a great addition to any living room.'),
    (6, 2, 'Is the glass tempered for safety?');