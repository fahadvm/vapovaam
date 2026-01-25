import { ICategory, ICreateCategory, IUpdateCategory } from '../interfaces/category.interface.js';
import { ICategoryRepository } from '../interfaces/category-repository.interface.js';
import { ICategoryService } from '../interfaces/category-service.interface.js';

export class CategoryService implements ICategoryService {
    constructor(private categoryRepository: ICategoryRepository) { }

    async getAllCategories(): Promise<ICategory[]> {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id: string): Promise<ICategory | undefined> {
        return await this.categoryRepository.findById(id);
    }

    async createCategory(data: ICreateCategory): Promise<ICategory> {
        return await this.categoryRepository.create(data);
    }

    async updateCategory(id: string, data: IUpdateCategory): Promise<ICategory | undefined> {
        return await this.categoryRepository.update(id, data);
    }

    async deleteCategory(id: string): Promise<boolean> {
        return await this.categoryRepository.delete(id);
    }
}
