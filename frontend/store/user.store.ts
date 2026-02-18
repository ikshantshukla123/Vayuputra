import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  username: string;
  setUsername: (name: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
      reset: () => set({ username: "" }),
    }),
    { name: "vayuputra-user" }
  )
);
