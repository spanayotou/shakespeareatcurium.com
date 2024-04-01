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
    <Section color={data.color}>
      <Container
        size="full"
        hasImage={true}
        className="relative flex items-center justify-center px-0"
      >
        {data.images && data.images.length > 0 && (
          <div
            data-tina-field={tinaField(data.images[currentImageIndex], "src")}
            className="relative w-full h-full"
          >
            <img
              className="w-full h-full object-cover"
              src={data.images[currentImageIndex].src || ""}
              alt={data.images[currentImageIndex].alt || ""}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                {data.headline && (
                  <h2
                    data-tina-field={tinaField(data, "headline")}
                    className="text-4xl font-extrabold leading-tight mb-4"
                  >
                    {data.headline}
                  </h2>
                )}

                {data.quote && (
                  <p
                    data-tina-field={tinaField(data, "quote")}
                    className="block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-3	right-4 leading-4 -z-1"
                  >
                    {data.quote}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {data.images && data.images.length > 1 && (
          <div>
            <button onClick={prevImage}>Previous</button>
            <button onClick={nextImage}>Next</button>
          </div>
        )}
      </Container>
    </Section>
  );
};


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
  ],
};
