import React from "react";
import { useTheme } from "../layout";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaTemplate } from "tinacms";
import { PageBlocksImage } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Image = ({ data }: { data: PageBlocksImage }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="large"
        className="grid grid-cols-1 md:grid-cols-5 gap-14 items-center justify-center"
      >
        <div className="row-start-2 md:row-start-1 md:col-span-3 text-center md:text-left">
          {data.tagline && (
            <h2
              data-tina-field={tinaField(data, "tagline")}
              className="relative inline-block px-3 py-1 mb-8 text-md font-bold tracking-wide title-font z-20"
            >
              {data.tagline}
              <span className="absolute w-full h-full left-0 top-0 rounded-full -z-1 bg-current opacity-7"></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.headline}
              </span>
            </h3>
          )}


          {data.text && (
            <div
              data-tina-field={tinaField(data, "text")}
              className={`prose prose-lg mx-auto md:mx-0 mb-10 ${
                data.color === "primary" ? `prose-primary` : `dark:prose-dark`
              }`}
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}

          
          {data.actions && (
            <Actions
              className="justify-center md:justify-start py-2"
              parentColor={data.color}
              actions={data.actions}
            />
          )}
        </div>
        {data.image && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className="relative row-start-1 md:col-span-2 flex justify-center"
          >
            <img
              className="absolute w-full rounded-lg max-w-xs md:max-w-none h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
              src={data.image.src}
              aria-hidden="true"
            />
            <img
              className="relative z-10 w-full max-w-xs rounded-lg md:max-w-none h-auto"
              alt={data.image.alt}
              src={data.image.src}
            />
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
      name: "text",
      type: "rich-text",
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
