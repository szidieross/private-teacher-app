import pool from "@/app/libs/mysql";
import { SimpleUserModel, UserModel } from "../models/user.model";
import { SimpleUserDto, UserDto } from "../dtos/user.dto";
import { toSimpleUserModel, toUserModel } from "../mappers/user.mapper";
import { createTeacher } from "./teacher.service";

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
  // profilePicture: string,
  firstName: string,
  lastName: string,
  role: string,
  price?: number,
  bio?: string,
  qualification?: string,
  location?: string
) => {
  try {
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
      password,
      email,
      phone,
      // profilePicture,
      firstName,
      lastName,
      role,
    ]);
    // db.release();
    console.log("User created successfully. Result:", result);

    console.log("PRICE", price);

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

      // const user_id = (data[0]);
      // const userId = +user_id;

      const user_id = data[0]?.user_id;

      console.log("userId for teacher", user_id);
      db.release();

      const teacher = await createTeacher(
        user_id,
        price,
        bio,
        qualification,
        location
      );
      console.log(teacher);
      // const teacher = await createTeacher(
      //   userId[0],
      //   price,
      //   bio,
      //   qualification,
      //   location
      // );

      // console.log("user idgdfgfdgfgfghfghfg:", userId);
      // console.log("Teacher created successfully", teacher);
      return user_id;
    }
    console.log("User created successfully. UserId:", result);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const verifyUser = async (username: string, password: string) => {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT username, password FROM Users 
      WHERE username = ? AND password = ?
    `;

    const [rows] = await db.execute(query, [username, password]);
    db.release();

    if (!Array.isArray(rows) || rows.length === 0) {
      return null; // Ha a felhasználó nem található az adatbázisban, null-t adunk vissza
    }

    const data: SimpleUserDto[] = (rows as any).map((row: any) => {
      return {
        username: row.username,
        password: row.password,
      };
    });

    const user: SimpleUserModel = toSimpleUserModel(data[0]);

    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};
