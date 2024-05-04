import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { SimpleUserModel, UserModel } from "@/app/api/models/user.model";

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

  const getUserByUserame = useCallback(
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
      profilePicture: string,
      firstName: string,
      lastName: string,
      role: string
    ): Promise<UserModel | null> => {
      try {
        const { data } = await api.post<UserModel>(
          `/signup`,
          {
            username,
            password,
            email,
            phone,
            profilePicture,
            firstName,
            lastName,
            role,
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

  const verifyUser = useCallback(
    async (
      username: string,
      password: string,
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

  return { getUsers, getUserById,createUser,verifyUser };
};

export default useUsersService;
