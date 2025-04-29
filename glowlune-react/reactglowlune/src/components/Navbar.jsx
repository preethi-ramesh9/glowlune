// components/Navbar.jsx
export function Navbar() {
    return (
      <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-[Playfair_Display] tracking-wide text-[#aa7e69]">Glowlune</h1>
        <ul className="flex gap-6 text-sm">
          {['Home', 'Shop', 'Contact', 'Wishlist', 'Cart', 'Profile'].map((item) => (
            <li key={item}>
              <a href={`/${item.toLowerCase()}`} className="hover:text-[#aa7e69] transition">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }