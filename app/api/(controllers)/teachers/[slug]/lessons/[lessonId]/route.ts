import { deleteLessonsByLessonId } from "@/app/api/services/lesson.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { slug: number; lessonId: number } }
) {
  try {
    const lessonId = context.params.lessonId;

    if (!lessonId) {
      throw new Error("Missing lessonId");
    }

    const result = await deleteLessonsByLessonId(lessonId);

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
