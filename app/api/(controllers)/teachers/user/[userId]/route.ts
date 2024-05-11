import { TeacherModel } from "@/app/api/models/teacher.model";
import { getTeacherByUserId } from "@/app/api/services/teacher.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { userId: number } }) =>{
    const userId = context.params.userId;
    try {
        const teacher: TeacherModel|null = await getTeacherByUserId(userId);
        return NextResponse.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};