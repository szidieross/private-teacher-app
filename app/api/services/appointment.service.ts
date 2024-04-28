import pool from "@/app/libs/mysql";
import { AppointmentModel } from "../models/appointment.model";
import { AppointmentDto } from "../dtos/appointment.dto";
import { toAppointmentModel } from "../mappers/appointment.mapper";

export const getAppointments = async (): Promise<AppointmentModel[]> => {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM appointments';
        const [rows] = await db.execute(query);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: AppointmentDto[] = (rows as any).map((row: any) => {
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

        const users: AppointmentModel[] = data.map((row: AppointmentDto) => {
            return toAppointmentModel(row);
        });

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const getAppointmentById = async (userId: number
): Promise<AppointmentModel> => {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM users WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: AppointmentDto[] = (rows as any).map((row: any) => {
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

        const user: AppointmentModel = toAppointmentModel(data[0]);

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};