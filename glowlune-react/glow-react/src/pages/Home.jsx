function Home() {
    return (
      <div className="min-h-screen px-6 py-12 text-center">
        <div className="relative">
          <img src="/hero.jpg" alt="Model with glowing skin" className="w-full h-[60vh] object-cover rounded-2xl shadow-md" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 className="text-4xl md:text-6xl font-[Playfair_Display] drop-shadow-lg">Glow Beyond the Surface</h1>
            <p className="mt-4 text-lg">Luxurious skincare crafted for radiant, nourished beauty.</p>
            <div className="mt-6 space-x-4">
              <button className="bg-[#e8dcd0] hover:bg-[#e2cfc1] text-[#4a4a4a] font-semibold py-2 px-6 rounded-2xl shadow-md transition-all">Shop Now</button>
              <button className="border border-[#e8dcd0] text-[#4a4a4a] font-semibold py-2 px-6 rounded-2xl shadow-md hover:bg-[#f5eee8] transition-all">Explore Products</button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-2xl" />
        </div>
  
        <section className="mt-16">
          <h2 className="text-3xl font-[Playfair_Display] mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Natural Ingredients', 'Cruelty-Free', 'Dermatologist Approved', 'Eco Conscious'].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="font-semibold text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

export default Home;