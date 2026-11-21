

const products = [
  { id: 1, name: "Relaxed Linen Shirt", price: 899, category: "Men", occasion: "Casual", color: "Beige", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85", tag: "BESTSELLER" },
  { id: 2, name: "Everyday Cotton Tee", price: 399, category: "Men", occasion: "Casual", color: "White", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85", tag: "NEW" },
  { id: 3, name: "Soft Blue Shirt", price: 749, category: "Women", occasion: "Summer", color: "Blue", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=85", tag: "NEW" },
  { id: 4, name: "Floral Summer Dress", price: 1299, category: "Women", occasion: "Summer", color: "Green", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=85", tag: "POPULAR" },
  { id: 5, name: "Classic Black Top", price: 599, category: "Women", occasion: "Party", color: "Black", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85", tag: "" },
  { id: 6, name: "Weekend Denim Jacket", price: 1599, category: "Men", occasion: "Casual", color: "Blue", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=85", tag: "POPULAR" },
  { id: 7, name: "Minimal Shoulder Bag", price: 1099, category: "Accessories", occasion: "Party", color: "Beige", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85", tag: "NEW" },
  { id: 8, name: "Everyday Sunglasses", price: 499, category: "Accessories", occasion: "Summer", color: "Black", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85", tag: "" },
  { id: 9, name: "Tailored Beige Trousers", price: 1199, category: "Women", occasion: "Formal", color: "Beige", image: "https://images.unsplash.com/photo-1506629905607-d9c297d6f8d8?auto=format&fit=crop&w=800&q=85", tag: "" },
  { id: 10, name: "Forest Green Polo", price: 699, category: "Men", occasion: "Casual", color: "Green", image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=800&q=85", tag: "" },
  { id: 11, name: "White Occasion Shirt", price: 999, category: "Men", occasion: "Formal", color: "White", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85", tag: "POPULAR" },
  { id: 12, name: "Gold Tone Earrings", price: 299, category: "Accessories", occasion: "Party", color: "Beige", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85", tag: "" }
];

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

function createProductCard(product) {
  return `
    <article class="product-card">
      <a class="product-image" href="collections.html" aria-label="View ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
          onerror="this.src='https://placehold.co/600x750/F1EEE8/252525?text=V%C3%89LORA'">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      </a>
      <div class="product-info">
        <div><p class="product-category">${product.category} · ${product.color}</p><h3>${product.name}</h3></div>
        <strong>${formatPrice(product.price)}</strong>
      </div>
    </article>`;
}

// Mobile navigation
document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const nav = button.parentElement.querySelector(".main-nav");
    const isOpen = nav.classList.toggle("nav-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    button.textContent = isOpen ? "✕" : "☰";
  });
});

// Home page: show four selected products
const homeProducts = document.getElementById("homeProducts");
if (homeProducts) {
  homeProducts.innerHTML = products.slice(0, 4).map(createProductCard).join("");
}

// Collections page: search + combined filters + sorting
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const sortSelect = document.getElementById("sortSelect");
  const filterInputs = document.querySelectorAll(".filter-sidebar input");

  function getCheckedValues(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
  }

  function matchesPrice(price, range) {
    if (range === "under500") return price < 500;
    if (range === "500to1000") return price >= 500 && price <= 1000;
    if (range === "above1000") return price > 1000;
    return true;
  }

  function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const categories = getCheckedValues("category");
    const occasions = getCheckedValues("occasion");
    const colors = getCheckedValues("color");
    const priceRange = document.querySelector('input[name="price"]:checked')?.value || "all";

    let filteredProducts = products.filter((product) => {
      const searchableText = `${product.name} ${product.category} ${product.occasion} ${product.color}`.toLowerCase();
      const matchesSearch = searchableText.includes(searchTerm);
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      const matchesOccasion = occasions.length === 0 || occasions.includes(product.occasion);
      const matchesColor = colors.length === 0 || colors.includes(product.color);
      const matchesPriceRange = matchesPrice(product.price, priceRange);

      return matchesSearch && matchesCategory && matchesOccasion && matchesColor && matchesPriceRange;
    });

    switch (sortSelect.value) {
      case "low": filteredProducts.sort((a, b) => a.price - b.price); break;
      case "high": filteredProducts.sort((a, b) => b.price - a.price); break;
      case "az": filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: filteredProducts.sort((a, b) => a.id - b.id);
    }

    resultCount.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} found`;
    productGrid.innerHTML = filteredProducts.map(createProductCard).join("");
    emptyState.hidden = filteredProducts.length !== 0;
    productGrid.hidden = filteredProducts.length === 0;
  }

  function clearFilters() {
    searchInput.value = "";
    filterInputs.forEach((input) => {
      if (input.type === "checkbox") input.checked = false;
      if (input.type === "radio") input.checked = input.value === "all";
    });
    sortSelect.value = "featured";
    renderProducts();
  }

  searchInput.addEventListener("input", renderProducts);
  filterInputs.forEach((input) => input.addEventListener("change", renderProducts));
  sortSelect.addEventListener("change", renderProducts);
  document.getElementById("clearFilters").addEventListener("click", clearFilters);
  document.getElementById("emptyClear").addEventListener("click", clearFilters);

  // Optional category links from the home page, e.g. collections.html?category=Women
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  if (requestedCategory) {
    const categoryInput = document.querySelector(`input[name="category"][value="${requestedCategory}"]`);
    if (categoryInput) categoryInput.checked = true;
  }
  renderProducts();
}

// Newsletter demo form
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    document.getElementById("newsletterMessage").textContent = `Thanks for subscribing, ${email}!`;
    newsletterForm.reset();
  });
}

// Contact form: client-side validation only; no backend/email delivery
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.getElementById("contactName").value.trim();
    document.getElementById("contactMessageStatus").textContent =
      `Thank you, ${name}! Your message has been recorded in this demo.`;
    contactForm.reset();
  });
}
