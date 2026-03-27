import { createContext } from "react";

export interface ShopProduct {
  id: number | string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  unit?: string;
}

export interface CartItem extends ShopProduct {
  qty: number;
}

export interface ShopContextValue {
  cartItems: CartItem[];
  wishlistItems: ShopProduct[];
  compareItems: ShopProduct[];
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  cartTotal: number;
  addToCart: (product: ShopProduct, qty?: number) => void;
  setCartQuantity: (productId: number | string, qty: number) => void;
  removeFromCart: (productId: number | string) => void;
  toggleWishlist: (product: ShopProduct) => void;
  removeFromWishlist: (productId: number | string) => void;
  toggleCompare: (product: ShopProduct) => void;
  removeFromCompare: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  isInCompare: (productId: number | string) => boolean;
  getCartQty: (productId: number | string) => number;
}

export const STORAGE_KEY = "oscar-shop-state-v1";

export const ShopContext = createContext<ShopContextValue | undefined>(
  undefined,
);

export function readInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        cartItems: [] as CartItem[],
        wishlistItems: [] as ShopProduct[],
        compareItems: [] as ShopProduct[],
      };
    }

    const parsed = JSON.parse(raw) as {
      cartItems?: CartItem[];
      wishlistItems?: ShopProduct[];
      compareItems?: ShopProduct[];
    };

    return {
      cartItems: parsed.cartItems ?? [],
      wishlistItems: parsed.wishlistItems ?? [],
      compareItems: parsed.compareItems ?? [],
    };
  } catch {
    return {
      cartItems: [] as CartItem[],
      wishlistItems: [] as ShopProduct[],
      compareItems: [] as ShopProduct[],
    };
  }
}
