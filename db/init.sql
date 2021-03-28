-- I assumed productID is primary key.
-- If i had time i would probably added another column called ID and make it primary key
-- so that productID could be changed but again i wasn't given any constrains.

CREATE DATABASE test;

CREATE TABLE test.parameters(
    productID int AUTO_INCREMENT NOT NULL,
    productName varchar(32) NOT NULL,
    productDescription varchar(255) NOT NULL,
    PRIMARY KEY (productID)
);

CREATE USER 'test'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON test.* TO 'test'@'%';