import React from "react";
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksImage } from "../../tina/__generated__/types";


export const Image = ({ data }: { data: PageBlocksImage }) => {
  const theme = useTheme();

  return (
    <Section color={data.color}>
      <Container
        size="full"  // Update this to fit your layout requirements
        className="relative flex items-center justify-center"
      >
        {data.image && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className="relative w-full h-full"
          >
            <img
              className="w-full h-full object-cover"
              src={data.image.src}
              alt={data.image.alt}
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
                {data.text && (
                  <p
                    data-tina-field={tinaField(data, "text")}
                    className="text-lg leading-relaxed"
                  >
                    {data.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

// Define your Tina Template
export const imageBlockSchema: TinaTemplate = {
  name: "imageWithTextOverlay",
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
      name: "text",
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
      // Add color options if needed
    },
  ],
};

