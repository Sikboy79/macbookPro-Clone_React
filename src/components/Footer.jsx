import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-5">
      {/* Top info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <p className="text-center md:text-left text-sm">
          More ways to shop: Find an Apple store or other retailer near you. Or
          call 800 123-45678.
        </p>
        <img src="/logo.svg" alt="logo" className="h-8" />
      </div>

      <hr className="border-gray-700 mb-6" />

      {/* Bottom links */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>Copyright &copy; 2024 Apple Inc. All rights reserved</p>
        <ul className="flex flex-wrap gap-4 justify-center md:justify-end">
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link} className="hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
