export type RoulettePrize = {
  id: number;
  name: string;
  weight: number;
  type: "image" | "text";
  image?: string;
};

// Order matters: the wheel draws segment `id` at angle id * (360 / length).
// Weights are relative odds; the server draws the prize (src/actions/roulette.ts).
export const ROULETTE_PRIZES: RoulettePrize[] = [
  { id: 0, name: "Airpods", weight: 1, type: "image", image: "/gift-airpods.png" },
  { id: 1, name: "Casco VR", weight: 2, type: "image", image: "/gift-vr.png" },
  { id: 2, name: "Amazon Prime", weight: 5, type: "image", image: "/gift-prime.png" },
  { id: 3, name: "Foto Profesional", weight: 5, type: "image", image: "/gift-photo.jpg" },
  { id: 4, name: "Netflix", weight: 10, type: "image", image: "/gift-netflix.webp" },
  { id: 5, name: "Disney+", weight: 10, type: "image", image: "/gift-disney.svg" },
  { id: 6, name: "Recarga $3", weight: 10, type: "text" },
  { id: 7, name: "Spotify", weight: 10, type: "image", image: "/gift-spotify.png" },
  { id: 8, name: "Coca Cola", weight: 10, type: "image", image: "/gift-cocacola.png" },
  { id: 9, name: "Clase Gratis", weight: 10, type: "text" },
  { id: 10, name: "Agua", weight: 10, type: "image", image: "/gift-dasani.webp" },
];
