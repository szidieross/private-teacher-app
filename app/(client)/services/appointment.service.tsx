import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import { getSession } from "@/app/actions";

const useAppointmentsService = () => {
  const getAppointmentByTeacherId = useCallback(
    async (teacherId: number): Promise<AppointmentModel[] | null> => {
      try {
        const { data } = await api.get<AppointmentModel[]>(
          `/teachers/${teacherId}/appointments`,
          "The request for appointments failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const getAppointmentByUserId = useCallback(
    async (userId: number): Promise<AppointmentModel[] | null> => {
      try {
        const { data } = await api.get<AppointmentModel[]>(
          `/users/${userId}/appointments`,
          "The request for appointments failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const createAppointment = useCallback(
    async (
      teacherId: number,
      startTime: Date
    ): Promise<AppointmentModel | null> => {
      try {
        const { data } = await api.post<AppointmentModel>(
          `/teachers/${teacherId}/appointments`,
          {
            teacherId,
            startTime,
          },
          "Error while creating appointment!"
        );
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

  const bookAppointment = async (appointmentId: number, lessonId: number) => {
    const session = await getSession();
    const userId = session.userId;
    try {
      const { data } = await api.post<AppointmentModel>(
        `/appointments/${appointmentId}`,
        {
          userId,
          appointmentId,
          lessonId,
        },
        "Couldn't book appointment data.!"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const cancelAppointment = async (appointmentId: number) => {
    const session = await getSession();
    const userId = session.userId;
    try {
      const { data } = await api.put<AppointmentModel>(
        `/appointments/${appointmentId}`,
        {
          appointmentId,
        },
        "Couldn't cancel appointment!"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteAppointment = async (appointmentId: number) => {
    const session = await getSession();
    const userId = session.userId;
    try {
      const { data } = await api.delete<AppointmentModel>(
        `/appointments/${appointmentId}`,
        "Couldn't delete appointment!"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getAppointmentByTeacherId,
    createAppointment,
    bookAppointment,
    getAppointmentByUserId,
    cancelAppointment,
    deleteAppointment,
  };
};

export default useAppointmentsService;
