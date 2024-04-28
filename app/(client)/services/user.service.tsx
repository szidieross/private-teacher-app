import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { UserModel } from "@/app/api/models/user.model";

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

  return { getUsers, getUserById };
};

export default useUsersService;
