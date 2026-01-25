import { ICategory, ICreateCategory, IUpdateCategory } from '../interfaces/category.interface.js';

export interface ICategoryService {
    getAllCategories(): Promise<ICategory[]>;
    getCategoryById(id: string): Promise<ICategory | undefined>;
    createCategory(data: ICreateCategory): Promise<ICategory>;
    updateCategory(id: string, data: IUpdateCategory): Promise<ICategory | undefined>;
    deleteCategory(id: string): Promise<boolean>;
}
