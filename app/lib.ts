import { SessionOptions } from "iron-session";
import { UserModel } from "./api/models/user.model";

export interface SessionData {
  userId?: number;
  teacherId?: number;
  role: "user" | "teacher";
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  role: "user",
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "private-teacher-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400,
  },
};
