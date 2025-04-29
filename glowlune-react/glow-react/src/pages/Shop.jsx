function Shop() {
    const products = [
      { id: 1, name: 'Hydrating Serum', desc: 'Deep moisture for radiant skin.', price: '$45', image: '/products/serum.jpg' },
      { id: 2, name: 'Gentle Cleanser', desc: 'Cleanse without stripping.', price: '$30', image: '/products/cleanser.jpg' },
    ];
  
    return (
      <div className="p-6">
        <h2 className="text-3xl font-[Playfair_Display] text-center mb-6">Shop All Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-all">
              <img src={p.image} alt={p.name} className="rounded-xl mb-4" />
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.desc}</p>
              <p className="mt-2 text-[#aa7e69] font-bold">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Shop;