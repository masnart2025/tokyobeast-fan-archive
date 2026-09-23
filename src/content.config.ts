import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/articles",
  }),

  schema: z.object({
    articleId: z.string(),
    title: z.string(),
    description: z.string(),

    category: z.enum([
      "world",
      "meta",
      "characters",
      "fan-works",
    ]),

    topics: z.array(z.string()),

    level: z.enum([
      "official",
      "inference",
      "theory",
      "fanon",
      "doujin",
    ]),

    tags: z.array(z.string()).default([]),

    images: z
      .array(
        z.object({
          file: z.string(),
          type: z.enum([
            "official",
            "unofficial",
          ]),
          alt: z.string(),
          caption: z.string().default(""),
          credit: z.string().default(""),
        })
      )
      .default([]),

    date: z.coerce.date().optional(),

    source: z.array(z.string()).default([]),
    reference: z.array(z.string()).default([]),

    viewer: z
      .object({
        direction: z.enum(["rtl", "ltr"]).default("rtl"),

        pages: z.array(
          z.object({
            image: z.string(),
            alt: z.string().default(""),
          })
        ),

        textVersion: z
          .array(
            z.object({
              type: z.enum(["text", "image"]),
              text: z.string().optional(),
              image: z.string().optional(),
              alt: z.string().optional(),
            })
          )
          .default([]),
      })
      .optional(),

    draft: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
};