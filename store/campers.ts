import toast from "react-hot-toast";
import { create } from "zustand";
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: { thumb: string; original: string }[];
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
}

export interface CamperBody {
  total: number,
  items:Camper[]
}

export interface TruckFilters {
  location?: string;
  [key: string]: string | boolean | undefined;
}

interface TrucksStore {
  trucks: CamperBody;
  filters: TruckFilters;
  loading: boolean;
  currentPage: number;
  setPage: (page: number) => void;
  setFilters: (filters: TruckFilters) => void;
  fetchFirstPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
}

const LIMIT = 4;

export const useTrucksStore = create<TrucksStore>((set, get) => ({
  trucks: { total: 0, items: [] },
  filters: {},
  loading: false,
  currentPage: 1,

  setPage: (page) => set({ currentPage: page }),

  setFilters: (filters) => set({ filters, trucks: { total: 0, items: [] }, currentPage: 1 }),

  fetchFirstPage: async () => {
  try {
    set({ loading: true });
    const { filters } = get();

    const query = new URLSearchParams({ ...filters, page: "1", limit: String(LIMIT) });
    const res = await fetch(`/api/campers?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data: CamperBody = await res.json();
    set({ trucks: data, currentPage: 1, loading: false });
  } catch (e: unknown) {
    toast.error("No results")
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("Error fetching first page:", message);
    set({ trucks: { total: 0, items: [] }, currentPage: 0, loading: false });
  }
},

fetchNextPage: async () => {
  try {
    set({ loading: true });
    const { currentPage = 1, filters, trucks } = get();
    const nextPage = currentPage + 1;

    const query = new URLSearchParams({ ...filters, page: String(nextPage), limit: String(LIMIT) });
    const res = await fetch(`/api/campers?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data: CamperBody = await res.json();
    set({
      trucks: {
        total: data.total,
        items: [...trucks.items, ...(Array.isArray(data.items) ? data.items : [])],
      },
      currentPage: nextPage,
      loading: false,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("Error fetching next page:", message);
    set({ loading: false });
  }
}
}));