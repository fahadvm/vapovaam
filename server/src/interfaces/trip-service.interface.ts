import { ITrip, ICreateTrip, IUpdateTrip } from '../interfaces/trip.interface.js';

export interface ITripService {
    getAllTrips(): Promise<ITrip[]>;
    getTripById(id: string): Promise<ITrip | undefined>;
    getTripsByCategory(categoryId: string): Promise<ITrip[]>;
    createTrip(data: ICreateTrip): Promise<ITrip>;
    updateTrip(id: string, data: IUpdateTrip): Promise<ITrip | undefined>;
    deleteTrip(id: string): Promise<boolean>;
}
