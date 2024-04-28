import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../services/user.service";
import { UserModel } from "../../models/user.model";
import { getTeachers } from "../../services/teacher.service";
import { TeacherModel } from "../../models/teacher.model";

export const GET = async (request: NextRequest) => {
    try {
        const users: TeacherModel[] = await getTeachers();

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};