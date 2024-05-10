import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../services/user.service";
import { UserModel } from "../../models/user.model";

export const GET = async (request: NextRequest) => {
    try {
        const users: UserModel[] = await getUsers();

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
