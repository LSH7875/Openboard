CREATE DATABASE server;

USE server;

CREATE TABLE board(
    idx INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    username VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    today DATETIME NOT NULL DEFAULT now(),
    hit INT(10) NOT NULL DEFAULT 0 
) AUTO_INCREMENT=1, CHARSET=utf8mb4;