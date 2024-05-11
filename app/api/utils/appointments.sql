USE private_teacher_app;

-- Majd hozzáadunk néhány időpontot a leckékhez
INSERT INTO Appointments (teacher_id, lesson_id, start_time, end_time)
VALUES 
(1, 1, '2024-05-15 09:00:00', '2024-05-15 10:00:00'), -- Michael Johnson
(2, 2, '2024-05-16 14:00:00', '2024-05-16 15:00:00'), -- Emily Fields
(13, 3, '2024-05-17 11:00:00', '2024-05-17 12:00:00'), -- Ezra Fitz
(14, 4, '2024-05-18 10:00:00', '2024-05-18 11:00:00'), -- Aria Montgomery
(15, 5, '2024-05-19 15:00:00', '2024-05-19 16:00:00'), -- Spencer Hastings
(16, 6, '2024-05-20 12:00:00', '2024-05-20 13:00:00'), -- Daenerys Targaryen
(17, 7, '2024-05-21 09:00:00', '2024-05-21 10:00:00'); -- Aria

