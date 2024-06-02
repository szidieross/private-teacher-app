import { AppointmentModel } from "@/app/api/models/appointment.model";
import { createAppointment, getAppointmentsByTeacherId } from "@/app/api/services/appointment.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { slug: number } }
) => {
  const teacherId = context.params.slug;
  try {
    const appointments: AppointmentModel[] | null =
      await getAppointmentsByTeacherId(teacherId);
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export async function POST(request: NextRequest) {
  try {
    const {
      teacherId,
      startTime,
    } = await request.json();

    const result = await createAppointment(
      teacherId,
      startTime,
    );

    return NextResponse.json({ id: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

