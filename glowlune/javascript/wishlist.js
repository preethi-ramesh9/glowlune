document.addEventListener('DOMContentLoaded', () => {
    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlistContainer = document.getElementById('wishlistItems');
    const wishlistCount = document.querySelector('.wishlist-count');
    const cartCount = document.querySelector('.cart-count');
  
    // Add event listener for wishlist updates from other pages
    window.addEventListener('wishlistUpdated', (e) => {
      wishlist = e.detail.wishlist;
      renderWishlist();
      updateWishlistCount();
    });
  
    // Add event listener for cart updates from other pages
    window.addEventListener('cartUpdated', (e) => {
      updateCartCount();
    });
  
    // Update wishlist count in header
    function updateWishlistCount() {
      const count = wishlist.length;
      wishlistCount.textContent = count;
      wishlistCount.style.display = count > 0 ? 'flex' : 'none';
    }
  
    // Update cart count in header
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  
    // Add item to cart from wishlist
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity++;
      } else {
        // Add new item to cart
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count in header
      updateCartCount();
      
      // Dispatch a custom event to notify other pages
      const cartUpdatedEvent = new CustomEvent('cartUpdated', {
        detail: { cart }
      });
      window.dispatchEvent(cartUpdatedEvent);
      
      // Show confirmation
      showAddToCartConfirmation();
    }
  
    // Remove item from wishlist
    function removeFromWishlist(productId) {
      wishlist = wishlist.filter(item => item.id !== productId);
      saveWishlist();
    }
  
    // Save wishlist to localStorage and update UI
    function saveWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      renderWishlist();
      updateWishlistCount();
      
      // Dispatch event to update other pages
      const wishlistUpdatedEvent = new CustomEvent('wishlistUpdated', {
        detail: { wishlist }
      });
      window.dispatchEvent(wishlistUpdatedEvent);
    }
  
    // Show add to cart confirmation
    function showAddToCartConfirmation() {
      const confirmation = document.createElement('div');
      confirmation.className = 'add-to-cart-confirmation';
      confirmation.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Added to cart</span>
      `;
      
      document.body.appendChild(confirmation);
      
      // Remove after animation
      setTimeout(() => {
        confirmation.classList.add('fade-out');
        setTimeout(() => confirmation.remove(), 300);
      }, 2000);
    }
  
    // Render wishlist items
    function renderWishlist() {
      if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
          <div class="empty-wishlist">
            <p>Your wishlist is empty</p>
            <a href="shop.html" class="btn btn-shop">Continue Shopping</a>
          </div>
        `;
        return;
      }
      
      wishlistContainer.innerHTML = wishlist.map(item => `
        <div class="wishlist-item" data-id="${item.id}">
          <div class="wishlist-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="wishlist-item-details">
            <h3 class="wishlist-item-title">${item.name}</h3>
            <div class="wishlist-item-price">₹${item.price.toLocaleString('en-IN')}</div>
            <div class="wishlist-item-actions">
              <button class="btn btn-cart">
                <i class="fas fa-shopping-bag"></i> Add to Cart
              </button>
              <button class="btn btn-remove">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      // Add event listeners to the new elements
      document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const itemId = e.target.closest('.wishlist-item').dataset.id;
          const product = wishlist.find(item => item.id === itemId);
          addToCart(product);
        });
      });
      
      document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const itemId = e.target.closest('.wishlist-item').dataset.id;
          removeFromWishlist(itemId);
        });
      });
    }
  
    // Initialize
    renderWishlist();
    updateWishlistCount();
    updateCartCount();
  });