import pool from "@/app/libs/mysql";
import { TeacherModel } from "../models/teacher.model";
import { TeacherDto } from "../dtos/teacher.dto";
import { toTeacherModel } from "../mappers/teacher.mapper";

async function createTeacher(
  userId: number,
  price: number,
  bio: string,
  qualification: string
) {
  try {
    const query = `
        INSERT INTO Teachers 
        (user_id,
            price,
            bio,
            qualification)  
            VALUES
            (?, ?, ?, ? )
            `;
    const [result] = await pool.execute(query, [
      userId,
      price,
      bio,
      qualification,
    ]);
    console.log("result creating teacher", result);
  } catch (error) {
    console.error("Error creating teacher", error);
    throw error;
  }
}

export const getTeachers = async (): Promise<TeacherModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `
            SELECT
                u.*,
                t.*
            FROM
                Users u
            INNER JOIN
                Teachers t ON u.user_id = t.user_id
            WHERE
                u.role = "teacher"
        `;
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: TeacherDto[] = (rows as any).map((row: any) => {
      return {
        user_data: {
          user_id: row.user_id,
          username: row.username,
          password: row.password,
          email: row.email,
          phone: row.phone,
          profile_picture: row.profile_picture,
          created_at: row.created_at,
          first_name: row.first_name,
          last_name: row.last_name,
          role: row.role,
        },
        teacher_id: row.teacher_id,
        user_id: row.user_id,
        price: row.price,
        bio: row.bio,
        qualification: row.qualification,
        location: row.location,
      };
    });

    const teachers: TeacherModel[] = data.map((row: TeacherDto) => {
      return toTeacherModel(row);
    });

    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

export const getTeacherById = async (
  teacherId: number
): Promise<TeacherModel> => {
  try {
    const db = await pool.getConnection();

    const query = `
            SELECT
                u.*,
                t.teacher_id,
                t.price,
                t.bio,
                t.qualification
            FROM
                Users u
            INNER JOIN
                Teachers t ON u.user_id = t.user_id
            WHERE
                u.role = 'teacher'
                AND
                teacher_id = ?
        `;

    const [rows] = await db.execute(query, [teacherId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: TeacherDto[] = (rows as any).map((row: any) => {
      return {
        user_data: {
          user_id: row.user_id,
          username: row.username,
          password: row.password,
          email: row.email,
          phone: row.phone,
          profile_picture: row.profile_picture,
          created_at: row.created_at,
          first_name: row.first_name,
          last_name: row.last_name,
          role: row.role,
        },
        teacher_id: row.teacher_id,
        user_id: row.user_id,
        price: row.price,
        bio: row.bio,
        qualification: row.qualification,
      };
    });

    const teacher: TeacherModel = toTeacherModel(data[0]);

    return teacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};
