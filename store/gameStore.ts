import { create } from "zustand";

interface GameState {
  slug: string | null;
  token: string | null;
  username: string | null;
  setGameDetails: (data: {
    slug?: string | null;
    token?: string | null;
    username?: string | null;
  }) => void;
}

export const useGameStore = create<GameState>((set) => ({
  slug: null,
  token: null,
  username: null,
  setGameDetails: (data) => set((state) => ({ ...state, ...data })),
}));
