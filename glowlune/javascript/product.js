document.addEventListener('DOMContentLoaded', () => {
  // Get the selected product from localStorage
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  
  if (!product) {
    window.location.href = 'shop.html';
    return;
  }

  // Load product details
  const productDetails = document.querySelector('.product-details');
  productDetails.innerHTML = `
    <div class="product-image">
      <img src="${product.productimage}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
      <div class="description">${product.description}</div>
      
      <div class="additional-info">
        ${Object.entries(product["additional information"] || {})
          .map(([key, value]) => `
            <div>
              <h3>${key}</h3>
              <div>${value}</div>
            </div>
          `).join('')}
      </div>
      
      <div class="buttons">
        <button class="btn btn-wishlist" id="wishlistBtn">
          <i class="far fa-heart"></i> Wishlist
        </button>
        <button class="btn btn-cart">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
        <button class="btn btn-buy">
          <i class="fas fa-bolt"></i> Buy Now
        </button>
      </div>
    </div>
  `;

  // Check if product is in wishlist and update button
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isInWishlist = wishlist.some(item => item.id === product.productid);
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (isInWishlist) {
    wishlistBtn.classList.add('added');
    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
  }

  // Load related products
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      const relatedProducts = products.filter(p => 
        p.category === product.category && p.productid !== product.productid
      ).slice(0, 5); // Get up to 5 related products
      
      const slider = document.getElementById('relatedSlider');
      
      if (relatedProducts.length > 0) {
        relatedProducts.forEach(relatedProduct => {
          const card = document.createElement('div');
          card.className = 'related-card';
          card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(relatedProduct));
            window.location.reload();
          });
          
          card.innerHTML = `
            <img src="${relatedProduct.productimage}" alt="${relatedProduct.name}" loading="lazy">
            <h3>${relatedProduct.name}</h3>
            <p><strong>₹${relatedProduct.price.toLocaleString('en-IN')}</strong></p>
          `;
          
          slider.appendChild(card);
        });
      } else {
        slider.innerHTML = '<p>No related products found</p>';
      }
    })
    .catch(error => {
      console.error("Failed to load related products:", error);
      document.getElementById('relatedSlider').innerHTML = '<p>Error loading related products</p>';
    });

  // Cart functionality
  function addToCart(product, quantity = 1, isBuyNow = false) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.productid);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: product.productid,
        name: product.name,
        price: product.price,
        image: product.productimage,
        quantity: quantity
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
    
    // Show confirmation (unless it's Buy Now)
    if (!isBuyNow) {
      showAddToCartConfirmation();
    }
    
    // Redirect if Buy Now
    if (isBuyNow) {
      window.location.href = 'cart.html';
    }
  }

  // Wishlist functionality
  function toggleWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productIndex = wishlist.findIndex(item => item.id === product.productid);
    
    if (productIndex >= 0) {
      // Remove from wishlist
      wishlist.splice(productIndex, 1);
      wishlistBtn.classList.remove('added');
      wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
    } else {
      // Add to wishlist
      wishlist.push({
        id: product.productid,
        name: product.name,
        price: product.price,
        image: product.productimage
      });
      wishlistBtn.classList.add('added');
      wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Dispatch event to update other pages
    const wishlistUpdatedEvent = new CustomEvent('wishlistUpdated', {
      detail: { wishlist }
    });
    window.dispatchEvent(wishlistUpdatedEvent);
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count in header
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const totalItems = wishlist.length;
    
    // Update wishlist count in header
    const wishlistCountElement = document.querySelector('.wishlist-count');
    if (wishlistCountElement) {
      wishlistCountElement.textContent = totalItems;
      wishlistCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

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

  // Initialize counts
  updateCartCount();
  updateWishlistCount();

  // Add event listeners for buttons
  productDetails.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-cart') || e.target.closest('.btn-cart')) {
      // Add to cart
      addToCart(product);
    } else if (e.target.classList.contains('btn-buy') || e.target.closest('.btn-buy')) {
      // Buy now (add to cart and go to cart page)
      addToCart(product, 1, true);
    } else if (e.target.classList.contains('btn-wishlist') || e.target.closest('.btn-wishlist')) {
      // Toggle wishlist
      toggleWishlist(product);
    }
  });

  // Listen for cart updates from other pages
  window.addEventListener('cartUpdated', (e) => {
    updateCartCount();
  });

  // Listen for wishlist updates from other pages
  window.addEventListener('wishlistUpdated', (e) => {
    updateWishlistCount();
  });
});