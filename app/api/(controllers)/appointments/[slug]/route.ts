import { AppointmentModel } from "@/app/api/models/appointment.model";
import { getAppointmentById } from "@/app/api/services/appointment.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { slug: number } }) => {
    const userId = context.params.slug;
    try {
        const users: AppointmentModel | null = await getAppointmentById(userId);
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};