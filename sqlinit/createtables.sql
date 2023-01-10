CREATE DATABASE IF NOT EXISTS userdata;
USE userdata;
CREATE TABLE if not EXISTS usuarios ( 
    id int AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(200),
    pass VARCHAR(200),
    UserEncrynp VARCHAR(250)
);

INSERT INTO usuarios VALUES
(
     1,'admin','admin','0000'
);
