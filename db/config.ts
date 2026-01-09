import { defineDb, defineTable, column } from 'astro:db';

export const BlogPosts = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    pubDate: column.date(),
    updatedDate: column.date({ optional: true }),
    heroImage: column.text({ optional: true }),
    tags: column.json({ optional: true }),
    body: column.text(),
  },
});

export default defineDb({
  tables: {
    BlogPosts,
  },
});
