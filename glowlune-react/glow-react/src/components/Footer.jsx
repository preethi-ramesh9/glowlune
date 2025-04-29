function Footer() {
    return (
      <footer className="bg-[#f3f1ed] text-sm text-center py-6 mt-12">
        <div className="mb-4">
          <a href="/" className="text-lg font-[Playfair_Display] text-[#aa7e69]">Glowlune</a>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          {['Home', 'Shop', 'Contact', 'Wishlist', 'Cart', 'Profile'].map((link) => (
            <a key={link} href={`/${link.toLowerCase()}`} className="hover:text-[#aa7e69] transition">
              {link}
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-[#aa7e69] transition">Instagram</a>
          <a href="#" className="hover:text-[#aa7e69] transition">Facebook</a>
          <a href="#" className="hover:text-[#aa7e69] transition">Pinterest</a>
        </div>
        <p className="mt-4 text-gray-400">© 2025 Glowlune. All rights reserved.</p>
      </footer>
    );
}

export default Footer;