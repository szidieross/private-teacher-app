import pool from "@/app/libs/mysql";
import { LessonModel } from "../models/lesson.model";
import { LessonDto } from "../dtos/lesson.dto";
import { toLessonModel } from "../mappers/lesson.mapper";

// export const getLessons = async (): Promise<LessonModel[]> => {
//   try {
//     const db = await pool.getConnection();
//     const query = `SELECT * FROM lessons`;
//     const [rows] = await db.execute(query);
//     db.release();

//     if (!Array.isArray(rows)) {
//       throw new Error("Query result is not an array");
//     }

//     const data: LessonDto[] = (rows as any).map((row: any) => {
//       return {
//         lesson_id: row.lesson_id,
//         teacher_id: row.teacher_id,
//         category_id: row.category_id,
//       };
//     });

//     const lessons: LessonModel[] = data.map((row: LessonDto) => {
//       return toLessonModel(row);
//     });

//     return lessons;
//   } catch (error) {
//     console.error("Error fetching lessons:", error);
//     throw error;
//   }
// };

// export const getLessonById = async (lessonId: number): Promise<LessonModel> => {
//   try {
//     const db = await pool.getConnection();
//     const query = `SELECT * FROM lessons WHERE lesson_id = ?`;
//     const [rows] = await db.execute(query, [lessonId]);
//     db.release();

//     if (!Array.isArray(rows)) {
//       throw new Error("Query result is not an array");
//     }

//     const data: LessonDto[] = (rows as any).map((row: any) => {
//       return {
//         lesson_id: row.lesson_id,
//         teacher_id: row.teacher_id,
//         category_id: row.category_id,
//       };
//     });

//     const lesson: LessonModel = toLessonModel(data[0]);

//     return lesson;
//   } catch (error) {
//     console.error("Error fetching lesson:", error);
//     throw error;
//   }
// };

export const getLessonsByTeacherId = async (
  teacherId: number
): Promise<LessonModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT lessons.lesson_id, lessons.teacher_id, lessons.category_id, categories.name AS category_name
      FROM lessons
      INNER JOIN categories ON lessons.category_id = categories.category_id
      WHERE lessons.teacher_id = ?
    `;
    const [rows] = await db.execute(query, [teacherId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: LessonDto[] = (rows as any).map((row: any) => {
      return {
        lesson_id: row.lesson_id,
        teacher_id: row.teacher_id,
        category_id: row.category_id,
        category_name: row.category_name,
      };
    });

    const lessons: LessonModel[] = data.map((row: LessonDto) => {
      return toLessonModel(row);
    });

    return lessons;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
};

export const createLesson = async (teacherId: string, categoryId: Date) => {
  try {
    const db = await pool.getConnection();
    const query = `
        INSERT INTO Lessons 
          (teacher_id,
            category_id)  
        VALUES
          (?, ?)
      `;
    const [result] = await db.execute(query, [teacherId, categoryId]);
    db.release();
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

export const deleteLessonsByLessonId = async (lessonId: number) => {
  const db = await pool.getConnection();
  try {
    await db.beginTransaction();

    await copyAppointmentsToArchive(db, lessonId);
    await deleteAppointmentsByLessonId(db, lessonId);
    await copyLessonToArchive(db, lessonId);
    await deleteLessonByLessonId(db, lessonId);

    await db.commit();
  } catch (error) {
    await db.rollback();
    console.error("Error deleting lessons:", error);
    throw error;
  } finally {
    db.release();
  }
};

export const deleteAppointmentsByLessonId = async (
  db: any,
  lessonId: number
) => {
  try {
    const query = `
    DELETE FROM Appointments
    WHERE lesson_id = ?
      `;
    const [result] = await db.execute(query, [lessonId]);

    return result;
  } catch (error) {
    console.error("Error deleting appointments:", error);
    throw error;
  }
};

export const copyAppointmentsToArchive = async (db: any, lessonId: number) => {
  try {
    const query = `
      INSERT INTO Appointments_Archive (appointment_id, teacher_id, user_id, lesson_id, start_time, deleted_at)
      SELECT appointment_id, teacher_id, user_id, lesson_id, start_time, NOW()
      FROM Appointments WHERE lesson_id = ?
    `;
    const [result] = await db.execute(query, [lessonId]);
    return result;
  } catch (error) {
    console.error("Error copying appointments to archive:", error);
    throw error;
  }
};

const copyLessonToArchive = async (db: any, lessonId: number) => {
  try {
    const query = `
      INSERT INTO Lessons_Archive (lesson_id, teacher_id, category_id, deleted_at)
      SELECT lesson_id, teacher_id, category_id, NOW()
      FROM Lessons WHERE lesson_id = ?
    `;
    const [result] = await db.execute(query, [lessonId]);

    return result;
  } catch (error) {
    console.error("Error copying lesson to archive:", error);
    throw error;
  }
};

export const deleteLessonByLessonId = async (db: any, lessonId: number) => {
  try {
    const query = `
    DELETE FROM Lessons
    WHERE lesson_id = ?
      `;
    const [result] = await db.execute(query, [lessonId]);

    return result;
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};
