import { NextRequest, NextResponse } from "next/server";
import { LessonModel } from "../../models/lesson.model";
import { getLessons } from "../../services/lesson.service";

export const GET = async (request: NextRequest) => {
    try {
        const lessons: LessonModel[] = await getLessons();
        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};