import pool from "@/app/libs/mysql";
import { AppointmentModel } from "../models/appointment.model";
import { AppointmentDto } from "../dtos/appointment.dto";
import { toAppointmentModel } from "../mappers/appointment.mapper";

export const getAppointments = async (): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM appointments";
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        teacher_id: row.teacher_id,
        user_id: row.user_id,
        lesson_id: row.lesson_id,
        start_time: row.start_time,
        end_time: row.end_time,
      };
    });

    const users: AppointmentModel[] = data.map((row: AppointmentDto) => {
      return toAppointmentModel(row);
    });

    return users;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const getAppointmentByUserId = async (
  userId: number
): Promise<AppointmentModel> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        teacher_id: row.teacher_id,
        user_id: row.user_id,
        lesson_id: row.lesson_id,
        start_time: row.start_time,
        end_time: row.end_time,
      };
    });

    const user: AppointmentModel = toAppointmentModel(data[0]);

    return user;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
};

export const getAppointmentByTeacherId = async (
  teacherId: number
): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM appointments WHERE teacher_id = ?";
    const [rows] = await db.execute(query, [teacherId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        teacher_id: row.teacher_id,
        user_id: row.user_id,
        lesson_id: row.lesson_id,
        start_time: row.start_time,
        end_time: row.end_time,
      };
    });

    const appointments: AppointmentModel[] = data.map((row: AppointmentDto) => {
      return toAppointmentModel(row);
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};
