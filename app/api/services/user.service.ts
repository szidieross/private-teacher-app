import pool from "@/app/libs/mysql";
import { SimpleUserModel, UserModel } from "../models/user.model";
import { SimpleUserDto, UserDto } from "../dtos/user.dto";
import { toSimpleUserModel, toUserModel } from "../mappers/user.mapper";

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

export const getUserByUsername = async (username: string): Promise<UserModel> => {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.execute(query, [username]);
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
  profilePicture: string,
  firstName: string,
  lastName: string,
  role: string
) => {
  try {
    const db = await pool.getConnection();
    const query = `
        INSERT INTO Users 
          (username,
          password,
          email,
          phone,
          profile_picture,
          first_name,
          last_name,
          role)  
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const [result] = await db.execute(query, [
      username,
      password,
      email,
      phone,
      profilePicture,
      firstName,
      lastName,
      role,
    ]);
    db.release();
    console.log("User created successfully. Result:", result);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const verifyUserSimple = async (username: string, password: string) => {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT username, password FROM Users 
      WHERE username = ? AND password = ?
    `;

    const [rows] = await db.execute(query, [username, password]);
    db.release();

    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
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

export const verifyUser = async (username: string, password: string) => {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT * FROM Users 
      WHERE username = ? AND password = ?
    `;
    console.log("Executing query:", query);
    const [rows] = await db.execute(query, [username, password]);
    db.release();
    console.log("Retrieved rows:", rows);
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const data: UserDto[] = (rows as any).map((row: any) => {
      return {
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
      };
    });
    console.log("Mapped data:", data);

    const user: UserModel = toUserModel(data[0]);

    console.log("USEEEEERRRR", user);

    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};
