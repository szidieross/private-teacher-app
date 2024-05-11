import { getSession } from "@/app/actions";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { UserModel } from "@/app/api/models/user.model";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserContextModel {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  userType: "user" | "teacher";
  setUserType: Dispatch<SetStateAction<"user" | "teacher">>;
  img: string | undefined;
  setImg: Dispatch<SetStateAction<string | undefined>>;
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
};

export const UserContext = createContext<UserContextModel>(initUserSettings);

type Props = {
  children: ReactNode;
};

const UserProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userType, setUserType] = useState<"user" | "teacher">("user");
  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      setIsLoggedIn(session.isLoggedIn);
      setUserType(session.role);      
      setImg(session.img);
    };
    fetchData();
  }, [getSession]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
