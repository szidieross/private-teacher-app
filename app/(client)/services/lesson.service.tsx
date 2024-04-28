import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { LessonModel } from "@/app/api/models/lesson.model";

const useLessonsService = () => {
  const getLessons = useCallback(async (): Promise<LessonModel[]> => {
    try {
      const { data } = await api.get<LessonModel[]>(
        "/lessons",
        "The request for lessons failed, please reload the page!"
      );
      return data;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve([]);
  }, []);

  const getLessonById = useCallback(
    async (lessonId: number): Promise<LessonModel | null> => {
      try {
        const { data } = await api.get<LessonModel>(
          `/lessons/${lessonId}`,
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

  return { getLessons, getLessonById };
};

export default useLessonsService;
