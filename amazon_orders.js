import { formatCurrency, getCartItems, getOrders, updateCartCount } from "./amazonLibrary.js";

document.addEventListener("DOMContentLoaded", () => {
  const ordersContainer = document.querySelector("#orders-list");
  const cartCountBadge = document.querySelector(".cart-count-badge");

  const renderOrders = () => {
    if (!ordersContainer) {
      return;
    }

    const orders = getOrders();

    if (!orders.length) {
      ordersContainer.innerHTML = '<div class="empty-orders">You have no orders yet. Place one from the checkout page to see it here.</div>';
      return;
    }

    ordersContainer.innerHTML = orders.map((order) => `
      <div class="order-item">
        <div class="order-top">
          <div>
            <div class="order-title">${order.id}</div>
            <div class="order-meta">Placed on ${order.date}</div>
          </div>
          <div class="order-status">${order.status}</div>
        </div>
        <div class="order-products">
          ${order.items.map((item) => `
            <div class="order-product">
              <span>${item.name} × ${item.quantity}</span>
              <strong>${formatCurrency(item.price)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  };

  renderOrders();
  updateCartCount(cartCountBadge);
});
