fetch('data.json')
  .then(res => res.json())
  .then(products => {
    // Example: Filter only 'Serum' category
    const filtered = products.filter(product => product.tag === 'BestSeller');

    const container = document.getElementById('productCards');
    container.innerHTML = ''; // clear existing content

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product';

      card.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p>${product.description}</p>
        <a>Shop Now</a>
      `;

      //container.appendChild(card);
    });
  });
