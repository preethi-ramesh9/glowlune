// shop.js
fetch('./data.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('productCards');

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.addEventListener('click', () => {
        // Store the product ID in localStorage and redirect
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'product.html';
      });

      card.innerHTML = `
        <img class="cardImage" src="${product.productimage}"/>
        <h3>${product.name}</h3>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load products:", error);
  });