import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link"; // Import Link component from Next.js
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksScroll } from "../../tina/__generated__/types";
import { isMobile as isMobileDevice } from "react-device-detect";

export const Scroll = ({ data }: { data: PageBlocksScroll }) => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMobileCheck(); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.images?.length > 1) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }
    }, 5000); 

    return () => clearInterval(interval); 
  }, [data?.images]);

  const nextImage = useCallback(() => {
    if (data?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  }, [data?.images]);

  const prevImage = useCallback(() => {
    if (data?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? data.images.length - 1 : prevIndex - 1));
    }
  }, [data?.images]);

  const currentImage = isMobile ? data.images[currentImageIndex].mobileSrc : data.images[currentImageIndex].src;

  console.log('Is Mobile:', isMobile);
  console.log('Current Image URL:', currentImage);

  return (
    <Section color={data?.color} className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {data?.images?.length > 0 && (
          <Link href={data.linkUrl || "#"} key={currentImageIndex}> {/* Wrap each image in Link component */}
            <a>
              <div
                data-tina-field={tinaField(data.images[currentImageIndex], "src")}
                className="relative w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${currentImage || ""})`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                  {data?.texts?.[currentImageIndex] && (
                    <div className="text-center px-4 md:px-8">
                      <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-4 font-sans">
                        {data.texts[currentImageIndex].headline}
                      </h2>
                      <p className="block opacity-80 text-2xl md:text-8xl font-serif">
                        {data.texts[currentImageIndex].quote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </a>
          </Link>
        )}
        <div className="mt-4 flex items-center">
          {data?.images?.length > 1 && (
            <>
              <button onClick={prevImage} className="bg-teal text-white px-2 py-1 md:px-4 md:py-2 rounded mr-2" aria-label="Previous Image">Previous</button>
              <button onClick={nextImage} className="bg-teal text-white px-2 py-1 md:px-4 md:py-2 rounded" aria-label="Next Image">Next</button>
            </>
          )}
        </div>
      </div>
      {data?.images?.length > 1 && (
        <div className="flex items-center mt-4 justify-center">
          {data.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-4 md:h-4 mx-1 rounded-full ${index === currentImageIndex ? 'bg-black' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

export const scrollBlockSchema: TinaTemplate = {
  name: "scroll",
  label: "Scroll",
  fields: [
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      label: "Text",
      name: "quote",
      type: "string",
    },
    {
      type: "object",
      label: "Images",
      name: "images",
      list: true,
      fields: [
        {
          type: "image",
          label: "Image Source",
          name: "src",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "alt",
        },
        {
          type: "image",
          label: "Mobile Image Source",
          name: "mobileSrc", 
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
    },
    {
      type: "object",
      label: "Texts",
      name: "texts",
      list: true,
      fields: [
        {
          type: "string",
          label: "Headline",
          name: "headline",
        },
        {
          type: "string",
          label: "Quote",
          name: "quote",
        },
      ],
    },
    {
      type: "string",
      label: "Link URL", // Add a field for the link URL
      name: "linkUrl",
    },
  ],
};


// Custom hook to check if it's a mobile device
function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default useMobileCheck;
