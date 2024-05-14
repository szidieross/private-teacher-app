import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

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
