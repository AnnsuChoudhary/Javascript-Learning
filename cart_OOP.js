import { getCartItems, saveCartItems, updateCartCount } from "./amazonLibrary.js";

const cart = {
  cartItemsContainer: null,
  cartItemCount: null,
  cartSubtotal: null,
  cartCountBadge: null,

  init() {
    this.cartItemsContainer = document.querySelector("#cart-items-container");
    this.cartItemCount = document.querySelector("#cart-item-count");
    this.cartSubtotal = document.querySelector("#subtotal-price");
    this.cartCountBadge = document.querySelector(".cart-count-badge");

    this.renderCartPage();
  },

  changeItemQuantity(name, action) {
    const cartItems = getCartItems();
    const existingItem = cartItems.find((item) => item.name === name);

    if (!existingItem) {
      return;
    }

    if (action === "increase") {
      existingItem.quantity += 1;
    } else if (action === "decrease") {
      existingItem.quantity -= 1;
      if (existingItem.quantity <= 0) {
        const filteredItems = cartItems.filter((item) => item.name !== name);
        saveCartItems(filteredItems);
        updateCartCount(this.cartCountBadge);
        this.renderCartPage();
        return;
      }
    }

    saveCartItems(cartItems);
    updateCartCount(this.cartCountBadge);
    this.renderCartPage();
  },

  removeItem(name) {
    const cartItemsAfterRemove = getCartItems().filter((item) => item.name !== name);
    saveCartItems(cartItemsAfterRemove);
    updateCartCount(this.cartCountBadge);
    this.renderCartPage();
  },

  renderCartPage() {
    if (!this.cartItemsContainer) {
      return;
    }

    const cartItems = getCartItems();
    if (!cartItems.length) {
      this.cartItemsContainer.innerHTML = '<div class="empty-cart">Your Amazon cart is empty. <a href="amazon.html">Continue shopping</a></div>';
      if (this.cartItemCount) {
        this.cartItemCount.textContent = "0";
      }
      if (this.cartSubtotal) {
        this.cartSubtotal.textContent = "$0.00";
      }
      updateCartCount(this.cartCountBadge);
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    this.cartItemsContainer.innerHTML = cartItems.map((item) => `
      <div class="cart-item">
        <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
          <p class="cart-item-meta">In stock · Free delivery</p>
          <div class="cart-actions">
            <button class="qty-btn" data-action="decrease" data-name="${item.name}">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-name="${item.name}">+</button>
            <button class="remove-btn" data-name="${item.name}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    if (this.cartItemCount) {
      this.cartItemCount.textContent = totalItems;
    }

    if (this.cartSubtotal) {
      this.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    document.querySelectorAll(".qty-btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.changeItemQuantity(button.dataset.name, button.dataset.action);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeItem(button.dataset.name);
      });
    });

    updateCartCount(this.cartCountBadge);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  cart.init();
});
