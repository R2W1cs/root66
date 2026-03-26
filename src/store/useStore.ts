import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string;
};

type StoreState = {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useStore = create<StoreState>((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id && i.customization === item.customization);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id && i.customization === item.customization
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
          isCartOpen: true,
        };
      }
      return { cart: [...state.cart, item], isCartOpen: true };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
