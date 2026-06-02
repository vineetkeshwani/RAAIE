// Product Page Logic for Raaie Saree Details

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Load Saree Data ---
  const urlParams = new URLSearchParams(window.location.search);
  let productId = parseInt(urlParams.get("id")) || 1;

  const product = ProductService.getById(productId);
  if (!product) {
    document.getElementById("product-title").textContent = "Saree Not Found";
    return;
  }

  // Populate textual fields
  document.getElementById("breadcrumb-category").textContent = product.category;
  document.getElementById("breadcrumb-title").textContent = product.name;
  document.getElementById("product-category-label").textContent = product.category;
  document.title = `${product.name} | Raaie Premium Sarees`;
  document.getElementById("product-title").textContent = product.name;

  // Rating details
  document.getElementById("product-rating-stars").textContent = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
  document.getElementById("product-rating-count").textContent = `(${product.reviewsCount} reviews)`;

  // Pricing details
  document.getElementById("product-price-current").textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById("product-price-original").textContent = `₹${product.compareAtPrice.toLocaleString('en-IN')}`;
  
  const discountPercent = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  document.getElementById("product-price-discount").textContent = `${discountPercent}% OFF`;

  // Dynamic low stock details
  document.getElementById("stock-level-message").textContent = `Hurry! Only ${product.stock} items left in stock.`;
  const stockBar = document.getElementById("stock-bar-fill");
  if (stockBar) {
    // Arbitrary percentage calculation: e.g. stock level out of 10
    const percent = Math.min((product.stock / 10) * 100, 100);
    stockBar.style.width = `${percent}%`;
  }

  // Live social proof bought details
  document.getElementById("people-bought-display").textContent = `${product.peopleBought} people bought this today`;

  // Accordion descriptions
  document.getElementById("desc-text-box").innerHTML = `<p>${product.description}</p>`;
  document.getElementById("fabric-text-box").innerHTML = `<p>${product.fabric}</p>`;

  // --- 2. Gallery Setup (Thumbnails & Swapping) ---
  const thumbsContainer = document.getElementById("gallery-thumbnails-strip");
  const mainImage = document.getElementById("main-product-image");

  if (thumbsContainer && mainImage && product.images && product.images.length > 0) {
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    product.images.forEach((imgSrc, index) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${imgSrc}" alt="${product.name} Thumbnail ${index + 1}">`;
      
      thumb.addEventListener("click", () => {
        // Toggle active thumbnail styling
        thumbsContainer.querySelectorAll(".thumbnail-item").forEach(item => item.classList.remove("active"));
        thumb.classList.add("active");
        
        // Swap main image
        mainImage.style.opacity = "0.2";
        setTimeout(() => {
          mainImage.src = imgSrc;
          mainImage.style.opacity = "1";
        }, 150);
      });
      thumbsContainer.appendChild(thumb);
    });
  }

  // --- 3. Image Hover Magnification ---
  const viewer = document.getElementById("main-image-viewer");
  if (viewer && mainImage) {
    viewer.addEventListener("mousemove", (e) => {
      const rect = viewer.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      mainImage.style.transform = "scale(1.8)";
    });

    viewer.addEventListener("mouseleave", () => {
      mainImage.style.transform = "scale(1)";
      mainImage.style.transformOrigin = "center center";
    });
  }

  // --- 4. Quantity Controller Logic ---
  const qtyVal = document.getElementById("qty-value");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");

  let currentQty = 1;
  if (qtyMinus && qtyPlus && qtyVal) {
    qtyMinus.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    });

    qtyPlus.addEventListener("click", () => {
      currentQty++;
      qtyVal.textContent = currentQty;
    });
  }

  // Add to Bag CTA
  const addToBagBtn = document.getElementById("add-to-cart-action");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      if (window.RaaieCart) {
        window.RaaieCart.add(product.id, currentQty);
      }
    });
  }

  // Buy Now CTA
  const buyNowBtn = document.getElementById("buy-now-action");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      if (window.RaaieCart) {
        window.RaaieCart.add(product.id, currentQty);
        window.RaaieCart.openDrawer();
      }
    });
  }


  // --- 5. Accordion Tabs Mechanism ---
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const isActive = trigger.classList.contains("active");

      // Close all accordions
      accordionTriggers.forEach(t => {
        t.classList.remove("active");
        const c = document.getElementById(t.getAttribute("data-target"));
        if (c) c.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive && content) {
        trigger.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });


  // --- 6. Live Midnight Countdown Timer ---
  const timerDisplay = document.getElementById("timer-display");
  if (timerDisplay) {
    function updateCountdown() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Next midnight

      const diffMs = midnight - now;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      timerDisplay.textContent = `${hours}h ${mins}m ${secs}s`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  // --- 7. Frequently Bought Together (Bundle Logic) ---
  const fbtMainImg = document.getElementById("fbt-main-img");
  const fbtMainTitle = document.getElementById("fbt-main-title");
  const fbtMainPrice = document.getElementById("fbt-main-price");
  const fbtTotalVal = document.getElementById("fbt-total-price-display");
  const fbtAddons = document.querySelectorAll(".fbt-addon");
  const addBundleBtn = document.getElementById("fbt-add-bundle-btn");

  if (fbtMainImg && fbtMainTitle && fbtMainPrice && fbtTotalVal) {
    fbtMainImg.src = product.images[0];
    fbtMainTitle.textContent = product.name;
    fbtMainPrice.textContent = product.price.toLocaleString('en-IN');

    function calculateBundleTotal() {
      let sum = product.price;
      fbtAddons.forEach(addon => {
        if (addon.checked) {
          sum += parseInt(addon.getAttribute("data-price"));
        }
      });
      fbtTotalVal.textContent = `₹${sum.toLocaleString('en-IN')}`;
    }

    fbtAddons.forEach(addon => {
      addon.addEventListener("change", calculateBundleTotal);
    });

    calculateBundleTotal();

    // Bundle checkout handler
    if (addBundleBtn) {
      addBundleBtn.addEventListener("click", () => {
        if (!window.RaaieCart) return;

        // Add main saree
        window.RaaieCart.add(product.id, 1);

        // Add addons if checked
        fbtAddons.forEach(addon => {
          if (addon.checked) {
            const label = addon.nextElementSibling.textContent;
            // Simulate adding accessories to cart by custom ID (offset by 100/200)
            const idVal = addon.id === "fbt-cb-blouse" ? 901 : 902;
            const accessoryName = addon.id === "fbt-cb-blouse" ? "Designer Silk Blouse Piece" : "Handcrafted Gold Zari Waist Belt";
            const priceVal = parseInt(addon.getAttribute("data-price"));
            
            // Add custom item manually to RaaieCart
            const cartItems = window.RaaieCart.items;
            const existing = cartItems.find(item => item.id === idVal);
            if (existing) {
              existing.quantity += 1;
            } else {
              cartItems.push({
                id: idVal,
                name: accessoryName,
                category: "Accessories",
                price: priceVal,
                image: product.images[0],
                quantity: 1
              });
            }
          }
        });
        window.RaaieCart.save();
        window.RaaieCart.openDrawer();
      });
    }
  }


  // --- 8. Render Reviews Details ---
  const reviewsCol = document.getElementById("reviews-list-col");
  const reviewTotalDisplay = document.getElementById("breakdown-total");
  const breakdownAverage = document.getElementById("breakdown-average");

  if (reviewsCol && product.reviews) {
    reviewTotalDisplay.textContent = `Based on ${product.reviewsCount} reviews`;
    breakdownAverage.textContent = product.rating.toFixed(1);

    reviewsCol.innerHTML = ""; // Clear loader
    product.reviews.forEach(rev => {
      const card = document.createElement("div");
      card.className = "review-item-card";
      card.innerHTML = `
        <div class="review-item-header">
          <div class="review-item-user">
            <span class="review-item-name">${rev.author}</span>
            ${rev.verified ? `
              <span class="badge-verified">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Verified Purchase
              </span>
            ` : ""}
          </div>
          <span class="review-item-date">${rev.date}</span>
        </div>
        <div class="stars" style="margin-bottom:8px; font-size:1.3rem;">${"★".repeat(rev.rating) + "☆".repeat(5-rev.rating)}</div>
        <h4>${rev.title}</h4>
        <p>${rev.content}</p>
      `;
      reviewsCol.appendChild(card);
    });
  }


  // --- 9. Render Recommended Saree Feed ---
  const recGrid = document.getElementById("recommended-products-grid");
  if (recGrid) {
    recGrid.innerHTML = ""; // Clear loader
    const recommended = ProductService.getRecommended(product.id);

    recommended.forEach(item => {
      const discountVal = Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100);
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-card-image-wrap">
          <span class="badge badge-sale product-badge">${discountVal}% OFF</span>
          <button class="wishlist-btn" data-product-id="${item.id}" aria-label="Add to wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <a href="product.html?id=${item.id}">
            <img src="${item.images[0]}" alt="${item.name}" class="product-card-image" loading="lazy">
          </a>
          <div class="quick-add-overlay">
            <button class="btn btn-white btn-full quick-add-trigger" data-product-id="${item.id}">Quick Add To Cart</button>
          </div>
        </div>
        <div class="product-card-info">
          <span class="product-card-category">${item.category}</span>
          <h3 class="product-card-title"><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <div class="product-rating">
            <div class="stars">${"★".repeat(Math.round(item.rating)) + "☆".repeat(5-Math.round(item.rating))}</div>
            <span class="review-count">(${item.reviewsCount})</span>
          </div>
          <div class="product-card-price">
            <span class="price-current">₹${item.price.toLocaleString('en-IN')}</span>
            <span class="price-original">₹${item.compareAtPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      `;
      recGrid.appendChild(card);
    });
  }
});
