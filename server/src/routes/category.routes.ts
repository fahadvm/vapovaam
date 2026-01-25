import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { CategoryService } from '../services/category.service.js';
import { CategoryRepository } from '../repositories/category.repository.js';

const router = Router();

// Dependency Injection
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
