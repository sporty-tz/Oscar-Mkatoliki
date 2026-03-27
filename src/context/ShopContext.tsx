import { useCallback, useEffect, useMemo, useState } from "react";
import { ShopContext, STORAGE_KEY, readInitialState } from "./ShopStore";
import type { CartItem, ShopContextValue, ShopProduct } from "./ShopStore";

function upsertUnique(
  items: ShopProduct[],
  product: ShopProduct,
): ShopProduct[] {
  if (items.some((item) => item.id === product.id)) {
    return items;
  }

  return [...items, product];
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    () => readInitialState().cartItems,
  );
  const [wishlistItems, setWishlistItems] = useState<ShopProduct[]>(
    () => readInitialState().wishlistItems,
  );
  const [compareItems, setCompareItems] = useState<ShopProduct[]>(
    () => readInitialState().compareItems,
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cartItems, wishlistItems, compareItems }),
    );
  }, [cartItems, wishlistItems, compareItems]);

  const addToCart = useCallback((product: ShopProduct, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, qty: Math.max(1, qty) }];
      }

      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + Math.max(1, qty) };
      return next;
    });
  }, []);

  const setCartQuantity = useCallback(
    (productId: number | string, qty: number) => {
      setCartItems((prev) => {
        if (qty <= 0) {
          return prev.filter((item) => item.id !== productId);
        }

        return prev.map((item) =>
          item.id === productId ? { ...item, qty } : item,
        );
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: ShopProduct) => {
    setWishlistItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : upsertUnique(prev, product),
    );
  }, []);

  const removeFromWishlist = useCallback((productId: number | string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const toggleCompare = useCallback((product: ShopProduct) => {
    setCompareItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : upsertUnique(prev, product),
    );
  }, []);

  const removeFromCompare = useCallback((productId: number | string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: number | string) =>
      wishlistItems.some((item) => item.id === productId),
    [wishlistItems],
  );

  const isInCompare = useCallback(
    (productId: number | string) =>
      compareItems.some((item) => item.id === productId),
    [compareItems],
  );

  const getCartQty = useCallback(
    (productId: number | string) =>
      cartItems.find((item) => item.id === productId)?.qty ?? 0,
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cartItems,
      wishlistItems,
      compareItems,
      cartCount,
      wishlistCount: wishlistItems.length,
      compareCount: compareItems.length,
      cartTotal,
      addToCart,
      setCartQuantity,
      removeFromCart,
      toggleWishlist,
      removeFromWishlist,
      toggleCompare,
      removeFromCompare,
      isInWishlist,
      isInCompare,
      getCartQty,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      compareItems,
      getCartQty,
      isInCompare,
      isInWishlist,
      removeFromCart,
      removeFromCompare,
      removeFromWishlist,
      setCartQuantity,
      toggleCompare,
      toggleWishlist,
      wishlistItems,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
