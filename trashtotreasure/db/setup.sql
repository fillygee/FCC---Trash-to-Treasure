-- Every created table should always have a DROP TABLE IF EXISTS statement at the top
DROP TABLE IF EXISTS cat;

DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS user_account;

-- CREATE TABLE statements
CREATE TABLE user_account (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(id)
);

--  create the table for the items people want to give away
CREATE TABLE post (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    age INT,
    owner VARCHAR(50),
    breed VARCHAR(50),
    instagram VARCHAR(50),
    PRIMARY KEY(id),
    FOREIGN KEY(owner) REFERENCES user_account("username")
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(128) NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (username) REFERENCES user_account("username")
);
