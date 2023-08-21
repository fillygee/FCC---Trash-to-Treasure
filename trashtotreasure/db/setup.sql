-- Every created table should always have a DROP TABLE IF EXISTS statement at the top
DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS tokens;

DROP TABLE IF EXISTS users;

-- CREATE TABLE statements
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (30) UNIQUE NOT NULL,
    password CHAR(60) UNIQUE NOT NULL,
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
