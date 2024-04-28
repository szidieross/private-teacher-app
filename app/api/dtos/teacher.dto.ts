import { UserDto } from "./user.dto";

export interface TeacherDto {
    user_data: UserDto;
    teacher_id: number;
    user_id: number;
    price: number;
    bio: string;
    qualification: string;
}