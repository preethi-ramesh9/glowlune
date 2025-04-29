import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar  from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Router>
      <div className="bg-[#fdfcf9] text-[#4a4a4a] font-[Raleway]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}