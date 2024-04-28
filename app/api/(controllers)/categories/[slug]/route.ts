import { CategoryModel } from "@/app/api/models/category.model";
import { getCategoryById } from "@/app/api/services/category.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { slug: number } }) => {
    const userId = context.params.slug;
    try {
        const users: CategoryModel | null = await getCategoryById(userId);
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};