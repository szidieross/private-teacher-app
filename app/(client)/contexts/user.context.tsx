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

interface UserContextModel {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  userType: "user" | "teacher";
  setUserType: Dispatch<SetStateAction<"user" | "teacher">>;
  img: string | undefined;
  setImg: Dispatch<SetStateAction<string | undefined>>;
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
  teacher: TeacherModel | null;
  setTeacher: Dispatch<SetStateAction<TeacherModel | null>>;
}

const initUserSettings: UserContextModel = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  userType: "user",
  setUserType: () => {},
  img: undefined,
  setImg: () => {},
  user: null,
  setUser: () => {},
  teacher: null,
  setTeacher: () => {},
};

export const UserContext = createContext<UserContextModel>(initUserSettings);

type Props = {
  children: ReactNode;
};

const UserProvider: FC<Props> = ({ children }) => {
  // const { getUserById } = useUsersService();
  // const { getTeacherByUserId } = useTeachersService();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userType, setUserType] = useState<"user" | "teacher">("user");
  const [img, setImg] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserModel | null>(null);
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const session = await getSession();

  //     setIsLoggedIn(session.isLoggedIn);
  //     setUserType(session.role);
  //     setImg(session.img);

  //     if (session.userId) {
  //       const fetchedUser = await getUserById(session.userId);
  //       if (fetchedUser) {
  //         // console.log("user context user", fetchedUser);
  //         setUser(fetchedUser);

  //         if (fetchedUser.role === "teacher") {
  //           const fetchedTeacher = await getTeacherByUserId(session.userId);
  //           // console.log("user context teacher", fetchedTeacher);
  //           if (fetchedTeacher) {
  //             setTeacher(fetchedTeacher);
  //           }
  //         }
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [getSession]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        userType,
        setUserType,
        img,
        setImg,
        user,
        setUser,
        teacher,
        setTeacher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
