import pool from "@/app/libs/mysql";
import { AppointmentModel } from "../models/appointment.model";
import { AppointmentDto } from "../dtos/appointment.dto";
import { toAppointmentModel } from "../mappers/appointment.mapper";

export const getAppointmentsByUserId = async (
  userId: number
): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `
    SELECT
        Appointments.appointment_id,
        Appointments.user_id,
        Teachers.teacher_id,
        Users.first_name AS first_name,
        Users.last_name AS last_name,
        Categories.name AS category_name,
        Appointments.start_time
    FROM
        Appointments
        LEFT JOIN Teachers ON Appointments.teacher_id = Teachers.teacher_id
        LEFT JOIN Users ON Teachers.user_id = Users.user_id
        INNER JOIN Lessons ON Appointments.lesson_id = Lessons.lesson_id
        INNER JOIN Categories ON Lessons.category_id = Categories.category_id
    WHERE
        Appointments.user_id = ?
        AND Appointments.start_time >= CURRENT_TIMESTAMP
    ORDER BY
        Appointments.start_time ASC;
    `;
    const [rows] = await db.execute(query, [userId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        user_id: row.user_id,
        teacher_id: row.teacher_id,
        first_name: row.first_name,
        last_name: row.last_name,
        category_name: row.category_name,
        start_time: row.start_time,
      };
    });

    const appointments: AppointmentModel[] = data.map((row: AppointmentDto) => {
      return toAppointmentModel(row);
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
};

export const getAppointmentsByTeacherId = async (
  teacherId: number
): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = `
    SELECT
        Appointments.appointment_id,
        Appointments.user_id,
        Teachers.teacher_id,
        Users.first_name AS first_name,
        Users.last_name AS last_name,
        Categories.name AS category_name,
        Appointments.start_time
    FROM
        Appointments
        LEFT JOIN Teachers ON Appointments.teacher_id = Teachers.teacher_id
        LEFT JOIN Users ON Appointments.user_id = Users.user_id
        LEFT JOIN Lessons ON Appointments.lesson_id = Lessons.lesson_id
        LEFT JOIN Categories ON Lessons.category_id = Categories.category_id
    WHERE
        Teachers.teacher_id = ?
        AND Appointments.start_time >= CURRENT_TIMESTAMP
    ORDER BY
        Appointments.start_time ASC;
    `;
    const [rows] = await db.execute(query, [teacherId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        user_id: row.user_id,
        teacher_id: row.teacher_id,
        first_name: row.first_name,
        last_name: row.last_name,
        category_name: row.category_name,
        start_time: row.start_time,
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

export const createAppointment = async (teacherId: string, startTime: Date) => {
  try {
    const db = await pool.getConnection();
    const query = `
        INSERT INTO Appointments 
          (teacher_id,
            start_time)  
        VALUES
          (?, ?)
      `;
    const [result] = await db.execute(query, [teacherId, startTime]);
    db.release();
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const bookAppointment = async (
  userId: number,
  appointmentId: number,
  lessonId: number
) => {
  try {
    const db = await pool.getConnection();
    const query = `
    UPDATE Appointments 
    SET user_id = ?, lesson_id = ? 
    WHERE appointment_id = ?    
    `;
    const [result] = await db.execute(query, [userId, lessonId, appointmentId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: number) => {
  try {
    const db = await pool.getConnection();
    const query = `
    UPDATE Appointments 
    SET user_id = NULL, lesson_id = NULL 
    WHERE appointment_id = ?   
      `;
    const [result] = await db.execute(query, [appointmentId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

export const cancelAppointmentByUserId = async (teacherId: number) => {
  try {
    const db = await pool.getConnection();
    const query = `
    UPDATE Appointments 
    SET user_id = NULL, lesson_id = NULL 
    WHERE user_id = ?
      `;
    const [result] = await db.execute(query, [teacherId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error cancelling appointments:", error);
    throw error;
  }
};

export const handleDeleteAppointment = async (appointmentId: number) => {
  const db = await pool.getConnection();
  try {
    await db.beginTransaction();

    await copyAppointmentsToArchive(db, appointmentId);
    await deleteAppointment(db, appointmentId);

    await db.commit();
  } catch (error) {
    await db.rollback();
    console.error("Failed deleting user", error);
  } finally {
    db.release();
  }
};

export const copyAppointmentsToArchive = async (
  db: any,
  appointmentId: number
) => {
  try {
    await db.beginTransaction();

    const query = `
      INSERT INTO Appointments_Archive (appointment_id, teacher_id, user_id, lesson_id, start_time, deleted_at)
      SELECT appointment_id, teacher_id, user_id, lesson_id, start_time, NOW()
      FROM Appointments WHERE appointment_id = ?
    `;
    const [result] = await db.execute(query, [appointmentId]);

    await db.commit();
    return result;
  } catch (error) {
    await db.rollback();
    console.error("Error copying appointments to archive:", error);
    throw error;
  } finally {
    db.release();
  }
};

export const deleteAppointment = async (db: any, appointmentId: number) => {
  try {
    const query = `
    DELETE FROM Appointments 
    WHERE appointment_id = ?  
    `;
    const [result] = await db.execute(query, [appointmentId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error deleting appointments:", error);
    throw error;
  }
};

export const deleteAppointmentsByTeacherId = async (
  db: any,
  teacherId: number
) => {
  try {
    const query = `DELETE FROM Appointments WHERE teacher_id = ?`;
    await db.execute(query, [teacherId]);
  } catch (error) {
    console.error("Error deleting appointments:", error);
    throw error;
  }
};

export const cancelAppointments = async (db: any, teacherId: number) => {
  try {
    const query = `
    UPDATE Appointments 
    SET user_id = NULL, lesson_id = NULL 
    WHERE user_id = ?
      `;
    const [result] = await db.execute(query, [teacherId]);
    db.release();

    return result;
  } catch (error) {
    console.error("Error cancelling appointments:", error);
    throw error;
  }
};
