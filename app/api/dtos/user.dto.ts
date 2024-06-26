export interface UserDto {
  user_id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  profile_picture: string;
  created_at: string;
  first_name: string;
  last_name: string;
  role: "user" | "teacher";
}

export interface SimpleUserDto {
  username: string;
  password: string;
}
