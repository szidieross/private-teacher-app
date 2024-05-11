"use server";

import { sessionOptions, SessionData, defaultSession } from "@/app/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "./api/services/user.service";

let username = "john";
let isPro = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = isBlocked;
  session.isPro = isPro;

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

  if (user === null) {
    ("Wrong credentials. Try again.");
    return;
  }
  const userId = user.userId && user.userId;

  session.userId = userId ? userId : 1;
  session.img = user.profilePicture;
  session.username = formUsername;
  session.role = user.role;
  session.isPro = isPro;
  session.isLoggedIn = true;

  session.userData = {
    userId: userId,
    username: user.username,
    email: user.email,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    profilePicture: user.profilePicture,
    role: user.role,
    createdAt: user.createdAt,
  };

  await session.save();
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
};

export const changePremium = async () => {
  const session = await getSession();

  isPro = !session.isPro;
  session.isPro = isPro;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};
