import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import { MediaUploadField } from "tinacms/dist/react";
import { useCMS } from "tinacms";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();
  const cms = useCMS();

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

  const [image, setImage] = useState<File | null>(null);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b ${headerColorCss}`}>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link href="/">
              <a className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]">
                <MediaUploadField
                  name={tinaField(data, "image").name}
                  parse={(media) => media.previewSrc}
                  upload={(file) => cms.media.persist(file)}
                >
                  {({ open }) => (
                    <button onClick={open}>
                      {image && (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded Image"
                          width="50"
                          className="rounded-lg border-gray-300"
                        />
                      )}
                      {!image && (
                        <span data-tina-field={tinaField(data, "name")}>
                          {data.name}
                        </span>
                      )}
                    </button>
                  )}
                </MediaUploadField>
              </a>
            </Link>
          </h4>

          {/* ... existing code */}
        </div>
      </Container>
    </div>
  );
};
