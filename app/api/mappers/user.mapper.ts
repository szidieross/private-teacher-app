import { UserDto } from "../dtos/user.dto";
import { UserModel } from "../models/user.model";

const toUserModel = (dto: UserDto): UserModel => ({
  userId: dto.user_id,
  username: dto.username,
  password: dto.password,
  email: dto.email,
  phone: dto.phone,
  createdAt: dto.created_at,
  firstName: dto.first_name,
  lastName: dto.last_name,
  role: dto.role,
});

export { toUserModel };