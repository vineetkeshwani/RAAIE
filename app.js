// Global App Logic for Raaie E-commerce Clone

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Cart Management (Persistent using LocalStorage) ---
  const Cart = {
    items: JSON.parse(localStorage.getItem("raaie_cart")) || [],

    save() {
      localStorage.setItem("raaie_cart", JSON.stringify(this.items));
      this.updateUI();
    },

    add(productId, quantity = 1) {
      const product = ProductService.getById(productId);
      if (!product) return;

      const existingItem = this.items.find(item => item.id === parseInt(productId));
      if (existingItem) {
        existingItem.quantity += parseInt(quantity);
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.images[0],
          quantity: parseInt(quantity)
        });
      }
      this.save();
      this.openDrawer();
    },

    remove(productId) {
      this.items = this.items.filter(item => item.id !== parseInt(productId));
      this.save();
    },

    updateQuantity(productId, delta) {
      const item = this.items.find(item => item.id === parseInt(productId));
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        this.remove(productId);
      } else {
        this.save();
      }
    },

    getCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getSubtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    openDrawer() {
      const drawer = document.getElementById("cart-drawer");
      const overlay = document.getElementById("cart-drawer-overlay");
      if (drawer && overlay) {
        drawer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
      }
    },

    closeDrawer() {
      const drawer = document.getElementById("cart-drawer");
      const overlay = document.getElementById("cart-drawer-overlay");
      if (drawer && overlay) {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    },

    updateUI() {
      // Update header indicator
      const indicators = [document.getElementById("cart-indicator"), document.getElementById("cart-drawer-count")];
      const count = this.getCount();
      indicators.forEach(ind => {
        if (ind) ind.textContent = count;
      });

      // Render items list
      const itemsContainer = document.getElementById("cart-items-container");
      const footerElement = document.getElementById("cart-drawer-footer");
      const emptyMsg = document.getElementById("cart-empty-message");

      if (!itemsContainer) return;

      // Remove existing cart item elements
      const itemCards = itemsContainer.querySelectorAll(".cart-item");
      itemCards.forEach(card => card.remove());

      if (this.items.length === 0) {
        if (emptyMsg) emptyMsg.style.display = "block";
        if (footerElement) footerElement.style.display = "none";
      } else {
        if (emptyMsg) emptyMsg.style.display = "none";
        if (footerElement) footerElement.style.display = "block";

        // Render each item
        this.items.forEach(item => {
          const itemEl = document.createElement("div");
          itemEl.className = "cart-item";
          itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <span class="cart-item-category">${item.category}</span>
              <h4 class="cart-item-title"><a href="product.html?id=${item.id}">${item.name}</a></h4>
              <div class="cart-item-controls">
                <div class="quantity-picker">
                  <button class="cart-qty-minus" data-id="${item.id}">-</button>
                  <span>${item.quantity}</span>
                  <button class="cart-qty-plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
              </div>
            </div>
            <span class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          `;
          itemsContainer.appendChild(itemEl);
        });

        // Update Subtotal
        const subtotalVal = document.getElementById("cart-subtotal-value");
        if (subtotalVal) {
          subtotalVal.textContent = `₹${this.getSubtotal().toLocaleString('en-IN')}`;
        }
      }
    }
  };

  // Assign to global namespace so product.html scripts can access it
  window.RaaieCart = Cart;

  // Initialize UI State
  Cart.updateUI();

  // Bind Cart Drawer Toggles
  const openCartBtn = document.getElementById("cart-drawer-open-btn");
  const closeCartBtn = document.getElementById("cart-drawer-close-btn");
  const cartOverlay = document.getElementById("cart-drawer-overlay");

  if (openCartBtn) openCartBtn.addEventListener("click", () => Cart.openDrawer());
  if (closeCartBtn) closeCartBtn.addEventListener("click", () => Cart.closeDrawer());
  if (cartOverlay) cartOverlay.addEventListener("click", () => Cart.closeDrawer());

  // Dynamic Event Delegation for Cart Quantity & Remove Controls inside drawer
  const drawerItemsWrap = document.getElementById("cart-items-container");
  if (drawerItemsWrap) {
    drawerItemsWrap.addEventListener("click", (e) => {
      const target = e.target;
      const id = target.getAttribute("data-id");
      if (!id) return;

      if (target.classList.contains("cart-qty-minus")) {
        Cart.updateQuantity(id, -1);
      } else if (target.classList.contains("cart-qty-plus")) {
        Cart.updateQuantity(id, 1);
      } else if (target.classList.contains("remove-item-btn")) {
        Cart.remove(id);
      }
    });
  }

  // Bind Quick Add triggers across homepage cards
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".quick-add-trigger");
    if (btn) {
      e.preventDefault();
      const productId = btn.getAttribute("data-product-id");
      Cart.add(productId, 1);
    }
  });


  // --- 2. Header Scroll Effect ---
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // --- 3. Mobile Navigation Sidebar ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileOverlay = document.getElementById("mobile-nav-overlay");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");

  function openMobileMenu() {
    mobileDrawer.classList.add("active");
    mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  // Close menu on link click
  const mobileNavLinks = mobileDrawer ? mobileDrawer.querySelectorAll("a") : [];
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });


  // --- 4. Search Modal Mechanics ---
  const openSearchBtn = document.getElementById("search-open-btn");
  const closeSearchBtn = document.getElementById("search-close-btn");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");

  if (openSearchBtn && searchModal) {
    openSearchBtn.addEventListener("click", () => {
      searchModal.classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });
  }

  if (closeSearchBtn && searchModal) {
    closeSearchBtn.addEventListener("click", () => {
      searchModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Handle suggestion link clicks
  const suggestionLinks = document.querySelectorAll(".suggestion-link");
  suggestionLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const term = link.textContent.trim();
      if (searchInput) {
        searchInput.value = term;
        // Simple search query simulation
        alert(`Searching Raaie catalog for: "${term}"`);
        searchModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Handle Search Input submit (Enter Key)
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          alert(`Searching Raaie catalog for: "${query}"`);
          searchModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  }


  // --- 5. Customer Reviews Carousel Auto-Scroll ---
  const reviewSlides = document.querySelectorAll(".review-slide");
  let currentReviewIndex = 0;

  if (reviewSlides.length > 1) {
    setInterval(() => {
      reviewSlides[currentReviewIndex].classList.remove("active");
      reviewSlides[currentReviewIndex].style.display = "none";
      
      currentReviewIndex = (currentReviewIndex + 1) % reviewSlides.length;
      
      reviewSlides[currentReviewIndex].style.display = "block";
      // Force repaint
      reviewSlides[currentReviewIndex].offsetHeight; 
      reviewSlides[currentReviewIndex].classList.add("active");
    }, 6000); // Transition reviews every 6s
    
    // Hide non-active review slides initially
    reviewSlides.forEach((slide, idx) => {
      if (idx !== 0) {
        slide.style.display = "none";
        slide.classList.remove("active");
      }
    });
  }
});
