import { db, BlogPosts } from 'astro:db';
import matter from 'gray-matter';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export default async function seed() {
  const blogDir = join(process.cwd(), 'src', 'content', 'blog');
  
  // Check if directory exists
  if (!existsSync(blogDir)) {
    console.warn(`Blog directory not found: ${blogDir}`);
    return;
  }

  const files = readdirSync(blogDir).filter((file) => file.endsWith('.md'));

  if (files.length === 0) {
    console.warn('No markdown files found in blog directory');
    return;
  }

  console.log(`Found ${files.length} blog post(s) to migrate...`);

  for (const file of files) {
    const filePath = join(blogDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract slug from filename (remove .md extension)
    const slug = file.replace(/\.md$/, '');

    // Prepare the post data
    const postData = {
      slug,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDate),
      updatedDate: data.updatedDate ? new Date(data.updatedDate) : null,
      heroImage: data.heroImage || null,
      tags: data.tags || [],
      body: content.trim(),
    };

    try {
      // Insert into database (will fail if slug already exists due to primary key constraint)
      await db.insert(BlogPosts).values(postData);
      console.log(`✓ Migrated: ${slug}`);
    } catch (error) {
      console.warn(`⚠ Skipped ${slug} (may already exist):`, error instanceof Error ? error.message : error);
    }
  }

  console.log('Migration complete!');
}
