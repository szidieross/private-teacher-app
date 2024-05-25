import { LessonModel } from "./lesson.model";
import { UserModel } from "./user.model";

export interface TeacherModel {
  userData: UserModel;
  teacherId: number;
  userId: number;
  price: number;
  bio: string;
  qualification: string;
  location: string;
  street: string;
  houseNumber: string;
  lessons?: LessonModel[];
}
