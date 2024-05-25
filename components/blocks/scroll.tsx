import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksScroll } from "../../tina/__generated__/types";

export const Scroll = ({ data }: { data: PageBlocksScroll }) => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMobileCheck(); // Custom hook to check if it's a mobile device

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.images?.length > 1) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
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

  return (
    <Section color={data?.color} className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {data?.images?.length > 0 && (
          <div
            data-tina-field={tinaField(data.images[currentImageIndex], "src")}
            className="relative w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${isMobile ? (data.images[currentImageIndex].mobileSrc || "") : (data.images[currentImageIndex].src || "")})`,
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
      list: true, // Indicates that this field is a list
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
          name: "mobileSrc", // Assuming you have a field for mobile images
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
  ],
};

// Custom hook to check if it's a mobile device
function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust threshold as needed
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
