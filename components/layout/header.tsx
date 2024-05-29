import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/">
        <a className="text-2xl font-bold">Your Logo</a>
      </Link>
      <button
        className="block lg:hidden focus:outline-none"
        onClick={handleMenuToggle}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:w-auto`}
      >
        <ul className="lg:flex lg:flex-row lg:space-x-4">
          <li>
            <Link href="/" passHref>
              <a className="block py-2 px-4">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <a className="block py-2 px-4">About</a>
            </Link>
          </li>
          {/* Add more menu items here */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
