import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching users'
            });
        }
    };
}
