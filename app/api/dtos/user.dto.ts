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

// export const toUserDto = (row: RowDataPacket): UserDto => {
//     return {
//         user_id: row.user_id,
//         username: row.username,
        // password: row.password,
        // email: row.email,
        // phone: row.phone,
        // created_at: row.created_at,
        // first_name: row.first_name,
        // last_name: row.last_name,
        // role: row.role,
//     };
// };