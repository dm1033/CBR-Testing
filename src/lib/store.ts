import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedTest } from "./types";

type Store = {
  tests: SavedTest[];
  save: (t: SavedTest) => void;
  remove: (id: string) => void;
};

export const useTests = create<Store>()(
  persist(
    (set) => ({
      tests: [],
      save: (t) =>
        set((s) => ({
          tests: [t, ...s.tests.filter((x) => x.id !== t.id)].slice(0, 40),
        })),
      remove: (id) => set((s) => ({ tests: s.tests.filter((x) => x.id !== id) })),
    }),
    { name: "groundcheck-rpv" },
  ),
);
