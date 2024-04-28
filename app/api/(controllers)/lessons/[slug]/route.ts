import { LessonModel } from "@/app/api/models/lesson.model";
import { getLessonById } from "@/app/api/services/lesson.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { slug: number } }) =>{
    const lessonId = context.params.slug;
    try {
        const lesson: LessonModel|null = await getLessonById(lessonId);
        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};