fetch('data.json')
  .then(res => res.json())
  .then(products => {
    // Filter only BestSeller-tagged products
    const bestSellers = products.filter(product => product.tag === 'BestSeller');

    const container = document.getElementById('productCards');
    container.innerHTML = ''; // Clear any existing products

    bestSellers.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.productimage}" alt="${product.name}" class="product-image" />
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price"><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
        <p class="product-category"><strong>Category:</strong> ${product.category}</p>
        <p class="product-description">${product.description}</p>
        <a href="product.html?id=${product.productid}" class="shop-button">Shop Now</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading products:", err);
    document.getElementById('productCards').innerHTML = "<p>Failed to load products.</p>";
  });
