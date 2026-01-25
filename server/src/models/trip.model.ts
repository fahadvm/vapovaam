import mongoose, { Schema, Document } from 'mongoose';
import { ITrip } from '../interfaces/trip.interface.js';

export interface ITripDocument extends ITrip, Document {
    _id: any;
    id: string; // We keep our custom id as well if needed, but usually Mongoose uses _id
}

const ItinerarySchema = new Schema({
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const StaySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: String, required: true },
    amenities: { type: String, required: true }
});

const TripSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, required: true },
    code: { type: String, required: true },
    isStory: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    categoryId: { type: String, required: true },
    highlights: { type: [String], default: [] },
    bestTime: { type: String, required: false },
    inclusions: { type: String, required: true },
    itinerary: { type: [ItinerarySchema], default: [] },
    stay: { type: StaySchema, required: true },
}, {
    timestamps: true
});

export default mongoose.model<ITripDocument>('Trip', TripSchema);
