import { LessonDto } from "../dtos/lesson.dto";
import { LessonModel } from "../models/lesson.model";

const toLessonModel = (dto: LessonDto): LessonModel => ({
  lessonId: dto.lesson_id,
  teacherId: dto.teacher_id,
  categoryId: dto.category_id,
  categoryName: dto.category_name,
});

export { toLessonModel };
