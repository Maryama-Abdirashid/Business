// Theme toggle icons
const sunIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
`;

const moonIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon">
    <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 1011 21a9 9 0 0010-8.21z"></path>
  </svg>
`;

const themeToggle = document.getElementById('theme-toggle');

function updateThemeIcon() {
  if (document.body.classList.contains('dark-theme')) {
    themeToggle.innerHTML = sunIcon;
  } else {
    themeToggle.innerHTML = moonIcon;
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  updateThemeIcon();
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  updateThemeIcon();
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

initTheme();

// Products array
const products = [
  { id: 1, name: "Set", price: 5.00, image: "images/img1.jpg" },
  { id: 2, name: " Set + watch", price: 7.00, image: "images/img2.jpg" },
  { id: 3, name: " Set of silver", price: 4.00, image: "images/img3.jpg" },
  { id: 4, name: "Necklaces", price: 1.00, image: "images/img4.jpg" },
  { id: 5, name: "Set + watch", price: 7.00, image: "images/img5.jpg" },
  { id: 6, name: "Bracelets", price: 1.00, image: "images/img6.jpg" },
  { id: 7, name: "Rings", price: 0.50, image: "images/img7.jpg" },
  { id: 8, name: "Pins", price: 2.00, image: "images/img8.jpg" },
  { id: 9, name: "Set", price: 5.00, image: "images/img9.jpg" },
  { id: 10, name: "Bracelets + watch", price: 6.00, image: "images/img10.jpg" },
  { id: 11, name: "Glassess", price: 3.00, image: "images/img11.jpg" },
  { id: 12, name: "Necklaces", price: 1.00, image: "images/img12.jpg" },
 
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countSpan = document.getElementById('cart-count');
  if (countSpan) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.textContent = totalQty;
  }
}

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;

    container.appendChild(card);
  });

  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const cartItem = cart.find(item => item.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ id: id, quantity: 1 });
  }

  saveCart();
  window.location.href = "cart.html";
}

function renderCart() {
  const container = document.getElementById('cart-container');
  const totalPriceEl = document.getElementById('total-price');
  const orderBtn = document.getElementById('whatsapp-order-btn');

  if (!container || !totalPriceEl || !orderBtn) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceEl.textContent = '0';
    orderBtn.disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    total += product.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${product.name}</p>
        <p class="cart-item-price">$${product.price.toFixed(2)}</p>
        <div class="cart-item-qty">
          Quantity: 
          <button class="qty-btn decrease" data-id="${item.id}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;

    container.appendChild(cartItem);
  });

  totalPriceEl.textContent = total.toFixed(2);
  orderBtn.disabled = false;

  const removeButtons = container.querySelectorAll('.remove-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      removeFromCart(id);
    });
  });

  const increaseButtons = container.querySelectorAll('.qty-btn.increase');
  increaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      changeQuantity(id, +1);
    });
  });

  const decreaseButtons = container.querySelectorAll('.qty-btn.decrease');
  decreaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      changeQuantity(id, -1);
    });
  });
}

function changeQuantity(id, delta) {
  const cartItem = cart.find(item => item.id === id);
  if (!cartItem) return;

  const newQty = cartItem.quantity + delta;

  if (newQty <= 0) {
    cart = cart.filter(item => item.id !== id);
  } else {
    cartItem.quantity = newQty;
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function sendOrderViaWhatsApp() {
  if (cart.length === 0) return;

  let message = "Hello, I'd like to order the following items:%0A";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    message += `- ${product.name} x${item.quantity} ($${(product.price * item.quantity).toFixed(2)})%0A`;
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  message += `%0ATotal: $${total.toFixed(2)}`;

  const phoneNumber = "252683716189"; 
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappUrl, "_blank");
}

function init() {
  updateCartCount();

  if (window.isHomePage) {
    renderProducts();
  }

  if (window.isCartPage) {
    renderCart();

    const orderBtn = document.getElementById('whatsapp-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', sendOrderViaWhatsApp);
    }
  }
}

init();
