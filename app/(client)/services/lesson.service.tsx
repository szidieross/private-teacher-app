import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { LessonModel } from "@/app/api/models/lesson.model";

const useLessonsService = () => {
  const getLessonsByTeacherId = useCallback(
    async (teacherId: number): Promise<LessonModel[] | null> => {
      try {
        const { data } = await api.get<LessonModel[]>(
          `/teachers/${teacherId}/lessons`,
          "The request for lesson failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const createLesson = useCallback(
    async (
      teacherId: number,
      categoryId: number
    ): Promise<LessonModel | null> => {
      try {
        const { data } = await api.post<LessonModel>(
          `/teachers/${teacherId}/lessons`,
          {
            teacherId,
            categoryId,
          },
          "Error while creating lessons!"
        );
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const deleteLessonsByLessonId = async (
    teacherId: number,
    lessonId: number
  ) => {
    try {
      const { data } = await api.delete<LessonModel>(
        `/teachers/${teacherId}/lessons/${lessonId}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getLessonsByTeacherId,
    createLesson,
    deleteLessonsByLessonId,
  };
};

export default useLessonsService;
