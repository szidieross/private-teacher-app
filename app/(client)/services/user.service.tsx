import { useCallback } from "react";
import { api } from "@/app/api/utils/api.util";
import { UserModel } from "@/app/api/models/user.model";

const useUsersService = () => {
    const getUsers = useCallback(async (): Promise<UserModel[]> => {
        try {
            const { data } = await api.get<UserModel[]>(
                "/users",
                "The request for communities failed, please reload the page!"
            );
            return data;
        } catch (error) {
            console.error(error);
        }

        return Promise.resolve([]);
    }, []);

    return { getUsers };
};

export default useUsersService;