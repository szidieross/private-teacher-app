import { NextRequest, NextResponse } from "next/server";
import { getTeachers } from "../../services/teacher.service";
import { TeacherModel } from "../../models/teacher.model";

// export const GET = async (request: NextRequest) => {
//     try {
//         const teachers: TeacherModel[] = await getTeachers();
//         return NextResponse.json(teachers);
//     } catch (error) {
//         console.error('Error fetching teachers:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// };
// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const teachers = await query({
//       query:
//         "SELECT u.*, t.* FROM Users u INNER JOIN Teachers t ON u.user_id = t.user_id WHERE u.role = teacher",
//       values: [],
//     });
//     res.status(200).json({teachers:teachers})
//   }
// }

export const GET = async (request: NextRequest) => {
  try {
    const teachers: TeacherModel[] = await getTeachers();

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
