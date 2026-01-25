import { IUser } from './user.interface.js';

export interface IUserService {
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser | undefined>;
}
