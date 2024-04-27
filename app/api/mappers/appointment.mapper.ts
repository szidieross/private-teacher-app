import { AppointmentDto } from "../dtos/appointment.dto";
import { AppointmentModel } from "../models/appointment.model";


const toAppointmentModel = (dto: AppointmentDto): AppointmentModel => ({
    appointmentId: dto.appointment_id,
    teacherId: dto.teacher_id,
    userId: dto.user_id,
    lessonId: dto.lesson_id,
    startTime: dto.start_time,
    endTime: dto.end_time,
});

export { toAppointmentModel };