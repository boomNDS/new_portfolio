import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Blog posts collection
const blog = defineCollection({
  type: "page",
  source: "blog/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

// Dev logs collection
const devLogs = defineCollection({
  type: "page",
  source: "dev-logs/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    project: z.string(), // Related project name (e.g., "Staykha", "SoupNotify")
    date: z.date(),
    tags: z.array(z.string()).default([]),
    progress: z.number().min(0).max(100).optional(), // Completion percentage
    milestone: z.boolean().default(false), // Is this a milestone post?
    cover: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

// Learning notes collection
const learning = defineCollection({
  type: "page",
  source: "learning/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.string(), // Main topic (e.g., "Nuxt", "Elysia", "Docker")
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

// Showcase case studies
const showcases = defineCollection({
  type: "page",
  source: "showcases/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    project: z.string(), // Links to showcase.json project name
    date: z.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export default defineContentConfig({
  collections: {
    blog,
    devLogs,
    learning,
    showcases,
  },
});
