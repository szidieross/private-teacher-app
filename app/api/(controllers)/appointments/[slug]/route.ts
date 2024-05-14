import { AppointmentModel } from "@/app/api/models/appointment.model";
import {
  bookAppointment,
  cancelAppointment,
  deleteAppointment,
  getAppointmentByUserId,
} from "@/app/api/services/appointment.service";
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

export async function POST(request: NextRequest) {
  try {
    const { userId, appointmentId, lessonId } = await request.json();
    console.log("lessonId", lessonId);

    if (!userId || !appointmentId) {
      throw new Error("Missing userId or appointmentId");
    }

    const result = await bookAppointment(userId, appointmentId, lessonId);

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

// export async function PUT(request: NextRequest) {
//   try {
//     const { appointmentId } = await request.json();
//     console.log("appointmentId", appointmentId);
//     // console.log("cancelAppointmentcancelAppointmentcancelAppointment")

//     if (!appointmentId) {
//       throw new Error("Missing appointmentId");
//     }

//     const result = await cancelAppointment(appointmentId);

//     return NextResponse.json({ affectedRows: result }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { slug: number } }
// ) {
//   try {
//     const appointmentId = context.params.slug;
//     console.log("appointmentId", appointmentId);

//     if (!appointmentId) {
//       throw new Error("Missing appointmentId");
//     }

//     const result = await deleteAppointment(appointmentId);

//     return NextResponse.json({ affectedRows: result }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(request: NextRequest,context: { params: { slug: number } }) {
  try {
    const appointmentId = context.params.slug;
    console.log("appointmentId", appointmentId);

    if (!appointmentId) {
      throw new Error("Missing appointmentId");
    }

    const result = await cancelAppointment(appointmentId);

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

export async function DELETE(request: NextRequest, context: { params: { slug: number } }) {
  try {
    const appointmentId = context.params.slug;
    console.log("appointmentId", appointmentId);

    if (!appointmentId) {
      throw new Error("Missing appointmentId");
    }

    const result = await deleteAppointment(appointmentId);

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


