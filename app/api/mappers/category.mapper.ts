import { CategoryDto } from "../dtos/category.dto";
import { CategoryModel } from "../models/category.model";

const toCategoryModel = (dto: CategoryDto): CategoryModel => ({
    categoryId: dto.category_id,
    parentCategoryId: dto.parent_category_id,
    name: dto.name
});

export { toCategoryModel };