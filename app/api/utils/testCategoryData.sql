USE private_teacher_app;

CALL delete_old_appointments();

INSERT INTO
    Categories (name)
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

CREATE PROCEDURE delete_old_appointments() BEGIN
INSERT INTO
    Appointments_Archive (
        appointment_id,
        teacher_id,
        user_id,
        lesson_id,
        start_time,
        deleted_at
    )
SELECT
    appointment_id,
    teacher_id,
    user_id,
    lesson_id,
    start_time,
    NOW()
FROM
    Appointments
WHERE
    TIMESTAMPDIFF(DAY, start_time, NOW()) > 1;

DELETE FROM
    Appointments
WHERE
    TIMESTAMPDIFF(DAY, start_time, NOW()) > 1;

END CREATE EVENT deleteOldAppointmentsEvent ON SCHEDULE EVERY 1 MINUTE DO CALL delete_old_appointments();

USE private_teacher_app;

SHOW EVENTS;


SHOW VARIABLES LIKE 'event_scheduler';

DELIMITER //

CREATE PROCEDURE delete_old_appointments()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
    
    INSERT INTO Appointments_Archive (
        appointment_id,
        teacher_id,
        user_id,
        lesson_id,
        start_time,
        deleted_at
    )
    SELECT
        appointment_id,
        teacher_id,
        user_id,
        lesson_id,
        start_time,
        NOW()
    FROM
        Appointments
    WHERE
        TIMESTAMPDIFF(DAY, start_time, NOW()) > 1;

    DELETE FROM Appointments
    WHERE TIMESTAMPDIFF(DAY, start_time, NOW()) > 1;

    COMMIT;
END //

DELIMITER ;








DELIMITER //

CREATE PROCEDURE delete_old_appointments2()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO Appointments_Archive (
        appointment_id,
        teacher_id,
        user_id,
        lesson_id,
        start_time,
        deleted_at
    )
    SELECT
        appointment_id,
        teacher_id,
        user_id,
        lesson_id,
        start_time,
        NOW()
    FROM
        Appointments
    WHERE
        start_time < NOW();

    DELETE FROM Appointments
    WHERE start_time < NOW();

    COMMIT;
END //

DELIMITER ;

