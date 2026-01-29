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
        platform: z.preprocess(
          (val) => {
            if (typeof val === 'string') {
              return val.trim().toLowerCase();
            }
            return val;
          },
          z.string().min(1) // Accept any non-empty string
        ),
        duration: z.string().optional(),
        publishedDate: z.coerce.date().optional(),
      })
    ),
  }),
});

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    // No frontmatter required - metadata parsed from content
  }),
});

export const collections = {
  videos,
  tutorials,
};

