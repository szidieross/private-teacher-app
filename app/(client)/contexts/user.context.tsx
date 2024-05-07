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
  img: string|undefined;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  type: "user" | "teacher";
  setType: Dispatch<SetStateAction<"user" | "teacher">>;
  data: UserModel | TeacherModel | undefined;
  setData: Dispatch<SetStateAction<UserModel | TeacherModel | undefined>>;
}

const initUserSettings: UserContextModel = {
  isLoggedIn: false,
  img:"",
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [img, setImg] = useState<string|undefined>(undefined);
  const [type, setType] = useState<"user" | "teacher">("user");
  const [data, setData] = useState<UserModel | TeacherModel | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      setIsLoggedIn(session.isLoggedIn);
      setData(session.userData);
      setType(session.role);
      setImg(session.img);
      console.log(session.role)
      console.log("userId", session.userId);
      console.log("session.userData", session.userData);
    };
    fetchData();
  }, [getSession]);

  return (
    <UserContext.Provider
      value={{
        img,
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
// import { getSession } from "@/app/actions";
// import { TeacherModel } from "@/app/api/models/teacher.model";
// import { UserModel } from "@/app/api/models/user.model";
// import {
//   Dispatch,
//   FC,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// interface UserContextModel {
//   isLoggedIn: boolean;
//   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
//   type: "user" | "teacher";
//   setType: Dispatch<SetStateAction<"user" | "teacher">>;
//   data: UserModel | TeacherModel | undefined;
//   setData: Dispatch<SetStateAction<UserModel | TeacherModel | undefined>>;
// }

// const initUserSettings: UserContextModel = {
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
//   type: "user",
//   setType: () => {},
//   data: undefined,
//   setData: () => {},
// };

// export const UserContext = createContext<UserContextModel>(initUserSettings);

// type Props = {
//   children: ReactNode;
// };

// const UserProvider: FC<Props> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [type, setType] = useState<"user" | "teacher">("user");
//   const [data, setData] = useState<UserModel | TeacherModel | undefined>(
//     undefined
//   );
//   useEffect(() => {
//     const fetchData = async () => {
//       const session = await getSession();

//       setIsLoggedIn(session.isLoggedIn);
//       console.log("session.userId",session.userId)
//     };
//     fetchData();
//   }, [getSession]);

//   return (
//     <UserContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         type,
//         setType,
//         data,
//         setData,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
