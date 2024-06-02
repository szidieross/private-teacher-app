import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { getSession } from "@/app/actions";

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
      location: string,
      street: string,
      houseNumber: string
    ): Promise<UserModel | TeacherModel | null> => {
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
            street,
            houseNumber,
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
    async (username: string, password: string): Promise<UserModel | null> => {
      try {
        const { data } = await api.post<UserModel>(
          `/login`,
          {
            username,
            password,
          },
          "Couldn't login.!"
        );
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const updateUserImage = useCallback(async (userId: number, title: string) => {
    try {
      const { data } = await api.post<UserModel>(
        `/upload`,
        {
          userId,
          title,
        },
        "Couldn't upload image.!"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const updateUserData = useCallback(
    async (
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      price?: number,
      qualification?: string,
      bio?: string,
      location?: string,
      street?: string,
      houseNumber?: string
    ) => {
      const session = await getSession();
      const userId = session.userId;
      try {
        const { data } = await api.put<UserModel>(
          `/users/${userId}`,
          {
            userId,
            username,
            firstName,
            lastName,
            email,
            phone,
            price,
            qualification,
            bio,
            location,
            street,
            houseNumber,
          },
          "Couldn't update user data.!"
        );
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const deleteUserById = async (userId: number) => {
    try {
      const { data } = await api.delete<UserModel>(
        `/users/${userId}`,
        "Couldn't delete user!"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getUsers,
    getUserById,
    createUser,
    loginUser,
    updateUserImage,
    updateUserData,
    deleteUserById,
  };
};

export default useUsersService;
