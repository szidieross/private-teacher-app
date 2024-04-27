import { RowDataPacket } from "mysql2";

export interface UserDto {
    user_id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    created_at: string;
    first_name: string;
    last_name: string;
    role: string;
}