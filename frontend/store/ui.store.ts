import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isLoading: false,
  activeModal: null,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
