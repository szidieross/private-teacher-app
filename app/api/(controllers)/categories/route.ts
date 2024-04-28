import { NextRequest, NextResponse } from "next/server";
import { CategoryModel } from "../../models/category.model";
import { getCategories } from "../../services/category.service";

export const GET = async (request: NextRequest) => {
    try {
        const users: CategoryModel[] = await getCategories();

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};