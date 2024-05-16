import pool from "@/app/libs/mysql";
import { AppointmentModel } from "../models/appointment.model";
import { AppointmentDto } from "../dtos/appointment.dto";
import { toAppointmentModel } from "../mappers/appointment.mapper";

export const getAppointments = async (): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    // const query = "SELECT * FROM appointments";
    const query = `
    SELECT
        Appointments.appointment_id,
        Teachers.first_name AS teacher_first_name,
        Teachers.last_name AS teacher_last_name,
        Categories.name AS category_name,
        Appointments.start_time
    FROM
        Appointments
        INNER JOIN Users AS Users ON Appointments.user_id = Users.user_id
        INNER JOIN Lessons ON Appointments.lesson_id = Lessons.lesson_id
        INNER JOIN Categories ON Lessons.category_id = Categories.category_id
        INNER JOIN Teachers ON Lessons.teacher_id = Teachers.teacher_id
    WHERE
        Lessons.teacher_id = 1;
    `;
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        first_name: row.first_name,
        last_name: row.last_name,
        category_name: row.category_name,
        start_time: row.start_time,
        // appointment_id: row.appointment_id,
        // teacher_id: row.teacher_id,
        // user_id: row.user_id,
        // lesson_id: row.lesson_id,
        // start_time: row.start_time,
        // end_time: row.end_time,
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
): Promise<AppointmentModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM appointments WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    const data: AppointmentDto[] = (rows as any).map((row: any) => {
      return {
        appointment_id: row.appointment_id,
        first_name: row.first_name,
        last_name: row.last_name,
        category_name: row.category_name,
        start_time: row.start_time,
        // appointment_id: row.appointment_id,
        // teacher_id: row.teacher_id,
        // user_id: row.user_id,
        // lesson_id: row.lesson_id,
        // start_time: row.start_time,
        // end_time: row.end_time,
      };
    });

    const appointments: AppointmentModel[] = data.map((row: AppointmentDto) => {
      return toAppointmentModel(row);
    });

    console.log("getAppointmentByUserId", appointments);
    return appointments;
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
    // const query = "SELECT * FROM appointments WHERE teacher_id = ?";
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
    Appointments.teacher_id = ?;
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
        // appointment_id: row.appointment_id,
        // teacher_id: row.teacher_id,
        // user_id: row.user_id,
        // lesson_id: row.lesson_id,
        // start_time: row.start_time,
        // end_time: row.end_time,
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

    console.log("Appointment booked successfully.");
    return result;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: number) => {
  try {
    console.log("cancelAppointmentcancelAppointmentcancelAppointment");
    const db = await pool.getConnection();
    const query = `
    UPDATE Appointments 
    SET user_id = NULL, lesson_id = NULL 
    WHERE appointment_id = ?   
      `;
    const [result] = await db.execute(query, [appointmentId]);
    db.release();

    console.log("Appointment canceled successfully.");
    return result;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId: number) => {
  try {
    const db = await pool.getConnection();
    const query = `
    DELETE FROM Appointments 
    WHERE appointment_id = ?  
      `;
    const [result] = await db.execute(query, [appointmentId]);
    db.release();

    console.log("Appointment deleted successfully.");
    return result;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export const idek = async (appointmentId: number) => {
  try {
    const db = await pool.getConnection();
    const query = `
    SELECT 
      Appointments.appointment_id, 
      Users.first_name AS user_first_name, 
      Users.last_name AS user_last_name, 
      Categories.name AS category_name
    FROM 
        Appointments
    INNER JOIN 
        Users ON Appointments.user_id = Users.user_id
    INNER JOIN 
        Lessons ON Appointments.lesson_id = Lessons.lesson_id
    INNER JOIN 
        Categories ON Lessons.category_id = Categories.category_id
    WHERE 
        Lessons.teacher_id = 1
      `;
    const [result] = await db.execute(query, [appointmentId]);
    db.release();

    console.log("Appointment deleted successfully.");
    return result;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};
