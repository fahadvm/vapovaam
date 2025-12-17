export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  description: string;
  code: string;
  isStory?: boolean;
  tags: string[];
}
