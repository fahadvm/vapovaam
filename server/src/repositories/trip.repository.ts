import { ITrip, ICreateTrip, IUpdateTrip } from '../interfaces/trip.interface.js';
import { ITripRepository } from '../interfaces/trip-repository.interface.js';

export class TripRepository implements ITripRepository {
    private trips: ITrip[] = [
        {
            id: '1',
            title: 'Neon Nights in Tokyo',
            destination: 'Tokyo, Japan',
            duration: '7 Days',
            price: 1899,
            image: 'https://images.unsplash.com/photo-1713263367828-9eafd7fc3797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwzfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1713263367828-9eafd7fc3797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwzfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1642821199328-a3bcdc821552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.9,
            description: 'Experience the vibrant energy of Tokyo, from the bustling streets of Shinjuku to the serene temples of Asakusa.',
            code: 'VAP-TOK-001',
            isStory: true,
            tags: ['City', 'Culture', 'Food'],
            categoryId: 'culture',
            highlights: ['Visit ancient temples', 'Experience modern technology', 'Taste authentic Japanese cuisine'],
            bestTime: 'Oct - Mar',
            inclusions: 'Flight + Hotel',
            itinerary: [
                { day: 1, title: 'Arrival in Tokyo', description: 'Check-in and evening city exploration' },
                { day: 2, title: 'Shinjuku & Shibuya', description: 'Explore the neon-lit districts' },
                { day: 3, title: 'Asakusa Temple', description: 'Visit the famous Senso-ji Temple' },
            ],
            stay: { name: 'Tokyo Grand Hotel', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '5 Star', amenities: 'Breakfast Included' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            title: 'New York City Escape',
            destination: 'New York, USA',
            duration: '5 Days',
            price: 1499,
            image: 'https://images.unsplash.com/photo-1666489022665-dad7978e8192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1666489022665-dad7978e8192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.8,
            description: 'Immerse yourself in the city that never sleeps. Broadway shows, Central Park strolls, and world-class dining.',
            code: 'VAP-NYC-002',
            isStory: true,
            tags: ['Urban', 'Shopping', 'Nightlife'],
            categoryId: 'adventure',
            highlights: ['Broadway shows', 'Central Park', 'Times Square'],
            bestTime: 'Apr - Jun',
            inclusions: 'Flight + Hotel',
            itinerary: [
                { day: 1, title: 'Manhattan Arrival', description: 'Check-in and Times Square exploration' },
                { day: 2, title: 'Central Park', description: 'Full day Central Park adventure' },
            ],
            stay: { name: 'Manhattan Plaza', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '4 Star', amenities: 'City View' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            title: 'Majestic Mount Fuji',
            destination: 'Fujiyoshida, Japan',
            duration: '3 Days',
            price: 899,
            image: 'https://images.unsplash.com/photo-1718020527810-616f447d67de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1718020527810-616f447d67de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.9,
            description: 'Witness the breathtaking beauty of Mount Fuji. Perfect for nature lovers and photographers.',
            code: 'VAP-FUJI-003',
            isStory: false,
            tags: ['Nature', 'Scenic', 'Relax'],
            categoryId: 'relax',
            highlights: ['Mount Fuji views', 'Hot springs', 'Traditional ryokan stay'],
            bestTime: 'Oct - Dec',
            inclusions: 'Hotel + Guide',
            itinerary: [
                { day: 1, title: 'Arrival', description: 'Travel to Fujiyoshida' },
                { day: 2, title: 'Mount Fuji Tour', description: 'Full day exploration' },
                { day: 3, title: 'Departure', description: 'Morning hot springs and departure' },
            ],
            stay: { name: 'Fuji Ryokan', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '5 Star', amenities: 'Traditional Japanese' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '4',
            title: 'Urban Jungle Vibes',
            destination: 'Singapore',
            duration: '4 Days',
            price: 1299,
            image: 'https://images.unsplash.com/photo-1666489022516-a9041fce76db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1666489022516-a9041fce76db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.7,
            description: 'Explore the futuristic architecture and lush gardens of Singapore. A perfect blend of nature and technology.',
            code: 'VAP-SIN-004',
            isStory: true,
            tags: ['Modern', 'Green', 'Luxury'],
            categoryId: 'family',
            highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island'],
            bestTime: 'Year round',
            inclusions: 'Flight + Hotel',
            itinerary: [
                { day: 1, title: 'Arrival', description: 'Marina Bay exploration' },
                { day: 2, title: 'Gardens by the Bay', description: 'Full day at the gardens' },
            ],
            stay: { name: 'Marina Bay Sands', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '5 Star', amenities: 'Infinity Pool' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '5',
            title: 'Historic Doorways',
            destination: 'Rome, Italy',
            duration: '6 Days',
            price: 1699,
            image: 'https://images.unsplash.com/photo-1673065556270-8827a2edbfab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwxMHx8dHJhdmVsJTIwZGVzdGluYXRpb24lMjB2ZXJ0aWNhbHxlbnwwfHx8fDE3NjU5NDgzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1673065556270-8827a2edbfab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwxMHx8dHJhdmVsJTIwZGVzdGluYXRpb24lMjB2ZXJ0aWNhbHxlbnwwfHx8fDE3NjU5NDgzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.8,
            description: 'Walk through history in the eternal city. Ancient ruins, renaissance art, and incredible pasta.',
            code: 'VAP-ROM-005',
            isStory: false,
            tags: ['History', 'Art', 'Food'],
            categoryId: 'culture',
            highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain'],
            bestTime: 'Apr - Jun',
            inclusions: 'Flight + Hotel + Tours',
            itinerary: [
                { day: 1, title: 'Arrival in Rome', description: 'Check-in and evening walk' },
                { day: 2, title: 'Colosseum', description: 'Ancient Rome exploration' },
                { day: 3, title: 'Vatican City', description: 'Full day at the Vatican' },
            ],
            stay: { name: 'Roma Grand', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '4 Star', amenities: 'Breakfast Included' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '6',
            title: 'Crowded Streets of India',
            destination: 'Mumbai, India',
            duration: '5 Days',
            price: 999,
            image: 'https://images.unsplash.com/photo-1704530830509-1a3b43c000d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            images: [
                'https://images.unsplash.com/photo-1704530830509-1a3b43c000d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080',
            ],
            rating: 4.6,
            description: 'Dive into the chaos and charm of Mumbai. A sensory overload of colors, sounds, and flavors.',
            code: 'VAP-MUM-006',
            isStory: true,
            tags: ['Culture', 'Busy', 'Authentic'],
            categoryId: 'food',
            highlights: ['Gateway of India', 'Local street food tour', 'Bollywood experience'],
            bestTime: 'Nov - Feb',
            inclusions: 'Hotel + Guide',
            itinerary: [
                { day: 1, title: 'Mumbai Arrival', description: 'Gateway of India visit' },
                { day: 2, title: 'Street Food Tour', description: 'Explore local cuisine' },
            ],
            stay: { name: 'Taj Mahal Palace', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', rating: '5 Star', amenities: 'Heritage Property' },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    async findAll(): Promise<ITrip[]> {
        return this.trips;
    }

    async findById(id: string): Promise<ITrip | undefined> {
        return this.trips.find(trip => trip.id === id);
    }

    async findByCategory(categoryId: string): Promise<ITrip[]> {
        return this.trips.filter(trip => trip.categoryId === categoryId);
    }

    async create(data: ICreateTrip): Promise<ITrip> {
        const newTrip: ITrip = {
            id: Date.now().toString(),
            ...data,
            images: data.images || [data.image],
            rating: data.rating || 4.5,
            isStory: data.isStory || false,
            highlights: data.highlights || [],
            bestTime: data.bestTime || 'Year round',
            inclusions: data.inclusions || 'Flight + Hotel',
            itinerary: data.itinerary || [],
            stay: data.stay || { name: 'Standard Hotel', image: '', rating: '3 Star', amenities: '' },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.trips.push(newTrip);
        return newTrip;
    }

    async update(id: string, data: IUpdateTrip): Promise<ITrip | undefined> {
        const index = this.trips.findIndex(trip => trip.id === id);
        if (index === -1) return undefined;

        this.trips[index] = {
            ...this.trips[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.trips[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.trips.findIndex(trip => trip.id === id);
        if (index === -1) return false;

        this.trips.splice(index, 1);
        return true;
    }
}
