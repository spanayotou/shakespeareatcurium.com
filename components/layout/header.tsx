import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();

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
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b <span class="math-inline">\{headerColorCss\}\`\}
\>
<Container size\="custom" className\="py\-0 relative z\-10 max\-w\-8xl"\>
<div className\="flex items\-center justify\-between gap\-6"\>
<h4 className\="select\-none text\-lg font\-bold tracking\-tight my\-4 transition duration\-150 ease\-out transform"\>
<Link
href\="/"</0\>
className\="flex gap\-1 items\-center whitespace\-nowrap tracking\-\[\.002em\]"
\>
<Image
src\="/your\-image\-url\.png"
alt\="Your image alt text"
width\="50"
className\="rounded\-lg border\-gray\-300"
/\>
<span data\-tina\-field\=\{tinaField\(data, "name"\)\}\>\{data\.name\}</span\>
</Link\>
</h4\>
<ul className\="flex gap\-6 sm\:gap\-8 lg\:gap\-10 tracking\-\[\.002em\] \-mx\-4"\>
\{data\.nav &&
data\.nav\.map\(\(item, i\) \=\> \(
<li
key\=\{\`</span>{item.label}-<span class="math-inline">\{i\}\`\}
className\=\{\`</span>{
                    activeItem ? activeItemClasses[theme.color] : ""
                  }`}
                >
                  <Link
                    data-tina-field={tinaField(item, "label")}
                    href={`/${item.href}`}
                    className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                      activeItem ? `` : `opacity-70`
                    }`}
                  >
                    {item.label}
                    {activeItem && (
                      <svg
                        className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${
                          activeBackgroundClasses[theme.color]
