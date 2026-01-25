import { Request, Response } from 'express';
import { IUserService } from '../interfaces/user-service.interface.js';

export class UserController {
    constructor(private userService: IUserService) { }

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
