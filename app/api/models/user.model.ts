export interface UserModel {
  userId?: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  profilePicture: string;
  createdAt?: string;
  firstName: string;
  lastName: string;
  role: "user" | "teacher";
}

export interface SimpleUserModel {
  username: string;
  password: string;
}
