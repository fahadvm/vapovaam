import { ITrip, ICreateTrip, IUpdateTrip } from '../interfaces/trip.interface.js';
import { ITripRepository } from '../interfaces/trip-repository.interface.js';
import TripModel from '../models/trip.model.js';

export class TripRepository implements ITripRepository {
    async findAll(): Promise<ITrip[]> {
        return TripModel.find({}).lean();
    }

    async findById(id: string): Promise<ITrip | undefined> {
        const trip = await TripModel.findOne({ id }).lean();
        return trip as ITrip | undefined;
    }

    async findByCategory(categoryId: string): Promise<ITrip[]> {
        return TripModel.find({ categoryId }).lean();
    }

    async create(data: ICreateTrip): Promise<ITrip> {
        const newTrip = new TripModel({
            id: Date.now().toString(),
            ...data,
            images: (data.images && data.images.length > 0) ? data.images : [data.image]
        });
        await newTrip.save();
        return newTrip.toObject();
    }

    async update(id: string, data: IUpdateTrip): Promise<ITrip | undefined> {
        const updatedTrip = await TripModel.findOneAndUpdate({ id }, data, { new: true }).lean();
        return updatedTrip as ITrip | undefined;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TripModel.findOneAndDelete({ id });
        return !!result;
    }
}
