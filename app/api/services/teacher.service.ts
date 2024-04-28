import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { UserModel } from "../models/user.model"
import { UserDto } from "../dtos/user.dto";
import { toUserModel } from "../mappers/user.mapper";
import { TeacherModel } from "../models/teacher.model";
import { TeacherDto } from "../dtos/teacher.dto";
import { toTeacherModel } from "../mappers/teacher.mapper";

export const getTeachers = async (): Promise<TeacherModel[]> => {
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

        const teachers: TeacherModel[] = data.map((row: TeacherDto) => {
            return toTeacherModel(row);
        });

        return teachers;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};


// export const getTeachers = async (): Promise<TeacherModel[]> => {
//     try {
//         const db = await pool.getConnection();
//         const query = `
//             SELECT
//                 u.*,
//                 t.price,
//                 t.bio,
//                 t.qualification
//             FROM
//                 Users u
//             INNER JOIN
//                 Teachers t ON u.user_id = t.user_id
//             WHERE
//                 u.role = 'teacher'
//         `;
//         const [rows] = await db.execute(query);
//         db.release();

//         if (!Array.isArray(rows)) {
//             throw new Error('Query result is not an array');
//         }

//         const data: TeacherDto[] = (rows as any).map((row: any) => {
//             return {
//                 user_data: {row.user_id,row.username},
//                 // username: row.username,
//                 password: row.password,
//                 email: row.email,
//                 phone: row.phone,
//                 profile_picture: row.profile_picture,
//                 created_at: row.created_at,
//                 first_name: row.first_name,
//                 last_name: row.last_name,
//                 role: row.role,
//                 price: row.price,
//                 bio: row.bio,
//                 qualification: row.qualification,
//             };
//         });

//         const teachers: TeacherModel[] = data.map((row: TeacherDto) => {
//             return toTeacherModel(row);
//         });

//         return teachers;
//     } catch (error) {
//         console.error('Error fetching teachers:', error);
//         throw error;
//     }
// };


// export const getTeachers = async (): Promise<UserModel[]> => {
//     try {
//         const db = await pool.getConnection();
//         const query = 'SELECT * FROM users';
//         const [rows] = await db.execute(query);
//         db.release();

//         if (!Array.isArray(rows)) {
//             throw new Error('Query result is not an array');
//         }

//         const data: UserDto[] = (rows as any).map((row: any) => {
//             return {
//                 user_id: row.user_id,
//                 username: row.username,
//                 password: row.password,
//                 email: row.email,
//                 phone: row.phone,
//                 profile_picture: row.profile_picture,
//                 created_at: row.created_at,
//                 first_name: row.first_name,
//                 last_name: row.last_name,
//                 role: row.role,
//             };
//         });

//         const users: UserModel[] = data.map((row: UserDto) => {
//             return toUserModel(row);
//         });

//         return users;
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return [];
//     }
// };

export const getTeacherById = async (userId: number
): Promise<UserModel> => {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM users WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: UserDto[] = (rows as any).map((row: any) => {
            return {
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
            };
        });

        const user: UserModel = toUserModel(data[0]);

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};