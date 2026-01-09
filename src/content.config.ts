import { defineCollection, z } from 'astro:content';

const videos = defineCollection({
  type: 'data',
  schema: z.object({
    videos: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        thumbnail: z.string().optional(),
        platform: z.enum(['youtube', 'vimeo']),
        duration: z.string().optional(),
        publishedDate: z.coerce.date().optional(),
      })
    ),
  }),
});

export const collections = {
  videos,
};

