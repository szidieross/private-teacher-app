import pool from "@/app/libs/mysql";
import { TeacherModel } from "../models/teacher.model";
import { TeacherDto } from "../dtos/teacher.dto";
import { toTeacherModel } from "../mappers/teacher.mapper";

export const createTeacher = async (
  userId: number,
  price: number | undefined,
  bio: string | undefined,
  qualification: string | undefined,
  location: string | undefined
) => {
  try {
    const db = await pool.getConnection();
    const query = `
        INSERT INTO Teachers 
          (user_id, price, bio, qualification, location)  
        VALUES (?, ?, ?, ?, ?)
      `;
    const [result] = await db.execute(query, [
      userId,
      price,
      bio,
      qualification,
      location,
    ]);

    return result;
  } catch (error) {
    console.error("Error creating teacher", error);
    throw error;
  }
};

// export const getTeachers = async (): Promise<TeacherModel[]> => {
//   try {
//     const db = await pool.getConnection();
//     const query = `
//             SELECT
//                 u.*,
//                 t.*
//             FROM
//                 Users u
//             INNER JOIN
//                 Teachers t ON u.user_id = t.user_id
//             WHERE
//                 u.role = "teacher"
//         `;
//     const [rows] = await db.execute(query);
//     db.release();

//     if (!Array.isArray(rows)) {
//       throw new Error("Query result is not an array");
//     }

//     const data: TeacherDto[] = (rows as any).map((row: any) => {
//       return {
//         user_data: {
//           user_id: row.user_id,
//           username: row.username,
//           password: row.password,
//           email: row.email,
//           phone: row.phone,
//           profile_picture: row.profile_picture,
//           created_at: row.created_at,
//           first_name: row.first_name,
//           last_name: row.last_name,
//           role: row.role,
//         },
//         teacher_id: row.teacher_id,
//         user_id: row.user_id,
//         price: row.price,
//         bio: row.bio,
//         qualification: row.qualification,
//         location: row.location,
//       };
//     });

//     const teachers: TeacherModel[] = data.map((row: TeacherDto) => {
//       return toTeacherModel(row);
//     });

//     return teachers;
//   } catch (error) {
//     console.error("Error fetching teachers:", error);
//     throw error;
//   }
// };

export const getTeachers = async (): Promise<TeacherModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT
          u.*,
          t.*,
          l.lesson_id,
          l.category_id,
          c.name AS category_name
      FROM
          Users u
      INNER JOIN
          Teachers t ON u.user_id = t.user_id
      LEFT JOIN
          Lessons l ON t.teacher_id = l.teacher_id
      LEFT JOIN
          Categories c ON l.category_id = c.category_id
      WHERE
          u.role = 'teacher';
    `;
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const teachers: TeacherModel[] = [];
    let currentTeacher: TeacherModel | null = null;

    rows.forEach((row: any) => {
      if (!currentTeacher || currentTeacher.teacherId !== row.teacher_id) {
        if (currentTeacher) {
          teachers.push(currentTeacher);
        }
        currentTeacher = {
          userData: {
            userId: row.user_id,
            username: row.username,
            password: row.password,
            email: row.email,
            phone: row.phone,
            profilePicture: row.profile_picture,
            createdAt: row.created_at,
            firstName: row.first_name,
            lastName: row.last_name,
            role: row.role,
          },
          teacherId: row.teacher_id,
          userId: row.user_id,
          price: row.price,
          bio: row.bio,
          qualification: row.qualification,
          location: row.location,
          lessons: [],
        };
      }

      if (
        row.lesson_id !== null &&
        row.category_id !== null &&
        row.category_name !== null
      ) {
        currentTeacher.lessons?.push({
          lessonId: row.lesson_id,
          teacherId: row.teacher_id,
          categoryId: row.category_id,
          categoryName: row.category_name,
        });
      }
    });

    if (currentTeacher) {
      teachers.push(currentTeacher);
    }

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
                t.qualification,
                t.location
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
        location: row.location,
      };
    });

    const teacher: TeacherModel = toTeacherModel(data[0]);

    console.log("teacher data", teacher);

    return teacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

export const getTeacherByUserId = async (
  userId: number
): Promise<TeacherModel> => {
  try {
    const db = await pool.getConnection();

    const query = `
            SELECT
                u.*,
                t.teacher_id,
                t.price,
                t.bio,
                t.qualification,
                t.location
            FROM
                Users u
            INNER JOIN
                Teachers t ON u.user_id = t.user_id
            WHERE
                u.role = 'teacher'
                AND
                u.user_id = ?
        `;

    const [rows] = await db.execute(query, [userId]);
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

    const teacher: TeacherModel = toTeacherModel(data[0]);

    return teacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

export const updateTeacherData = async (
  userId: number,
  // teacherId?: number,
  price: number | undefined,
  qualification: string | undefined,
  bio: string | undefined,
  location: string | undefined
) => {
  try {
    const db = await pool.getConnection();
    const query = `
        UPDATE Teachers
        SET price = ?,
        qualification = ?,
        bio = ?,
        location = ?
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [
      price,
      qualification,
      bio,
      location,
      userId,
    ]);
    db.release();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteTeacherById = async (teacherId: number) => {
  try {
    const db = await pool.getConnection();
    const query = `
    DELETE FROM Teachers 
    WHERE teacher_id = ?  
      `;
    const [result] = await db.execute(query, [teacherId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};
