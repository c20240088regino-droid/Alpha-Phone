export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  screen: string;
  badge: string;
}

export const products: Product[] = [
  {
    id: "alpha-one",
    category: "Everyday",
    name: "Alpha One",
    description: "A thoughtful everyday phone for calls, apps, and entertainment.",
    price: "₱19,999",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
    alt: "Alpha One smartphone",
    screen: "screen-blue",
    badge: "Everyday pick",
  },
  {
    id: "alpha-pro",
    category: "Creator",
    name: "Alpha Pro",
    description: "A versatile companion for capturing photos and making things.",
    price: "₱29,999",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    alt: "Alpha Pro smartphone",
    screen: "",
    badge: "For creators",
  },
  {
    id: "alpha-ultra",
    category: "Performance",
    name: "Alpha Ultra",
    description: "A powerful choice for gaming and everyday multitasking.",
    price: "₱39,999",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
    alt: "Alpha Ultra smartphone",
    screen: "screen-purple",
    badge: "Performance",
  },
  {
    id: "alpha-lite",
    category: "Essentials",
    name: "Alpha Lite",
    description: "A simple, dependable option for the things you do every day.",
    price: "₱14,999",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&sat=-35",
    alt: "Alpha Lite smartphone",
    screen: "screen-green",
    badge: "Great value",
  },
];
