import { db, BlogPosts } from 'astro:db';

/**
 * Helper script to add a new article directly to the database
 * 
 * Usage: npx astro db execute db/add-article.ts
 * 
 * Modify the articleData object below with your article information
 */

const articleData = {
  slug: 'your-article-slug', // URL-friendly identifier (e.g., 'my-new-post')
  title: 'Your Article Title',
  description: 'A brief description of your article',
  pubDate: new Date('2024-01-25'), // Publication date
  updatedDate: null, // Optional: new Date('2024-01-26') if updated
  heroImage: null, // Optional: '/path/to/image.jpg'
  tags: ['tag1', 'tag2'], // Array of tags
  externalLink: null, // Optional: 'https://example.com/original-article' if reposted/summarized
  body: `# Your Article Title

Write your markdown content here.

## Section 1

Your content goes here...

## Section 2

More content...`,
};

export default async function addArticle() {
  try {
    await db.insert(BlogPosts).values(articleData);
    console.log(`✓ Successfully added article: ${articleData.slug}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
      console.error(`✗ Article with slug "${articleData.slug}" already exists!`);
      console.log('Tip: Use a different slug or update the existing article.');
    } else {
      console.error('✗ Error adding article:', error);
    }
    throw error;
  }
}
// npx astro db execute scripts/seed.ts to add the new file