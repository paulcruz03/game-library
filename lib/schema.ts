import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export interface UsualType {
  id: number; name: string; slug: string;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  ratings_count: number;
  metacritic: number;
  esrb_rating?: { id: number; name: string };
  released: string;
  tba: boolean;
  genres: UsualType[];
  platforms: { platform: UsualType }[];
  stores: { store: { id: number; name: string; domain: string; } }[];
  tags: UsualType[];
  clip: string | null;
  short_screenshots: { id: number; image: string; }[];
}

export interface GameDetail extends Game {
  description_raw: string;
  description: string;
  screenshots_count: number;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: object;
}

export interface Store {
  id: number;
  store_id: number;
  game_id: number;
  url: string;
}

export interface Genre extends UsualType {
  games_count: number;
}

export interface Tags extends UsualType {
  games_count: number;
}