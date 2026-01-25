export interface ITrip {
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
    itinerary: IItineraryDay[];
    stay: IStayInfo;
    createdAt: Date;
    updatedAt: Date;
}

export interface IItineraryDay {
    day: number;
    title: string;
    description: string;
}

export interface IStayInfo {
    name: string;
    image: string;
    rating: string;
    amenities: string;
}

export interface ICreateTrip {
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
    itinerary?: IItineraryDay[];
    stay?: IStayInfo;
}

export interface IUpdateTrip {
    title?: string;
    destination?: string;
    duration?: string;
    price?: number;
    image?: string;
    images?: string[];
    rating?: number;
    description?: string;
    code?: string;
    isStory?: boolean;
    tags?: string[];
    categoryId?: string;
    highlights?: string[];
    bestTime?: string;
    inclusions?: string;
    itinerary?: IItineraryDay[];
    stay?: IStayInfo;
}
