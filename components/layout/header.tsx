import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from "."; // Assuming this imports the theme hook
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme(); // Assuming this is a custom hook to get the theme
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerColor = {
    default: "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss = data.color === "primary" ? headerColor.primary[theme.color] : headerColor.default;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the menu when a menu item is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b ${headerColorCss}`}>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            {isMobile ? (
              <Link href="/" className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]">
                <img
                  src={data.image as string}
                  alt={data.name}
                  className="w-26 h-20"
                />
                <span data-tina-field={tinaField(data, "name")}>{data.name}</span>
              </Link>
            ) : (
              <Link href="/" className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]">
                <img
                  src={data.image as string}
                  alt={data.name}
                  className="w-26 h-20"
                />
                <span data-tina-field={tinaField(data, "name")}>{data.name}</span>
              </Link>
            )}
          </h4>
          {isMobile ? (
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-xl focus:outline-none"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          ) : (
            <nav className="hidden lg:block">
              <ul className="flex gap-4">
                {data.nav &&
                  data.nav.map((item, i) => (
                    <li key={`${item.label}-${i}`}>
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className="select-none text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100"
                        onClick={handleMenuItemClick} // Close menu when menu item is clicked
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
