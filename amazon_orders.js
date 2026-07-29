document.addEventListener("DOMContentLoaded", () => {
  const ordersContainer = document.querySelector("#orders-list");
  const cartCountBadge = document.querySelector(".cart-count-badge");

  const getCartItems = () => {
    try {
      return JSON.parse(localStorage.getItem("amazonCartItems")) || [];
    } catch (error) {
      return [];
    }
  };

  const updateCartCount = () => {
    const totalItems = getCartItems().reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalItems;
    }
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  const renderOrders = () => {
    if (!ordersContainer) {
      return;
    }

    const orders = JSON.parse(localStorage.getItem("amazonOrders") || "[]") || [];

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
  updateCartCount();
});
