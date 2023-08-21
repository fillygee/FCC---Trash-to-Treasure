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
