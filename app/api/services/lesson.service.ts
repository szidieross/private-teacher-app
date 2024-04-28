import pool from "@/app/libs/mysql";
import { LessonModel } from "../models/lesson.model";
import { LessonDto } from "../dtos/lesson.dto";
import { toLessonModel } from "../mappers/lesson.mapper";

export const getLessons = async (): Promise<LessonModel[]> => {
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
        `;
        const [rows] = await db.execute(query);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: LessonDto[] = (rows as any).map((row: any) => {
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

        const lessons: LessonModel[] = data.map((row: LessonDto) => {
            return toLessonModel(row);
        });

        return lessons;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};

export const getLessonById = async (teacherId: number
): Promise<LessonModel> => {
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
            throw new Error('Query result is not an array');
        }

        const data: LessonDto[] = (rows as any).map((row: any) => {
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

        const lesson: LessonModel = toLessonModel(data[0]);

        return lesson;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};