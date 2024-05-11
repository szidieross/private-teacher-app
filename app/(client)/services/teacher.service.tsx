import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { TeacherModel } from "@/app/api/models/teacher.model";

const useTeachersService = () => {
  // const createTeacher = useCallback(async (): Promise<TeacherModel[]> => {
  //   try {
  //     const { data } = await api.get<TeacherModel[]>(
  //       "/teachers",
  //       "The request for teachers failed, please reload the page!"
  //     );
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   return Promise.resolve([]);
  // }, []);
  const getTeachers = useCallback(async (): Promise<TeacherModel[]> => {
    try {
      const { data } = await api.get<TeacherModel[]>(
        "/teachers",
        "The request for teachers failed, please reload the page!"
      );
      return data;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve([]);
  }, []);

  const getTeacherById = useCallback(
    async (teacherId: number): Promise<TeacherModel | null> => {
      try {
        const { data } = await api.get<TeacherModel>(
          `/teachers/${teacherId}`,
          "The request for teacher failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const getTeacherByUserId = useCallback(
    async (userId: number): Promise<TeacherModel | null> => {
      try {
        const { data } = await api.get<TeacherModel>(
          `/teachers/user/${userId}`,
          "The request for teacher failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  return { getTeachers, getTeacherById, getTeacherByUserId };
};

export default useTeachersService;
