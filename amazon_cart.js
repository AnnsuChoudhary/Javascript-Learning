import { getCartItems, saveCartItems, updateCartCount } from "./amazonLibrary.js";

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector("#cart-items-container");
  const cartItemCount = document.querySelector("#cart-item-count");
  const cartSubtotal = document.querySelector("#subtotal-price");
  const cartCountBadge = document.querySelector(".cart-count-badge");

  const changeItemQuantity = (name, action) => {
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
        updateCartCount(cartCountBadge);
        renderCartPage();
        return;
      }
    }

    saveCartItems(cartItems);
    updateCartCount(cartCountBadge);
    renderCartPage();
  };

  const renderCartPage = () => {
    if (!cartItemsContainer) {
      return;
    }

    const cartItems = getCartItems();
    if (!cartItems.length) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your Amazon cart is empty. <a href="amazon.html">Continue shopping</a></div>';
      if (cartItemCount) {
        cartItemCount.textContent = "0";
      }
      if (cartSubtotal) {
        cartSubtotal.textContent = "$0.00";
      }
      updateCartCount(cartCountBadge);
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    cartItemsContainer.innerHTML = cartItems.map((item) => `
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

    if (cartItemCount) {
      cartItemCount.textContent = totalItems;
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    document.querySelectorAll(".qty-btn").forEach((button) => {
      button.addEventListener("click", () => {
        changeItemQuantity(button.dataset.name, button.dataset.action);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const cartItemsAfterRemove = getCartItems().filter((item) => item.name !== button.dataset.name);
        saveCartItems(cartItemsAfterRemove);
        updateCartCount(cartCountBadge);
        renderCartPage();
      });
    });

    updateCartCount(cartCountBadge);
  };

  renderCartPage();
});
