import { AppointmentModel } from "@/app/api/models/appointment.model";
import { cancelAppointmentByUserId, getAppointmentByUserId } from "@/app/api/services/appointment.service";
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

export async function DELETE(request: NextRequest, context: { params: { slug: number } }) {
  try {
    const userId = context.params.slug;

    if (!userId) {
      throw new Error("Missing userId");
    }

    const result = await cancelAppointmentByUserId(userId);

    return NextResponse.json({ affectedRows: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}