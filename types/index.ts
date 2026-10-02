export type Property = {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  price: number;
  priceLabel: string;
  type: string;
  listing: "Buy" | "Rent";
  beds: number;
  baths: number;
  area: number;
  image: string;
  tags: string[];
  description: string;
  agent: string;
  featured?: boolean;
  verified?: boolean;
  furnishing: string;
};

export type Agent = { name: string; role: string; location: string; experience: number; rating: number; listings: number; image: string; bio: string };
