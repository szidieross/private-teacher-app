import pool from "@/app/libs/mysql";
import { CategoryModel } from "../models/category.model";
import { CategoryDto } from "../dtos/category.dto";
import { toCategoryModel } from "../mappers/category.mapper";

export const getCategories = async (): Promise<CategoryModel[]> => {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM categories';
        const [rows] = await db.execute(query);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: CategoryDto[] = (rows as any).map((row: any) => {
            return {
                category_id: row.category_id,
                parent_category_id: row.parent_category_id,
                name: row.name,
            };
        });

        const categories: CategoryModel[] = data.map((row: CategoryDto) => {
            return toCategoryModel(row);
        });

        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};