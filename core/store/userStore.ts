import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  token: string | null;
  name: string | null;
  email: string | null;
  setUser: (user: { token: string; name: string; email: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      setUser: (user) => set(user),
      clearUser: () => set({ token: null, name: null, email: null }),
    }),
    {
      name: "user-storage", // Nombre del almacenamiento persistente
    }
  )
);
