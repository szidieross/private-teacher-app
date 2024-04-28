import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { TeacherModel } from "@/app/api/models/teacher.model";

const useCategoriesService = () => {
  const getCategories = useCallback(async (): Promise<TeacherModel[]> => {
    try {
      const { data } = await api.get<TeacherModel[]>(
        "/categories",
        "The request for categories failed, please reload the page!"
      );
      return data;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve([]);
  }, []);

  const getCategoryById = useCallback(
    async (categoryId: number): Promise<TeacherModel | null> => {
      try {
        const { data } = await api.get<TeacherModel>(
          `/categories/${categoryId}`,
          "The request for categoriy failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  return { getCategories, getCategoryById };
};

export default useCategoriesService;
