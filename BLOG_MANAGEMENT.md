# Blog Management Guide - Astro DB

This guide explains how to add and manage blog articles in your Astro DB-powered blog.

## Overview

Your blog now uses **Astro DB** instead of file-based Content Collections. Articles are stored in a SQLite database, which provides more flexibility for querying and managing content.

## Adding New Articles

There are **two main ways** to add articles to your database:

### Method 1: Using Markdown Files + Seed Script (Recommended for Content Writers)

This method is best if you prefer writing articles in markdown files.

#### Steps:

1. **Create a new markdown file** in `src/content/blog/`:
   ```bash
   # Example: src/content/blog/my-new-article.md
   ```

2. **Add frontmatter and content**:
   ```markdown
   ---
   title: My New Article
   description: A brief description of the article
   pubDate: 2024-01-25
   updatedDate: 2024-01-26  # Optional
   heroImage: /path/to/image.jpg  # Optional
   tags: ['tutorial', 'astro']
   ---
   
   # My New Article
   
   Your markdown content here...
   ```

3. **Run the seed script** to add it to the database:
   ```bash
   npx astro db execute scripts/seed.ts
   ```

   The seed script will:
   - Read all `.md` files from `src/content/blog/`
   - Parse frontmatter and content
   - Insert new articles into the database
   - Skip articles that already exist (based on slug)

#### Advantages:
- ✅ Familiar markdown workflow
- ✅ Easy to version control with Git
- ✅ Can edit with any markdown editor
- ✅ Batch import multiple articles at once

---

### Method 2: Direct Database Insert (For Programmatic Addition)

This method is best for programmatically adding articles or when you want to add articles directly without markdown files.

#### Steps:

1. **Edit the helper script** `db/add-article.ts`:
   - Modify the `articleData` object with your article information
   - Set the `slug`, `title`, `description`, `pubDate`, `tags`, and `body`

2. **Run the script**:
   ```bash
   npx astro db execute db/add-article.ts
   ```

#### Example `articleData`:
```typescript
const articleData = {
  slug: 'my-new-post',
  title: 'My New Post',
  description: 'Description here',
  pubDate: new Date('2024-01-25'),
  updatedDate: null, // or new Date('2024-01-26')
  heroImage: null, // or '/path/to/image.jpg'
  tags: ['tutorial', 'astro'],
  body: '# My New Post\n\nContent here...',
};
```

#### Advantages:
- ✅ Direct database insertion
- ✅ Good for automated content generation
- ✅ No markdown files needed
- ✅ Can be integrated into CMS or admin panel

---

## Article Schema

Each article in the database has the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | text | ✅ Yes | URL-friendly identifier (primary key) |
| `title` | text | ✅ Yes | Article title |
| `description` | text | ✅ Yes | Brief description for SEO |
| `pubDate` | date | ✅ Yes | Publication date |
| `updatedDate` | date | ❌ No | Last update date (optional) |
| `heroImage` | text | ❌ No | Path to hero image (optional) |
| `tags` | json | ❌ No | Array of tags (optional) |
| `body` | text | ✅ Yes | Markdown content |

---

## Updating Existing Articles

### Option 1: Update Markdown File + Re-seed

1. Edit the markdown file in `src/content/blog/`
2. Update the `updatedDate` in frontmatter
3. Run seed script (it will skip due to existing slug)

**Note**: The current seed script skips existing articles. To update, you'll need to either:
- Delete the article from DB first, OR
- Modify the seed script to use `INSERT OR REPLACE`

### Option 2: Create an Update Script

Create `db/update-article.ts`:
```typescript
import { db, BlogPosts } from 'astro:db';
import { eq } from 'astro:db';

export default async function updateArticle() {
  await db
    .update(BlogPosts)
    .set({
      title: 'Updated Title',
      body: 'Updated content...',
      updatedDate: new Date(),
    })
    .where(eq(BlogPosts.slug, 'article-slug'));
}
```

Run with: `npx astro db execute db/update-article.ts`

---

## Viewing Articles

Articles are automatically displayed on:
- **Blog Index**: `/blog` - Lists all articles
- **Individual Posts**: `/blog/[slug]` - Shows full article

The pages query the database using:
```typescript
// Get all articles
const posts = await db.select().from(BlogPosts).orderBy(desc(BlogPosts.pubDate));

// Get single article
const post = await db.select().from(BlogPosts).where(eq(BlogPosts.slug, slug));
```

---

## Database Location

Astro DB uses SQLite by default. The database file is located at:
- `.astro/db.sqlite` (local development)
- Or configured remote database (production)

---

## Tips & Best Practices

1. **Slugs**: Use URL-friendly slugs (lowercase, hyphens, no spaces)
   - ✅ Good: `my-awesome-post`
   - ❌ Bad: `My Awesome Post!`

2. **Dates**: Always use proper date format in frontmatter:
   - ✅ Good: `pubDate: 2024-01-25`
   - ✅ Good: `pubDate: 2024-01-25T10:00:00Z`

3. **Tags**: Use consistent tag naming (lowercase recommended)
   - ✅ Good: `['tutorial', 'astro', 'database']`
   - ❌ Bad: `['Tutorial', 'Astro', 'Database']`

4. **Body Content**: Write in markdown - it will be converted to HTML automatically

5. **Hero Images**: Use paths relative to `public/` folder
   - ✅ Good: `/images/hero.jpg`
   - ❌ Bad: `../images/hero.jpg`

---

## Troubleshooting

### Article not appearing?
- Check if seed script ran successfully
- Verify slug doesn't already exist
- Check browser console for errors
- Restart dev server: `npm run dev`

### Duplicate slug error?
- Each slug must be unique (it's the primary key)
- Change the slug in your markdown filename or articleData

### Content not rendering?
- Verify markdown syntax is correct
- Check that `marked` package is installed
- Ensure `body` field contains valid markdown

---

## Example: Complete Workflow

Here's a complete example of adding a new article:

1. **Create markdown file**: `src/content/blog/my-tutorial.md`
2. **Add content**:
   ```markdown
   ---
   title: My Tutorial
   description: Learn something new
   pubDate: 2024-01-25
   tags: ['tutorial']
   ---
   
   # My Tutorial
   
   Content here...
   ```
3. **Run seed**: `npx astro db execute db/seed.ts`
4. **Verify**: Visit `http://localhost:4321/blog/my-tutorial`

That's it! Your article is now in the database and visible on your site.
