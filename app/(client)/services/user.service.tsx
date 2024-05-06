import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { SimpleUserModel, UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";

const useUsersService = () => {
  const getUsers = useCallback(async (): Promise<UserModel[]> => {
    try {
      const { data } = await api.get<UserModel[]>(
        "/users",
        "The request for users failed, please reload the page!"
      );
      return data;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve([]);
  }, []);

  const getUserById = useCallback(
    async (userId: number): Promise<UserModel | null> => {
      try {
        const { data } = await api.get<UserModel>(
          `/users/${userId}`,
          "The request for user failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const createUser = useCallback(
    async (
      username: string,
      password: string,
      email: string,
      phone: string,
      firstName: string,
      lastName: string,
      role: string,
      price: number,
      bio: string,
      qualification: string,
      location: string
    ): Promise<UserModel | TeacherModel | null> => {
      console.log("client price", price);
      try {
        const { data } = await api.post<UserModel>(
          `/signup`,
          {
            username,
            password,
            email,
            phone,
            firstName,
            lastName,
            role,
            price,
            bio,
            qualification,
            location,
          },
          "Error while creating user!"
        );
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const loginUser = useCallback(
    async (
      username: string,
      password: string
    ): Promise<UserModel | null> => {
      try {
        const { data } = await api.post<UserModel>(
          `/login`,
          {
            username,
            password,
          },
          "Couldn't login.!"
        );
        localStorage.setItem("userData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  return { getUsers, getUserById, createUser, loginUser };
};

export default useUsersService;
