import { NextRequest, NextResponse } from "next/server";
import { LessonModel } from "../../models/lesson.model";
import { getLessons } from "../../services/lesson.service";

export const GET = async (request: NextRequest) => {
    try {
        const users: LessonModel[] = await getLessons();

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};