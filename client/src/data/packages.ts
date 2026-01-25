import type  { Package } from '../types/package';

export const packages: Package[] = [
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
      'https://images.unsplash.com/photo-1583231686115-9460ba8e0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    description: 'Experience the vibrant energy of Tokyo, from the bustling streets of Shinjuku to the serene temples of Asakusa.',
    code: 'VAP-TOK-001',
    isStory: true,
    tags: ['City', 'Culture', 'Food']
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
      'https://images.unsplash.com/photo-1666489022516-a9041fce76db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHZlcnRpY2FsfGVufDB8fHx8MTc2NTk0ODM5OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    description: 'Immerse yourself in the city that never sleeps. Broadway shows, Central Park strolls, and world-class dining.',
    code: 'VAP-NYC-002',
    isStory: true,
    tags: ['Urban', 'Shopping', 'Nightlife']
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
      'https://images.unsplash.com/photo-1751797972069-4c4f64dde04a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw5fHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    description: 'Witness the breathtaking beauty of Mount Fuji. Perfect for nature lovers and photographers.',
    code: 'VAP-FUJI-003',
    isStory: false,
    tags: ['Nature', 'Scenic', 'Relax']
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
      'https://images.unsplash.com/photo-1683914791867-7d65ac8893de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwzfHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    description: 'Explore the futuristic architecture and lush gardens of Singapore. A perfect blend of nature and technology.',
    code: 'VAP-SIN-004',
    isStory: true,
    tags: ['Modern', 'Green', 'Luxury']
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
      'https://images.unsplash.com/photo-1683914791878-4d3132794594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    description: 'Walk through history in the eternal city. Ancient ruins, renaissance art, and incredible pasta.',
    code: 'VAP-ROM-005',
    isStory: false,
    tags: ['History', 'Art', 'Food']
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
      'https://images.unsplash.com/photo-1750756804530-fc4d56f299c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHw4fHx0cmF2ZWwlMjBob3RlbCUyMGZvb2R8ZW58MHx8fHwxNzY1OTUyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    description: 'Dive into the chaos and charm of Mumbai. A sensory overload of colors, sounds, and flavors.',
    code: 'VAP-MUM-006',
    isStory: true,
    tags: ['Culture', 'Busy', 'Authentic']
  }
];
