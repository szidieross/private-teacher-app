DROP DATABASE IF EXISTS private_teacher_app;

CREATE DATABASE private_teacher_app;

USE private_teacher_app;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(224) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('user', 'teacher') NOT NULL
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    price INT,
    bio TEXT,
    qualification VARCHAR(100),
    location VARCHAR(255),
    street VARCHAR(100),
    house_number VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

ALTER TABLE
    lessons
ADD
    UNIQUE unique_index (teacher_id, category_id);

CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    user_id INT,
    lesson_id INT,
    start_time DATETIME NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Lessons_Archive (
    lesson_id INT,
    teacher_id INT NOT NULL,
    category_id INT NOT NULL,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Appointments_Archive (
    appointment_id INT,
    teacher_id INT NOT NULL,
    user_id INT,
    lesson_id INT,
    start_time DATETIME NOT NULL,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);