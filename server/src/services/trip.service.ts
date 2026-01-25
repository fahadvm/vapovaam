import { ITrip, ICreateTrip, IUpdateTrip } from '../interfaces/trip.interface.js';
import { ITripRepository } from '../interfaces/trip-repository.interface.js';
import { ITripService } from '../interfaces/trip-service.interface.js';

export class TripService implements ITripService {
    constructor(private tripRepository: ITripRepository) { }

    async getAllTrips(): Promise<ITrip[]> {
        return await this.tripRepository.findAll();
    }

    async getTripById(id: string): Promise<ITrip | undefined> {
        return await this.tripRepository.findById(id);
    }

    async getTripsByCategory(categoryId: string): Promise<ITrip[]> {
        return await this.tripRepository.findByCategory(categoryId);
    }

    async createTrip(data: ICreateTrip): Promise<ITrip> {
        return await this.tripRepository.create(data);
    }

    async updateTrip(id: string, data: IUpdateTrip): Promise<ITrip | undefined> {
        return await this.tripRepository.update(id, data);
    }

    async deleteTrip(id: string): Promise<boolean> {
        return await this.tripRepository.delete(id);
    }
}
