import { TeacherModel } from "@/app/api/models/teacher.model";
import { UserModel } from "@/app/api/models/user.model";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

// interface UserSettingsModel {
//   isLoggedIn: boolean;
//   type: "user" | "teacher";
//   data: UserModel | TeacherModel | undefined;
// }

interface UserContextModel {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  type: "user" | "teacher";
  setType: Dispatch<SetStateAction<"user" | "teacher">>;
  data: UserModel | TeacherModel | undefined;
  setData: Dispatch<SetStateAction<UserModel | TeacherModel | undefined>>;
}

const initUserSettings: UserContextModel = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  type: "user",
  setType: () => {},
  data: undefined,
  setData: () => {},
};

export const UserContext = createContext<UserContextModel>(initUserSettings);

type Props = {
  children: ReactNode;
};

const UserProvider: FC<Props> = ({ children }) => {
  //   const [userSettings, setUserSettings] =
  //     useState<UserSettingsModel>(initUserSettings);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [type, setType] = useState<"user" | "teacher">("user");
  const [data, setData] = useState<UserModel | TeacherModel | undefined>(
    undefined
  );

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        type,
        setType,
        data,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// import { TeacherModel } from "@/app/api/models/teacher.model";
// import { UserModel } from "@/app/api/models/user.model";
// import {
//   Dispatch,
//   FC,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useState,
// } from "react";

// interface UserSettingsModel {
//   isLoggedIn: boolean;
//   type: "user" | "teacher";
//   data: UserModel | TeacherModel | undefined;
// }

// interface UserContextModel {
//   isLoggedIn: boolean;
//   type: "user" | "teacher";
//   data: UserModel | TeacherModel | undefined;
// }

// const initUserSettings: UserSettingsModel = {
//   isLoggedIn: false,
//   type: "user",
//   data: undefined,
// };

// export const UserContext = createContext<UserContextModel>({
//   userSettings: initUserSettings,
//   setUserSettings: () => {},
// });

// type Props = {
//   children: React.ReactNode;
// };

// const StoreProvider: FC<Props> = ({ children }) => {
//   const [userSettings, setUserSettings] =
//     useState<UserContextModel>(initUserSettings);

//   return (
//     <UserContext.Provider
//       value={{
//         \
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default StoreProvider;
