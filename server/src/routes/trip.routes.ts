import { Router } from 'express';
import { TripController } from '../controllers/trip.controller.js';
import { TripService } from '../services/trip.service.js';
import { TripRepository } from '../repositories/trip.repository.js';

const router = Router();

// Dependency Injection
const tripRepository = new TripRepository();
const tripService = new TripService(tripRepository);
const tripController = new TripController(tripService);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

export default router;
