DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tags CASCADE;

CREATE TABLE IF NOT EXISTS
users (
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS
threads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255)
    REFERENCES users (username)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  time_created TIMESTAMP NOT NULL,
  time_edited TIMESTAMP,
  tags TEXT
);

CREATE TABLE IF NOT EXISTS
comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255)
      REFERENCES users (username)
      ON UPDATE CASCADE
      ON DELETE SET NULL,
    thread_id INT
      NOT NULL
      REFERENCES threads (thread_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    body TEXT NOT NULL,
    time_created TIMESTAMP NOT NULL,
    time_edited TIMESTAMP
);

CREATE TABLE IF NOT EXISTS
tags (
    thread_id INT
      NOT NULL
      REFERENCES threads (thread_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    body VARCHAR(45) NOT NULL,
    PRIMARY KEY(thread_id, body)
);