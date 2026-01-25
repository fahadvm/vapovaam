import { IUser } from '../interfaces/user.interface.js';
import { IUserRepository } from '../interfaces/user-repository.interface.js';
import { IUserService } from '../interfaces/user-service.interface.js';

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<IUser | undefined> {
        return await this.userRepository.findById(id);
    }
}
