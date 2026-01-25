import { IUser } from './user.interface.js';

export interface IUserRepository {
    findAll(): Promise<IUser[]>;
    findById(id: number): Promise<IUser | undefined>;
}
