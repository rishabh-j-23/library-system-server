-- Active: 1691209649688@@127.0.0.1@3306@librarymanagementsystem

CREATE DATABASE library;

USE library;
CREATE TABLE books (
    book_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    book_name VARCHAR(255) UNIQUE NOT NULL,
    author VARCHAR(255),
    copies INT
);

CREATE TABLE readers (
    reader_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reader_name VARCHAR(255) NOT NULL,
    reader_email VARCHAR(255) UNIQUE NOT NULL,
    reader_password VARCHAR(255) NOT NULL
);

CREATE TABLE staffs (
    staff_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    staff_name VARCHAR(255) NOT NULL,
    staff_passowrd VARCHAR(255) NOT NULL
);


CREATE TABLE borrow (
    borrow_id INT NOT NULL AUTO_INCREMENT,
    reader_id INT NOT NULL,
    book_id INT NOT NULL,
    borrowed_date TEXT,
    return_date TEXT,
    PRIMARY KEY (borrow_id),
    FOREIGN KEY (reader_id) REFERENCES readers(reader_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
