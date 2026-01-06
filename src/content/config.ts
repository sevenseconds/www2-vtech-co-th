import { defineCollection, z } from 'astro:content';

// Blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Admin'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Services collection
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(), // Icon name or emoji
    order: z.number().default(0),
  }),
});

// Products collection
const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    sku: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    images: z.array(z.string()),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
  }),
});

// Team collection
const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    bio: z.string(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Projects collection
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    images: z.array(z.string()),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  services,
  products,
  team,
  projects,
};
