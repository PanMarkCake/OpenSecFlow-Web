/**
 * Utility functions for parsing tutorial markdown content
 */

/**
 * Extract the title from markdown content (first H1 heading)
 */
export function extractTitle(markdown: string): string {
  // Remove frontmatter if present
  const contentWithoutFrontmatter = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Find first H1 heading
  const h1Match = contentWithoutFrontmatter.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  // Fallback: use filename or default
  return 'Tutorial';
}

/**
 * Extract summary from markdown content (first paragraph after title)
 */
export function extractSummary(markdown: string): string {
  // Remove frontmatter if present
  const contentWithoutFrontmatter = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Remove the first H1 heading
  const withoutTitle = contentWithoutFrontmatter.replace(/^#\s+.+$/m, '').trim();
  
  // Find first paragraph (text block before first heading or list)
  // Look for blockquote first (common for summaries)
  const blockquoteMatch = withoutTitle.match(/^>\s*(.+)$/m);
  if (blockquoteMatch) {
    return blockquoteMatch[1].trim();
  }
  
  // Find first paragraph (non-empty line that's not a heading, list, or code block)
  const lines = withoutTitle.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines, headings, lists, code blocks, horizontal rules
    if (
      trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('-') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('```') &&
      !trimmed.startsWith('---') &&
      !trimmed.match(/^\d+\./)
    ) {
      // Remove markdown formatting
      return trimmed
        .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
        .replace(/\*(.+?)\*/g, '$1') // Italic
        .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
        .trim();
    }
  }
  
  // Fallback: return first 150 characters
  return withoutTitle.substring(0, 150).trim() + '...';
}

/**
 * Generate a URL-friendly slug from a title or filename
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
