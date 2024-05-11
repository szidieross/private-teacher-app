USE private_teacher_app;

-- Majd hozzáadunk néhány leckét a tanárokhoz
INSERT INTO Lessons (teacher_id, category_id)
VALUES 
(1, 1),  -- Michael Johnson - Mathematics
(2, 2),  -- Emily Fields - English Literature
(13, 3), -- Ezra Fitz - Harvard
(14, 4), -- Aria Montgomery - Harvard
(15, 5), -- Spencer Hastings - Harvard, Yale
(16, 6), -- Daenerys Targaryen - Essos
(17, 7); -- Aria - Kings Landing College
