document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function renderProducts(products) {
      productGrid.innerHTML = '';
      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="100%">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button class="btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;
        productGrid.appendChild(div);
      });
    }
  
    window.addToCart = (product) => {
      const existing = cart.find(p => p.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
    }
  
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.qty;
      });
      cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
      cartTotal.textContent = total.toFixed(2);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    cartToggle.addEventListener('click', () => {
      cartModal.classList.toggle('show');
    });
  
    closeCart.addEventListener('click', () => {
      cartModal.classList.remove('show');
    });
  
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => renderProducts(data));
  
    updateCart();
  });
  