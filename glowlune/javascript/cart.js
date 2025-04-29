document.addEventListener('DOMContentLoaded', () => {
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartCount = document.querySelector('.cart-count');
  const wishlistCount = document.querySelector('.wishlist-count');
  const continueShopping = document.querySelector('.continue-shopping');

  // Add event listener for cart updates from other pages
  window.addEventListener('cartUpdated', (e) => {
    cart = e.detail.cart;
    renderCart();
    updateCartCount();
    updateTotals();
  });

  // Add event listener for wishlist updates from other pages
  window.addEventListener('wishlistUpdated', (e) => {
    updateWishlistCount();
  });

  // Update cart count in header
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
  }

  // Update wishlist count in header
  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const count = wishlist.length;
    wishlistCount.textContent = count;
    wishlistCount.style.display = count > 0 ? 'flex' : 'none';
  }

  // Calculate and update totals
  function updateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    taxElement.textContent = `₹${tax.toFixed(2).toLocaleString('en-IN')}`;
    totalElement.textContent = `₹${total.toFixed(2).toLocaleString('en-IN')}`;
  }

  // Move item to wishlist
  function moveToWishlist(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if item already exists in wishlist
    const existingItemIndex = wishlist.findIndex(wishItem => wishItem.id === item.id);
    
    if (existingItemIndex === -1) {
      // Add to wishlist (without quantity)
      wishlist.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      });
      
      // Remove from cart
      cart.splice(itemIndex, 1);
      
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      
      // Update UI
      renderCart();
      updateCartCount();
      updateWishlistCount();
      updateTotals();
      
      // Dispatch events
      const cartUpdatedEvent = new CustomEvent('cartUpdated', {
        detail: { cart }
      });
      window.dispatchEvent(cartUpdatedEvent);
      
      const wishlistUpdatedEvent = new CustomEvent('wishlistUpdated', {
        detail: { wishlist }
      });
      window.dispatchEvent(wishlistUpdatedEvent);
    }
  }

  // Render cart items
  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn btn-shop">Continue Shopping</a>
        </div>
      `;
      checkoutBtn.disabled = true;
      return;
    }
    
    checkoutBtn.disabled = false;
    
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="quantity-controls">
            <button class="quantity-btn minus" aria-label="Decrease quantity">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" aria-label="Increase quantity">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <button class="remove-item">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
          <button class="move-to-wishlist">
            <i class="far fa-heart"></i> Move to Wishlist
          </button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners to the new elements
    document.querySelectorAll('.minus').forEach(btn => {
      btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.plus').forEach(btn => {
      btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', removeItem);
    });
    
    document.querySelectorAll('.move-to-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.closest('.cart-item').dataset.id;
        moveToWishlist(itemId);
      });
    });
    
    // Update totals
    updateTotals();
  }

  // Quantity controls
  function decreaseQuantity(e) {
    const itemId = e.target.closest('.cart-item').dataset.id;
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
    
    saveCart();
  }

  function increaseQuantity(e) {
    const itemId = e.target.closest('.cart-item').dataset.id;
    const itemIndex = cart.findIndex(item => item.id === itemId);
    cart[itemIndex].quantity++;
    saveCart();
  }

  function removeItem(e) {
    const itemId = e.target.closest('.cart-item').dataset.id;
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
  }

  // Save cart to localStorage and update UI
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch event to update other pages
    const cartUpdatedEvent = new CustomEvent('cartUpdated', {
      detail: { cart }
    });
    window.dispatchEvent(cartUpdatedEvent);
    
    renderCart();
    updateCartCount();
    updateTotals();
  }

  // Checkout button
  checkoutBtn.addEventListener('click', () => {
    // In a real application, you would redirect to checkout page
    alert('Redirecting to checkout!');
    // window.location.href = 'checkout.html';
  });

  // Continue shopping button
  continueShopping?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'shop.html';
  });

  // Initialize
  renderCart();
  updateCartCount();
  updateWishlistCount();
});