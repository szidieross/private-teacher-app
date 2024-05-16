USE private_teacher_app;

SELECT
    Appointments.appointment_id,
    Teachers.first_name AS teacher_first_name,
    Teachers.last_name AS teacher_last_name,
    Categories.name AS category_name,
    Appointments.start_time
FROM
    Appointments
    INNER JOIN Users AS Users ON Appointments.user_id = Users.user_id
    INNER JOIN Lessons ON Appointments.lesson_id = Lessons.lesson_id
    INNER JOIN Categories ON Lessons.category_id = Categories.category_id
    INNER JOIN Teachers ON Lessons.teacher_id = Teachers.teacher_id
WHERE
    Lessons.teacher_id = 1;


------------------------------------------------------------------
USE private_teacher_app;

SELECT
    Appointments.appointment_id,
    Users.first_name AS user_first_name,
    Users.last_name AS user_last_name,
    Categories.name AS category_name,
    Appointments.start_time
FROM
    Appointments
    INNER JOIN Users ON Appointments.user_id = Users.user_id
    INNER JOIN Lessons ON Appointments.lesson_id = Lessons.lesson_id
    INNER JOIN Categories ON Lessons.category_id = Categories.category_id
WHERE
    Appointments.user_id = < user_id >;

-- SELECT 
--     Appointments.appointment_id, 
--     Users.first_name AS user_first_name, 
--     Users.last_name AS user_last_name, 
--     Categories.name AS category_name
-- FROM 
--     Appointments
-- INNER JOIN 
--     Users ON Appointments.user_id = Users.user_id
-- INNER JOIN 
--     Lessons ON Appointments.lesson_id = Lessons.lesson_id
-- INNER JOIN 
--     Categories ON Lessons.category_id = Categories.category_id;