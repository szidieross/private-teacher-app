DROP DATABASE IF EXISTS private_teacher_app;

CREATE DATABASE private_teacher_app;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('user', 'teacher') NOT NULL
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    bio TEXT,
    qualification VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_category_id INT,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Teacher_Category (
    teacher_category_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    category_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    category_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Appointments (
    time_slot_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    lesson_id INT,
    start_time DATETIME,
    end_time DATETIME,
    reserved_by_user_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id),
    FOREIGN KEY (reserved_by_user_id) REFERENCES Users(user_id)
);
