import { SessionOptions } from "iron-session";
import { UserModel } from "./api/models/user.model";

export interface SessionData {
  userData?: UserModel;
  userId?: number;
  teacherId?: number;
  username?: string;
  img?: string;
  role: "user" | "teacher";
  isPro?: boolean;
  isBlocked?: boolean;
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
  },
};
