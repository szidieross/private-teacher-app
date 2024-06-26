import { LessonModel } from "@/app/api/models/lesson.model";
import { createLesson, getLessonsByTeacherId } from "@/app/api/services/lesson.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { slug: number } }
) => {
  const teacherId = context.params.slug;
  try {
    const lessons: LessonModel[] | null =
      await getLessonsByTeacherId(teacherId);
    return NextResponse.json(lessons);
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
    const {
      teacherId,
      categoryId,
    } = await request.json();

    const result = await createLesson(
      teacherId,
      categoryId,
    );

    return NextResponse.json({ id: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
