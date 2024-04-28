import { CategoryModel } from "@/app/api/models/category.model";
import { getCategoryById } from "@/app/api/services/category.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { slug: number } }) => {
    const categoryId = context.params.slug;
    try {
        const category: CategoryModel | null = await getCategoryById(categoryId);
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};