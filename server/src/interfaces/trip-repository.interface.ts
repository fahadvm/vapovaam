import { ITrip, ICreateTrip, IUpdateTrip } from '../interfaces/trip.interface.js';

export interface ITripRepository {
    findAll(): Promise<ITrip[]>;
    findById(id: string): Promise<ITrip | undefined>;
    findByCategory(categoryId: string): Promise<ITrip[]>;
    create(data: ICreateTrip): Promise<ITrip>;
    update(id: string, data: IUpdateTrip): Promise<ITrip | undefined>;
    delete(id: string): Promise<boolean>;
}
