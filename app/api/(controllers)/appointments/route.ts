import { NextRequest, NextResponse } from "next/server";
import { AppointmentModel } from "../../models/appointment.model";
import { getAppointments } from "../../services/appointment.service";

export const GET = async (request: NextRequest) => {
    try {
        const appointments: AppointmentModel[] = await getAppointments();
        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};