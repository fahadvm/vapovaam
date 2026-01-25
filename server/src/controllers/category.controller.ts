import { Request, Response } from 'express';
import { ICategoryService } from '../interfaces/category-service.interface.js';

export class CategoryController {
    constructor(private categoryService: ICategoryService) { }

    getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({
                success: true,
                data: categories,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching categories',
            });
        }
    };

    getCategoryById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.getCategoryById(id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                });
            }

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching category',
            });
        }
    };

    createCategory = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(201).json({
                success: true,
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating category',
            });
        }
    };

    updateCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.updateCategory(id, req.body);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                });
            }

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating category',
            });
        }
    };

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = await this.categoryService.deleteCategory(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting category',
            });
        }
    };
}
