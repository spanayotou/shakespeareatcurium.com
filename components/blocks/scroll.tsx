import React, { useState } from "react";
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksImage } from "../../tina/__generated__/types";

export const Image = ({ data }: { data: PageBlocksImage }) => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (data.image?.length || 0));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? (data.image?.length || 0) - 1 : prevIndex - 1));
  };

  return (
    <Section color={data.color}>
      <Container
        size="full"
        hasImage={true}
        className="relative flex items-center justify-center px-0"
      >
        {data.image && (
          <div
            data-tina-field={tinaField(data, "image")}
            className="relative w-full h-full"
          >
            <img
              className="w-full h-full object-cover"
              src={data.image[currentImageIndex]?.src || ""}
              alt={data.image[currentImageIndex]?.alt || ""}
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
        {data.image?.length > 1 && (
          <div>
            <button onClick={prevImage}>Previous</button>
            <button onClick={nextImage}>Next</button>
          </div>
        )}
      </Container>
    </Section>
  );
};

// Define your Tina Template
export const imageBlockSchema: TinaTemplate = {
  name: "image",
  label: "Image with Text Overlay",
  ui: {
    // Add any UI configurations or previews here
    previewSrc: "/path/to/preview-image.png",
  },
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
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
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
