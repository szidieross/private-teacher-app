import { TeacherModel } from "@/app/api/models/teacher.model";
import { getTeacherById } from "@/app/api/services/teacher.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { slug: number } }) =>{
    const teacherId = context.params.slug;
    try {
        const teacher: TeacherModel|null = await getTeacherById(teacherId);
        return NextResponse.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};