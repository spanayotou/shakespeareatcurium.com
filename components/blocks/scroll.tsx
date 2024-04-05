import React, { useState, useEffect } from "react";
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksScroll } from "../../tina/__generated__/types";

export const Scroll = ({ data }: { data: PageBlocksScroll }) => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.images && data.images.length > 1) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images!.length);
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [data.images]); // Trigger effect when images change

  const nextImage = () => {
    if (data.images && data.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images!.length);
    }
  };

  const prevImage = () => {
    if (data.images && data.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? data.images!.length - 1 : prevIndex - 1));
    }
  };

  return (
    <Section color={data.color} className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {data.images && data.images.length > 0 && (
          <div
            data-tina-field={tinaField(data.images[currentImageIndex], "src")}
            className="relative w-full h-full"
            style={{
              backgroundImage: `url(${data.images[currentImageIndex].src || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
              {data.texts && data.texts.length > 0 && data.texts[currentImageIndex] && (
                <div className="text-center">
                  <h2 className="text-4xl font-extrabold leading-tight mb-4">
                    {data.texts[currentImageIndex].headline}
                  </h2>
                  <p className="block opacity-15 text-8xl">
                    {data.texts[currentImageIndex].quote}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mt-4 flex items-center">
          {data.images && data.images.length > 1 && (
            <>
              <button onClick={prevImage} className="bg-customBlue text-white px-4 py-2 rounded mr-2">Previous</button>
              <button onClick={nextImage} className="bg-customBlue text-white px-4 py-2 rounded">Next</button>
            </>
          )}
        </div>
      </div>
      {data.images && data.images.length > 1 && (
        <div className="flex items-center mt-4 justify-center">
          {data.images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 mx-1 rounded-full ${index === currentImageIndex ? 'bg-black' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      )}
    </Section>
  );}


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