import pool from "@/app/libs/mysql";
import { UserModel } from "../models/user.model";
import { UserDto } from "../dtos/user.dto";
import { toUserModel } from "../mappers/user.mapper";
import { createTeacher, updateTeacherData } from "./teacher.service";
import { getSession } from "@/app/actions";
import { hashPassword } from "../utils/user.util";

interface UserId {
  user_id: number;
}

export const getUsers = async (): Promise<UserModel[]> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM users";
    const [rows] = await db.execute(query);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
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

    const users: UserModel[] = data.map((row: UserDto) => {
      return toUserModel(row);
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (userId: number): Promise<UserModel> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    db.release();

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
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
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (
  username: string,
  password: string,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  role: string,
  price?: number,
  bio?: string,
  qualification?: string,
  location?: string
) => {
  try {
    const hashedPassword = hashPassword(password);
    const db = await pool.getConnection();
    const query = `
        INSERT INTO Users 
          (username,
          password,
          email,
          phone,
          first_name,
          last_name,
          role)  
        VALUES
          (?, ?, ?, ?, ?, ?, ?)
      `;
    const [result] = await db.execute(query, [
      username,
      hashedPassword,
      email,
      phone,
      firstName,
      lastName,
      role,
    ]);

    if (role === "teacher" && price && bio && qualification && location) {
      const selectQuery = `
          SELECT user_id
          FROM Users
          WHERE username = ?
        `;
      const [rows] = await db.execute(selectQuery, [username]);
      const data: UserId[] = (rows as any).map((row: any) => {
        return {
          user_id: row.user_id,
        };
      });

      const user_id = data[0]?.user_id;
      db.release();

      const teacher = await createTeacher(
        user_id,
        price,
        bio,
        qualification,
        location
      );
      return user_id;
    }
    console.log("User created successfully. UserId:", result);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const hashedPassword = hashPassword(password);
    const db = await pool.getConnection();
    const query = `
      SELECT * FROM Users
      WHERE username = ? AND password = ?
    `;

    const [rows] = await db.execute(query, [username, hashedPassword]);
    db.release();

    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
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
    console.error("Error verifying user:", error);
    throw error;
  }
};

export const updateUserImage = async (title: string) => {
  const session = await getSession();
  const userId = session.userId;

  try {
    const db = await pool.getConnection();
    const query = `
        UPDATE Users
        SET profile_picture = ?
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [title, userId]);
    db.release();

    console.log("User image path updated successfully");
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};

export const updateUserData = async (
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  // teacherId?: number,
  price?: string,
  qualification?: string,
  bio?: string,
  location?: string
) => {
  try {
    const db = await pool.getConnection();
    const query = `
        UPDATE Users
        SET username = ?,
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [
      username,
      firstName,
      lastName,
      email,
      phone,
      userId,
    ]);
    db.release();

    if (price && bio && qualification && location) {
      // const selectQuery = `
      //     SELECT user_id
      //     FROM Users
      //     WHERE username = ?
      //   `;
      // const [rows] = await db.execute(selectQuery, [username]);
      // const data: UserId[] = (rows as any).map((row: any) => {
      //   return {
      //     user_id: row.user_id,
      //   };
      // });

      // const user_id = data[0]?.user_id;
      // db.release();

      const teacher = await updateTeacherData(
        userId,
        price,
        bio,
        qualification,
        location
      );

      console.log("HELLLLOOOOO")
      // return user_id;
    }

    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
