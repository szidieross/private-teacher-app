USE private_teacher_app;

INSERT INTO Categories (name)
VALUES 
    ('Science'),
    ('Mathematics'),
    ('History'),
    ('Biology'),
    ('Chemistry'),
    ('Physics'),
    ('Algebra'),
    ('Geometry'),
    ('Geography'),
    ('Computer Science'),
    ('Literature'),
    ('Art'),
    ('Music'),
    ('Physical Education'),
    ('Economics'),
    ('Political Science'),
    ('Psychology'),
    ('Sociology');


    USE private_teacher_app;

CALL delete_old_appointments();
