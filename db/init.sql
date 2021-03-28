-- I assumed productID is primary key and assumed other variables could be NULL
-- If i had time i would probably added another column called ID and make it primary key
-- so that productID could be changed but again i wasn't given any constrains.

CREATE DATABASE test;

CREATE TABLE test.parameters(
    productID int AUTO_INCREMENT,
    productName varchar(32),
    productDescription varchar(255),
    PRIMARY KEY (productID)
);

CREATE USER 'test'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON test.* TO 'test'@'%';