export const CART_STORAGE_KEY = "amazonCartItems";
export const ORDERS_STORAGE_KEY = "amazonOrders";

export const getStoredItems = (storageKey, fallback = []) => {
  try {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch (error) {
    return fallback;
  }
};

export const saveStoredItems = (items, storageKey) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
};

export const getCartItems = () => getStoredItems(CART_STORAGE_KEY, []);
export const saveCartItems = (items) => saveStoredItems(items, CART_STORAGE_KEY);

export const getOrders = () => getStoredItems(ORDERS_STORAGE_KEY, []);
export const saveOrders = (orders) => saveStoredItems(orders, ORDERS_STORAGE_KEY);

export const updateCartCount = (cartCountBadge = null) => {
  const totalItems = getCartItems().reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountBadge) {
    cartCountBadge.textContent = totalItems;
  }

  return totalItems;
};

export const addItemToCart = (product, cartCountBadge = null) => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  saveCartItems(cartItems);
  updateCartCount(cartCountBadge);

  return cartItems;
};

export const formatCurrency = (value) => `$${value.toFixed(2)}`;
