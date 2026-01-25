import { UserRepository } from '../repositories/user.repository.js';
import { IUser } from '../interfaces/user.interface.js';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<IUser | undefined> {
        return await this.userRepository.findById(id);
    }
}
