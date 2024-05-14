"use server";

import { sessionOptions, SessionData, defaultSession } from "@/app/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { loginUser } from "./api/services/user.service";
import { getTeacherByUserId } from "./api/services/teacher.service";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const isLoggedIn = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return false;
  }
  return true;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = await loginUser(formUsername, formPassword);

  if (user == null || user.userId == null) {
    ("Wrong credentials. Try again.");
    return;
  }

  session.userId = user.userId;
  session.role = user.role;
  session.isLoggedIn = true;
  if (user.role === "teacher") {
    const teacher = await getTeacherByUserId(user.userId);
    session.teacherId = teacher.teacherId;
  }

  await session.save();
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
};
