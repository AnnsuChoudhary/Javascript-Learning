document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");
  const backToTopButton = document.querySelector(".foot-pannel1");
  const heroLink = document.querySelector(".hero-message a");
  const boxCards = document.querySelectorAll(".box");
  const copyrightText = document.querySelector(".copyright");
  const cartCountBadge = document.querySelector(".cart-count-badge");
  const menuToggle = document.querySelector("#menu-toggle");
  const sidebar = document.querySelector("#sidebar-menu");
  const sidebarOverlay = document.querySelector("#sidebar-overlay");
  const closeSidebarButton = document.querySelector("#close-sidebar");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartStorageKey = "amazonCartItems";

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

  const addItemToCart = (product) => {
    const cartItems = getCartItems();
    const existingItem = cartItems.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    saveCartItems(cartItems);
    updateCartCount();
  };

  const openAmazonSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      searchInput.focus();
      return;
    }
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(trimmed)}`;
    window.open(url, "_blank", "noopener");
  };

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", () => {
      openAmazonSearch(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        openAmazonSearch(searchInput.value);
      }
    });
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (heroLink) {
    heroLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.open("https://www.amazon.in/", "_blank", "noopener");
    });
  }

  if (boxCards.length) {
    boxCards.forEach((box) => {
      const label = box.querySelector("h2")?.textContent || "shopping";
      box.style.cursor = "pointer";
      box.addEventListener("click", () => {
        openAmazonSearch(label);
      });
    });
  }

  if (addToCartButtons.length) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addItemToCart({
          name: button.dataset.name,
          price: Number(button.dataset.price),
          image: button.dataset.image,
        });
        button.textContent = "Added to cart";
        setTimeout(() => {
          button.textContent = "Add to cart";
        }, 1200);
      });
    });
  }

  const toggleSidebar = () => {
    sidebar?.classList.toggle("open");
    sidebarOverlay?.classList.toggle("show");
  };

  menuToggle?.addEventListener("click", toggleSidebar);
  closeSidebarButton?.addEventListener("click", toggleSidebar);
  sidebarOverlay?.addEventListener("click", toggleSidebar);

  updateCartCount();

  if (copyrightText) {
    const currentYear = new Date().getFullYear();
    copyrightText.textContent = `© 1996-${currentYear}, Amazon.com, Inc. or its affiliates`;
  }
});
