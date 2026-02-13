// Sistema de carrito client-side con localStorage
// Importable desde <script> tags

import type { UnifiedProduct, CartItem, CartState } from './unified-types';

const CART_KEY = 'valdeferrin_cart';
const CART_EVENT = 'cart:updated';

function loadCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: getCartState() }));
}

export function getCartState(): CartState {
  const items = loadCart();
  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => {
      return sum + (item.product.price || 0) * item.quantity;
    }, 0),
  };
}

export function addToCart(product: UnifiedProduct, quantity: number = 1): void {
  const items = loadCart();
  const existing = items.find(item => item.product.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ product, quantity });
  }

  saveCart(items);
}

export function updateQuantity(productId: string, quantity: number): void {
  let items = loadCart();
  if (quantity <= 0) {
    items = items.filter(item => item.product.id !== productId);
  } else {
    const item = items.find(item => item.product.id === productId);
    if (item) item.quantity = quantity;
  }
  saveCart(items);
}

export function removeFromCart(productId: string): void {
  const items = loadCart().filter(item => item.product.id !== productId);
  saveCart(items);
}

export function clearCart(): void {
  saveCart([]);
}

// Sincronizar entre pestanas
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) {
      window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: getCartState() }));
    }
  });
}
