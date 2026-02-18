import React from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <header className="w-screen fixed top-0 left-0 z-50 bg-black h-[7vh] flex items-center">
      <nav className="container mx-auto flex justify-between items-center px-5 2xl:px-0">
        {/* Logo */}
        <img src="/logo.svg" alt="apple logo" className="h-8" />

        {/* Nav Links */}
        <ul className="flex gap-6 text-gray-400">
          {navLinks.map(({ label }) => (
            <li key={label} className="hover:text-white cursor-pointer">
              <a href={`#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Search & Cart */}
        <div className="flex items-center gap-3">
          <button className="hover:opacity-80 transition">
            <img src="/search.svg" alt="Search" className="h-5 w-5" />
          </button>
          <button className="hover:opacity-80 transition">
            <img src="/cart.svg" alt="Cart" className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
