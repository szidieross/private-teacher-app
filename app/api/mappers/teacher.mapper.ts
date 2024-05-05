import { TeacherDto } from "../dtos/teacher.dto";
import { TeacherModel } from "../models/teacher.model";

const toTeacherModel = (dto: TeacherDto): TeacherModel => ({
    userData: {
        userId: dto.user_data.user_id,
        username: dto.user_data.username,
        password: dto.user_data.password,
        email: dto.user_data.email,
        phone: dto.user_data.phone,
        profilePicture: dto.user_data.profile_picture,
        createdAt: dto.user_data.created_at,
        firstName: dto.user_data.first_name,
        lastName: dto.user_data.last_name,
        role: dto.user_data.role,
    },
    teacherId: dto.teacher_id,
    userId: dto.user_id,
    price: dto.price,
    bio: dto.bio,
    qualification: dto.qualification,
    location: dto.location,
});

export { toTeacherModel };