import { SessionOptions } from "iron-session";
import { UserModel } from "./api/models/user.model";

export interface SessionData {
  userData?:UserModel;
  userId?: number;
  username?: string;
  img?: string;
  role?: string;
  isPro?: boolean;
  isBlocked?: boolean;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "lama-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
