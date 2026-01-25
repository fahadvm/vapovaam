import { IUser } from '../interfaces/user.interface.js';
import { IUserRepository } from '../interfaces/user-repository.interface.js';

export class UserRepository implements IUserRepository {
    private users: IUser[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    async findAll(): Promise<IUser[]> {
        return this.users;
    }

    async findById(id: number): Promise<IUser | undefined> {
        return this.users.find(user => user.id === id);
    }
}
