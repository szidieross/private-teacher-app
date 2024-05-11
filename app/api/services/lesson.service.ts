import pool from "@/app/libs/mysql";
import { LessonModel } from "../models/lesson.model";
import { LessonDto } from "../dtos/lesson.dto";
import { toLessonModel } from "../mappers/lesson.mapper";

export const getLessons = async (): Promise<LessonModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `SELECT * FROM lessons`;
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: LessonDto[] = (rows as any).map((row: any) => {
      return {
        lesson_id: row.lesson_id,
        teacher_id: row.teacher_id,
        category_id: row.category_id,
      };
    });

    const lessons: LessonModel[] = data.map((row: LessonDto) => {
      return toLessonModel(row);
    });

    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

export const getLessonById = async (lessonId: number): Promise<LessonModel> => {
  try {
    const db = await pool.getConnection();
    const query = `SELECT * FROM lessons WHERE lesson_id = ?`;
    const [rows] = await db.execute(query, [lessonId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: LessonDto[] = (rows as any).map((row: any) => {
      return {
        lesson_id: row.lesson_id,
        teacher_id: row.teacher_id,
        category_id: row.category_id,
      };
    });

    const lesson: LessonModel = toLessonModel(data[0]);

    return lesson;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
};

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

    console.log("Lesson created successfully.");
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};
