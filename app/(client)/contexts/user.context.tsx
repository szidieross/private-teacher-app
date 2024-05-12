import { getSession } from "@/app/actions";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { UserModel } from "@/app/api/models/user.model";
import { getUserById } from "@/app/api/services/user.service";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useUsersService from "../services/user.service";
import useTeachersService from "../services/teacher.service";

interface UserInfoModel {
  isLoggedIn: boolean;
  userId: number | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  userImg: string | undefined;
  userType: "user" | "teacher";
  teacherId: number | undefined;
}

interface UserContextModel {
  userInfo: UserInfoModel;
  setUserInfo: Dispatch<SetStateAction<UserInfoModel>>;
}

const initUserInfo: UserInfoModel = {
  isLoggedIn: false,
  userId: undefined,
  username: undefined,
  firstName: undefined,
  lastName: undefined,
  userImg: undefined,
  userType: "user",
  teacherId: undefined,
};

const initUserSettings: UserContextModel = {
  userInfo: initUserInfo,
  setUserInfo: () => {},
};

export const UserContext = createContext<UserContextModel>(initUserSettings);

type Props = {
  children: ReactNode;
};

const UserProvider: FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoModel>(initUserInfo);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
