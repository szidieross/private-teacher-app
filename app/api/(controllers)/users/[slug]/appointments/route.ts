import { AppointmentModel } from "@/app/api/models/appointment.model";
import { getAppointmentByUserId } from "@/app/api/services/appointment.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { slug: number } }
) => {
  const userId = context.params.slug;
  try {
    const appointment: AppointmentModel[] | null = await getAppointmentByUserId(
      userId
    );
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
