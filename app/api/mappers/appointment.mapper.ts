import { AppointmentDto } from "../dtos/appointment.dto";
import { AppointmentModel } from "../models/appointment.model";

const toAppointmentModel = (dto: AppointmentDto): AppointmentModel => ({
  appointmentId: dto.appointment_id,
  userId: dto.user_id,
  teacherId: dto.teacher_id,
  firstName: dto.first_name,
  lastName: dto.last_name,
  categoryName: dto.category_name,
  startTime: dto.start_time,
});

export { toAppointmentModel };
