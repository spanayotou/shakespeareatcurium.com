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
        <h4 className={`select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform ${isMobile ? '' : 'hidden lg:block'}`}>
  {isMobile ? data.name : (
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
          <nav className={`lg:flex ${isMobile ? 'hidden' : 'block'}`}>
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
          {isMobile && (
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-xl focus:outline-none"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          )}
        </div>
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 z-50 flex justify-center items-center">
            <ul className="flex flex-col gap-4 p-4">
              {data.nav &&
                data.nav.map((item, i) => {
                  const activeItem = (item.href === "" ? router.asPath === "/" : router.asPath.includes(item.href)) && isMobile;
                  return (
                    <li key={`${item.label}-${i}`} className={`${activeItem ? "active" : ""}`}>
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${
                          item.href}`}
                          className={`relative select-none text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-2 px-4 ${activeItem ? `` : `opacity-70`}`}
                          onClick={handleMenuItemClick} // Close menu when menu item is clicked
                        >
                          {item.label}
                          {activeItem && (
                            <svg
                              className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15`}
                              preserveAspectRatio="none"
                              viewBox="0 0 230 230"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="230"
                                y="230"
                                width="230"
                                height="230"
                                transform="rotate(-180 230 230)"
                                fill="url(#paint0_radial_1_33)"
                              />
                              <defs>
                                <radialGradient
                                  id="paint0_radial_1_33"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                                >
                                  <stop stopColor="currentColor" />
                                  <stop
                                    offset="1"
                                    stopColor="currentColor"
                                    stopOpacity="0"
                                  />
                                </radialGradient>
                              </defs>
                            </svg>
                          )}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          <div
            className={`absolute h-1 bg-gradient-to-r from-transparent ${
              data.color === "primary" ? `via-white` : `via-black dark:via-white`
            } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
          />
        </Container>
      </div>
    );
  };
  
  export default Header;
