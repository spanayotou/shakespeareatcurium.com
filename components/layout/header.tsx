import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
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

  const headerColorCss =
    data.color === "primary" ? headerColor.primary[theme.color] : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green: "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple: "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange: "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow: "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  const isClient = typeof window !== 'undefined';

  const handleNavigation = (href: string) => {
    setMenuOpen(false); // Close the menu on navigation
    router.push(href);
  };

    return (
      <div className={`relative overflow-hidden bg-gradient-to-b ${headerColorCss}`} style={{ height: '80px' }}>
        <Container size="custom" className="py-0 relative z-10 max-w-8xl" style={{ position: 'relative' }}>
          {/* Header Content */}
          <div className="flex items-center justify-between gap-6" style={{ height: '100%' }}>
            <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
              <Link href="/" className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]">
                <img
                  src={data.image as string}
                  alt={data.name}
                  className="w-26 h-20"
                />
                <span data-tina-field={tinaField(data, "name")}>{data.name}</span>
              </Link>
            </h4>
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-xl focus:outline-none"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
  
          {/* Expanded Menu */}
          <ul className={`absolute top-full lg:relative lg:top-auto lg:left-auto lg:w-auto lg:flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4 ${menuOpen ? 'block' : 'hidden'}`} style={{ zIndex: 999, position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white' }}>
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  (item.href === "" ? router.asPath === "/" : router.asPath.includes(item.href)) && isClient;
                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={`${activeItem ? activeItemClasses[theme.color] : ""}`}
                  >
                    <Link
                      data-tina-field={tinaField(item, "label")}
                      href={`/${item.href}`}
                      className={`relative select-none text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                        activeItem ? `` : `opacity-70`
                      }`}
                      onClick={() => handleNavigation(`/${item.href}`)}
                    >
                      {item.label}
                      {activeItem && (
                        <svg
                          className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${
                            activeBackgroundClasses[theme.color]
                          }`}
                          preserveAspectRatio="none"
                          viewBox="0 0 230 230"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="230"
                            height="230"
                            fill="url(#paint0_radial)"
                          />
                          <defs>
                            <radialGradient
                              id="paint0_radial"
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
  
          {/* Background Overlay */}
          {menuOpen && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={() => setMenuOpen(false)} />}
        </Container>
      </div>
    );
  };
  
  export default Header;