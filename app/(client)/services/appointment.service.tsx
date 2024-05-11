import { useCallback } from "react";
import { api } from "@/app/(client)/utils/api.util";
import { AppointmentModel } from "@/app/api/models/appointment.model";

const useAppointmentsService = () => {
  const getAppointments = useCallback(async (): Promise<AppointmentModel[]> => {
    try {
      const { data } = await api.get<AppointmentModel[]>(
        "/appointments",
        "The request for appointments failed, please reload the page!"
      );
      return data;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve([]);
  }, []);

  const getAppointmentById = useCallback(
    async (appointmentId: number): Promise<AppointmentModel | null> => {
      try {
        const { data } = await api.get<AppointmentModel>(
          `/appointments/${appointmentId}`,
          "The request for appointment failed, please reload the page!"
        );
        return Promise.resolve(data);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    []
  );

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

  const createAppointment = useCallback(
    async (
      teacherId: number,
      startTime: Date
    ): Promise<AppointmentModel | null> => {
      console.log("teacherId", teacherId);
      console.log("startTime", startTime);
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

  return {
    getAppointments,
    getAppointmentById,
    getAppointmentByTeacherId,
    createAppointment,
  };
};

export default useAppointmentsService;
