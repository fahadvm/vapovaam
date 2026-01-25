import { Request, Response } from 'express';
import { ITripService } from '../interfaces/trip-service.interface.js';

export class TripController {
    constructor(private tripService: ITripService) { }

    getTrips = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.query;

            let trips;
            if (categoryId && typeof categoryId === 'string') {
                trips = await this.tripService.getTripsByCategory(categoryId);
            } else {
                trips = await this.tripService.getAllTrips();
            }

            res.status(200).json({
                success: true,
                data: trips,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching trips',
            });
        }
    };

    getTripById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const trip = await this.tripService.getTripById(id);

            if (!trip) {
                return res.status(404).json({
                    success: false,
                    message: 'Trip not found',
                });
            }

            res.status(200).json({
                success: true,
                data: trip,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching trip',
            });
        }
    };

    createTrip = async (req: Request, res: Response) => {
        try {
            const trip = await this.tripService.createTrip(req.body);
            res.status(201).json({
                success: true,
                data: trip,
            });
        } catch (error) {
            console.error('Create Trip Error:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating trip',
            });
        }
    };

    updateTrip = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const trip = await this.tripService.updateTrip(id, req.body);

            if (!trip) {
                return res.status(404).json({
                    success: false,
                    message: 'Trip not found',
                });
            }

            res.status(200).json({
                success: true,
                data: trip,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating trip',
            });
        }
    };

    deleteTrip = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const deleted = await this.tripService.deleteTrip(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Trip not found',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Trip deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting trip',
            });
        }
    };
}
