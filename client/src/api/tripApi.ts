import { apiClient } from './client';

export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
}

export interface StayInfo {
    name: string;
    image: string;
    rating: string;
    amenities: string;
}

export interface Trip {
    id: string;
    title: string;
    destination: string;
    duration: string;
    price: number;
    image: string;
    images: string[];
    rating: number;
    description: string;
    code: string;
    isStory: boolean;
    tags: string[];
    categoryId: string;
    highlights: string[];
    bestTime: string;
    inclusions: string;
    itinerary: ItineraryDay[];
    stay: StayInfo;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTripData {
    title: string;
    destination: string;
    duration: string;
    price: number;
    image: string;
    images?: string[];
    rating?: number;
    description: string;
    code: string;
    isStory?: boolean;
    tags: string[];
    categoryId: string;
    highlights?: string[];
    bestTime?: string;
    inclusions?: string;
    itinerary?: ItineraryDay[];
    stay?: StayInfo;
}

export const tripApi = {
    getAll: () => apiClient.get<Trip[]>('/trips'),
    getById: (id: string) => apiClient.get<Trip>(`/trips/${id}`),
    getByCategory: (categoryId: string) => apiClient.get<Trip[]>(`/trips?categoryId=${categoryId}`),
    create: (data: CreateTripData) => apiClient.post<Trip>('/trips', data),
    update: (id: string, data: Partial<CreateTripData>) => apiClient.put<Trip>(`/trips/${id}`, data),
    delete: (id: string) => apiClient.delete(`/trips/${id}`),
};
