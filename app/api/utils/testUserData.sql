USE private_teacher_app;

-- Insert users with role 'user'
INSERT INTO Users (first_name, last_name, username, password, email, phone, profile_picture, role)
VALUES 
    ('John', 'Doe', 'user1', 'password1', 'user1@example.com', '+123456789', 'profile1.jpg', 'user'),
    ('Jane', 'Smith', 'user2', 'password2', 'user2@example.com', '+987654321', 'profile2.jpg', 'user'),
    ('Alice', 'Johnson', 'user3', 'password3', 'user3@example.com', '+111222333', 'profile3.jpg', 'user');

-- Insert users with role 'teacher1'
INSERT INTO Users (first_name, last_name, username, password, email, phone, profile_picture, role)
VALUES 
    ('Michael', 'Brown', 'teacher1', 'password1', 'teacher1@example.com', '+444555666', 'profile4.jpg', 'teacher');

-- Insert teacher1 record into Teachers table
INSERT INTO Teachers (user_id, price, bio, qualification)
SELECT user_id, 50, 'Experienced teacher with a passion for education.', 'Bachelor of Education'
FROM Users
WHERE role = 'teacher' AND username = 'teacher1';

-- Insert users with role 'teacher2'
INSERT INTO Users (first_name, last_name, username, password, email, phone, profile_picture, role)
VALUES 
    ('Sarah', 'Miller', 'teacher2', 'password2', 'teacher2@example.com', '+777888999', 'profile5.jpg', 'teacher');

-- Insert teacher2 record into Teachers table
INSERT INTO Teachers (user_id, price, bio, qualification)
SELECT user_id, 60, 'Highly qualified teacher specializing in mathematics.', 'Master of Science in Mathematics'
FROM Users
WHERE role = 'teacher' AND username = 'teacher1';

-- -- Insert users with role 'teacher3'
INSERT INTO Users (first_name, last_name, username, password, email, phone, profile_picture, role)
VALUES 
    ('Emma', 'Wilson', 'teacher3', 'password3', 'teacher3@example.com', '+101010101', 'profile6.jpg', 'teacher');

-- -- Insert teacher3 record into Teachers table
INSERT INTO Teachers (user_id, price, bio, qualification)
SELECT user_id, 60, 'Dedicated teacher with expertise in English literature.', 'Bachelor of Arts in English'
FROM Users
WHERE role = 'teacher' AND username = 'teacher1';