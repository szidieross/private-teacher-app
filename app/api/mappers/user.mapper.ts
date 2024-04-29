import { SimpleUserDto, UserDto } from "../dtos/user.dto";
import { SimpleUserModel, UserModel } from "../models/user.model";

const toUserModel = (dto: UserDto): UserModel => ({
  userId: dto.user_id,
  username: dto.username,
  password: dto.password,
  email: dto.email,
  phone: dto.phone,
  profilePicture: dto.profile_picture,
  createdAt: dto.created_at,
  firstName: dto.first_name,
  lastName: dto.last_name,
  role: dto.role,
});

const toSimpleUserModel = (dto: SimpleUserDto): SimpleUserModel => ({
  username: dto.username,
  password: dto.password,
});

export { toUserModel, toSimpleUserModel };
