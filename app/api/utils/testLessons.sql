
INSERT INTO Lessons (teacher_id, category_id)
VALUES 
    ((SELECT teacher_id FROM Teachers WHERE user_id = (SELECT user_id FROM Users WHERE username = 'teacher1') LIMIT 1), (SELECT category_id FROM Categories WHERE name = 'Mathematics' LIMIT 1)),
    ((SELECT teacher_id FROM Teachers WHERE user_id = (SELECT user_id FROM Users WHERE username = 'teacher1') LIMIT 1), (SELECT category_id FROM Categories WHERE name = 'Physics' LIMIT 1));



USE private_teacher_app;

DELETE FROM Lessons 
    WHERE teacher_id = 15;