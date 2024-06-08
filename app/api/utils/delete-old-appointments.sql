DROP PROCEDURE IF EXISTS `delete_old_appointments`;

DELIMITER //

CREATE PROCEDURE delete_old_appointments()
BEGIN
    DELETE FROM Appointments
    WHERE TIMESTAMPDIFF(DAY, start_time, NOW()) > 1;
END //

DELIMITER ;
