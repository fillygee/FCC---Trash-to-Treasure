-- Inserting user_accounts
INSERT INTO user_account (username, password, is_admin) VALUES ('admin', '$2b$12$xmHb8ZgjimhXWI7y9SjiSuonjrbEOKb8b2XDWAC2kiDX8GLrzsg0G', TRUE);
INSERT INTO user_account (username, password, is_admin) VALUES ('george', '$2b$12$3vYXJJDRyEcTse0IFXhmDe.iSZ7X35mCfKJPGYzUCVr4qQ2crxBlK', FALSE);
INSERT INTO user_account (username, password, is_admin) VALUES ('hannah', '$2b$12$C/b1JfPoXNK99U8kQe8yVuiacqyTZn9eFkz5SV3v0keL9NRHtIu3W', FALSE);
INSERT INTO user_account (username, password, is_admin) VALUES ('kate', '$2b$12$391wIGLQxCJLJlaEI0qpoeQjROpAKaVefj/R.Yl8Y3IPYRfhtszEi', FALSE);


-- Inserting cat records -- change this to the post records (i.e the items people are giving away)
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Max', 3, 'george', 'Tabby', '@max_thetabby');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Sasha', 1, 'hannah', 'Scottish Fold', '@sasha_curledup');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Tiger', 2, NULL, 'Bengal', '@tiger_adventures');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Bella', 2, NULL, 'Persian', '@bella_elegance');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Oscar', 1, NULL, 'Russian Blue', '@oscar_serenity');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Loki', 2, NULL, 'Sphynx', '@loki_barebeauty');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Coco', 3, NULL, 'Ragamuffin', '@coco_cuddles');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Simba', 1, NULL, 'Abyssinian', '@simba_explorer');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Milo', 5, NULL, 'Himalayan', '@milo_majestic');
-- INSERT INTO cat (name, age, owner, breed, instagram) VALUES ('Nala', 2, 'kate', 'Munchkin', '@nala_shortstuff');
