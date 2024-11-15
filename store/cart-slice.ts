import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { Product } from '@/types/prisma-data-types';
import { CartItem } from '@/types/cart/cart-type';


interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  increaseQuantity: (productId: number, variantId?: number, stockId?: number) => void;
  decreaseQuantity: (productId: number, variantId?: number,  stockId?: number) => void;
  removeFromCart: (productId: number, variantId?: number,  stockId?: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => 
          item.id === product.id && 
          item.variantId === product.variantId && 
          item.stockId === product.stockId
        );

        let newCart;
        if (existingItem) {
          // If the item already exists in the cart, increase the quantity
          newCart = state.cart.map(item =>
            item.id === product.id && 
            item.variantId === product.variantId && 
            item.stockId === product.stockId
              ? { ...item, quantity: item.quantity + product.quantity } 
              : item
          );
        } else {
          newCart = [...state.cart, { ...product, quantity: product.quantity }];
        }
        toast('Added to Your Cart!');
        return { cart: newCart };
      }),
      increaseQuantity: (productId, variantId, stockId) => set((state) => {
        const newCart = state.cart.map(item =>
          item.id === productId && 
          item.variantId === variantId && 
          item.stockId === stockId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        return { cart: newCart };
      }),
      decreaseQuantity: (productId, variantId, stockId) => set((state) => {
        const existingItem = state.cart.find(item => 
          item.id === productId && 
          item.variantId === variantId && 
          item.stockId === stockId
        );

        if (existingItem && existingItem.quantity > 1) {
          const newCart = state.cart.map(item =>
            item.id === productId && 
            item.variantId === variantId && 
            item.stockId === stockId 
              ? { ...item, quantity: item.quantity - 1 } 
              : item
          );
          return { cart: newCart };
        }
        return state; // No change if quantity is 1 or item doesn't exist
      }),
      removeFromCart: (productId, variantId, stockId) => set((state) => ({
        cart: state.cart.filter(item => 
          !(item.id === productId && item.variantId === variantId && item.stockId === stockId)
        ),
      })),
      clearCart: () => set({ cart: [] }),
      getSubtotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  )
);

export default useCartStore;
