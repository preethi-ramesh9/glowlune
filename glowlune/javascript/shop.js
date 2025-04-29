fetch('./data.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('productCards');

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';

      const additionalInfo = Object.entries(product["additional information"] || {})
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');

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
