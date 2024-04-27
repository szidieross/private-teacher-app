import { TeacherDto } from "../dtos/teacher.dto";
import { TeacherModel } from "../models/teacher.model";

const toTeacherModel = (dto: TeacherDto): TeacherModel => ({
    teacherId: dto.teacher_id,
    userId: dto.user_id,
    bio: dto.bio,
    qualification: dto.qualification,
});

export { toTeacherModel };