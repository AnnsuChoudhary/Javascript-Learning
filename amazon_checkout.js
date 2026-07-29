document.addEventListener("DOMContentLoaded", () => {
  const cartStorageKey = "amazonCartItems";
  const checkoutItemsContainer = document.querySelector("#checkout-items");
  const summaryItemsTotal = document.querySelector("#summary-items-total");
  const summaryShipping = document.querySelector("#summary-shipping");
  const summaryTax = document.querySelector("#summary-tax");
  const summaryTotal = document.querySelector("#summary-total");
  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutMessage = document.querySelector("#checkout-message");
  const cartCountBadge = document.querySelector(".cart-count-badge");

  const getCartItems = () => {
    try {
      return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
    } catch (error) {
      return [];
    }
  };

  const saveCartItems = (items) => {
    localStorage.setItem(cartStorageKey, JSON.stringify(items));
  };

  const updateCartCount = () => {
    const totalItems = getCartItems().reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalItems;
    }
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  const renderSummary = () => {
    const cartItems = getCartItems();

    if (!checkoutItemsContainer) {
      return;
    }

    if (!cartItems.length) {
      checkoutItemsContainer.innerHTML = '<div class="empty-checkout">Your cart is empty. Add something before checking out.</div>';
      if (summaryItemsTotal) summaryItemsTotal.textContent = formatCurrency(0);
      if (summaryShipping) summaryShipping.textContent = formatCurrency(0);
      if (summaryTax) summaryTax.textContent = formatCurrency(0);
      if (summaryTotal) summaryTotal.textContent = formatCurrency(0);
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    checkoutItemsContainer.innerHTML = cartItems.map((item) => `
      <div class="checkout-item">
        <div class="checkout-item-image" style="background-image: url('${item.image}')"></div>
        <div class="checkout-item-details">
          <h3>${item.name}</h3>
          <p>Qty: ${item.quantity}</p>
          <p class="checkout-item-price">${formatCurrency(item.price * item.quantity)}</p>
        </div>
      </div>
    `).join("");

    if (summaryItemsTotal) summaryItemsTotal.textContent = formatCurrency(subtotal);
    if (summaryShipping) summaryShipping.textContent = formatCurrency(shipping);
    if (summaryTax) summaryTax.textContent = formatCurrency(tax);
    if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
  };

  checkoutForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (checkoutMessage) {
      checkoutMessage.innerHTML = '<p class="success-message">🎉 Order placed successfully. Your package is on the way.</p>';
    }

    const orderRecord = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: "Delivered",
      items: getCartItems().map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
    };

    const orders = JSON.parse(localStorage.getItem("amazonOrders") || "[]") || [];
    orders.unshift(orderRecord);
    localStorage.setItem("amazonOrders", JSON.stringify(orders));

    saveCartItems([]);
    updateCartCount();
    renderSummary();
    checkoutForm.reset();
  });

  renderSummary();
  updateCartCount();
});
