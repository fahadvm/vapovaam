import { ICategory, ICreateCategory, IUpdateCategory } from '../interfaces/category.interface.js';
import { ICategoryRepository } from '../interfaces/category-repository.interface.js';

export class CategoryRepository implements ICategoryRepository {
    private categories: ICategory[] = [
        { id: 'adventure', name: 'Adventure', icon: 'Mountain', color: 'bg-orange-500', createdAt: new Date(), updatedAt: new Date() },
        { id: 'relax', name: 'Relax', icon: 'Coffee', color: 'bg-blue-500', createdAt: new Date(), updatedAt: new Date() },
        { id: 'family', name: 'Family', icon: 'Users', color: 'bg-green-500', createdAt: new Date(), updatedAt: new Date() },
        { id: 'honeymoon', name: 'Honeymoon', icon: 'Heart', color: 'bg-pink-500', createdAt: new Date(), updatedAt: new Date() },
        { id: 'culture', name: 'Culture', icon: 'Landmark', color: 'bg-purple-500', createdAt: new Date(), updatedAt: new Date() },
        { id: 'food', name: 'Food', icon: 'Utensils', color: 'bg-yellow-500', createdAt: new Date(), updatedAt: new Date() },
    ];

    async findAll(): Promise<ICategory[]> {
        return this.categories;
    }

    async findById(id: string): Promise<ICategory | undefined> {
        return this.categories.find(cat => cat.id === id);
    }

    async create(data: ICreateCategory): Promise<ICategory> {
        const newCategory: ICategory = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    async update(id: string, data: IUpdateCategory): Promise<ICategory | undefined> {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index === -1) return undefined;

        this.categories[index] = {
            ...this.categories[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.categories[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index === -1) return false;

        this.categories.splice(index, 1);
        return true;
    }
}
