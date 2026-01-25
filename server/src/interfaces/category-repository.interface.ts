import { ICategory, ICreateCategory, IUpdateCategory } from '../interfaces/category.interface.js';

export interface ICategoryRepository {
    findAll(): Promise<ICategory[]>;
    findById(id: string): Promise<ICategory | undefined>;
    create(data: ICreateCategory): Promise<ICategory>;
    update(id: string, data: IUpdateCategory): Promise<ICategory | undefined>;
    delete(id: string): Promise<boolean>;
}
