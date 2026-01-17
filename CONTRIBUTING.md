# Contributing to OpenSecFlow Website

Thank you for your interest in contributing to the OpenSecFlow Website! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Automated Workflow](#automated-workflow)
- [Code Standards](#code-standards)
- [Project-Specific Guidelines](#project-specific-guidelines)
- [Troubleshooting](#troubleshooting)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and considerate in all interactions.

## Getting Started

### Types of Contributions

We welcome various types of contributions:

- Bug fixes and bug reports
- New features and enhancements
- Documentation improvements
- Code refactoring
- Performance optimizations
- SEO improvements
- UI/UX enhancements

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **npm** (comes with Node.js)
- **Git**

You can verify your installations:

```bash
node --version  # Should be 18.x or higher
npm --version
git --version
```

### Forking and Cloning

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/opensecflow-website.git
cd opensecflow-website
```

3. **Add the upstream repository** (to sync with the main project):

```bash
git remote add upstream https://github.com/OpenSecFlow/opensecflow-website.git
```

### Installing Dependencies

Install all project dependencies:

```bash
npm install
```

### Setting Up the Development Environment

1. **Start the development server**:

```bash
npm run dev
```

2. **Open your browser** and navigate to `http://localhost:4321`

The development server will automatically reload when you make changes to files.

### Database Setup (Optional)

If you're working with blog posts or need the database locally:

1. The project uses Astro DB with SQLite
2. The database is automatically created in `.astro/db.sqlite` when you run the dev server
3. To seed the database with blog posts from markdown files:

```bash
npx astro db execute scripts/seed.ts
```

For more information about blog management, see [BLOG_MANAGEMENT.md](./BLOG_MANAGEMENT.md).

## Development Workflow

### Creating a Feature Branch

**Important**: Always create a new branch for your changes. Never commit directly to the `main` branch.

1. **Update your local main branch**:

```bash
git checkout main
git pull upstream main
```

2. **Create a new feature branch**:

```bash
git checkout -b feature/your-feature-name
```

**Branch Naming Conventions**:
- `feature/` - for new features
- `fix/` - for bug fixes
- `docs/` - for documentation changes
- `refactor/` - for code refactoring
- `style/` - for formatting/style changes
- `perf/` - for performance improvements

Examples:
- `feature/add-search-functionality`
- `fix/navigation-mobile-issue`
- `docs/update-contributing-guide`

### Making Changes

1. Make your changes to the codebase
2. **Test your changes locally**:

```bash
# Run the dev server to test
npm run dev

# Build to ensure there are no build errors
npm run build

# Preview the production build
npm run preview
```

3. **Ensure your code follows the project's code standards** (see [Code Standards](#code-standards))

### Committing Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add search functionality to blog page"
```

**Commit Message Guidelines**:
- Use the present tense ("add feature" not "added feature")
- Use the imperative mood ("move cursor to..." not "moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when applicable

**Commit Message Prefixes**:
- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pushing Your Branch

Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

## Pull Request Process

### Creating a Pull Request

1. **Go to your fork** on GitHub
2. **Click "New Pull Request"**
3. **Select your branch** to compare with the main branch
4. **Fill out the PR template** with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots (if applicable)
   - Related issues (if any)

### PR Title and Description Guidelines

**Title Format**:
```
[Type] Brief description
```

Examples:
- `[Feature] Add search functionality to blog`
- `[Fix] Resolve mobile navigation menu issue`
- `[Docs] Update contributing guidelines`

**Description Should Include**:
- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots or examples (if applicable)
- Any breaking changes (if applicable)

### Review Process

1. **Automated checks** will run (see [Automated Workflow](#automated-workflow))
2. **Maintainers will review** your PR
3. **Address any feedback** by pushing additional commits to your branch
4. **Once approved**, your PR will be merged into `main`

### After Your PR is Merged

Once your PR is merged:
1. The automated workflow will trigger
2. The site will be built and deployed to Cloudflare Pages
3. Your changes will be live on the production site

## Automated Workflow

### Overview

This project uses GitHub Actions to automatically build and deploy the site when code is pushed to the `main` branch.

### When the Workflow Triggers

The workflow automatically runs when:
- Code is pushed to the `main` branch
- A pull request is merged into `main`

**Note**: The workflow does NOT run on feature branches. It only runs on `main` to deploy to production.

### What the Workflow Does

The deployment workflow (`.github/workflows/deploy.yaml`) performs the following steps:

1. **Checkout Code**: Checks out the repository code
2. **Setup Node.js**: Sets up Node.js version 20
3. **Install Dependencies**: Runs `npm ci` to install dependencies
4. **Build Astro Site**: Runs `npm run build` to create the production build
5. **Deploy to Cloudflare Pages**: Deploys the `dist` folder to Cloudflare Pages

### Checking Workflow Status

1. Go to the **Actions** tab in the GitHub repository
2. Click on the workflow run to see detailed logs
3. Each step shows its status (success, failure, or in progress)

### Workflow Success

When the workflow succeeds:
- The site is built successfully
- The site is deployed to Cloudflare Pages
- Your changes are live on the production site

### Workflow Failure

If the workflow fails:
- Check the workflow logs in the Actions tab
- Common causes:
  - Build errors (TypeScript errors, missing dependencies)
  - Test failures
  - Deployment configuration issues
- Fix the issues and push again to trigger a new workflow run

### Important Notes

- **Never push directly to `main`** - Always use feature branches and pull requests
- **Test locally first** - Run `npm run build` before pushing to catch errors early
- **The workflow only runs on `main`** - Feature branches won't trigger deployment
- **Deployment is automatic** - Once merged to `main`, deployment happens automatically

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names

### Astro Components

- Use `.astro` extension for Astro components
- Keep components focused and reusable
- Use proper semantic HTML
- Follow the existing component structure

Example component structure:

```astro
---
// Component script (TypeScript)
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!-- Component template -->
<div class="component">
  <h1>{title}</h1>
</div>

<style>
  /* Component styles */
  .component {
    /* styles */
  }
</style>
```

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow the existing design system
- Use responsive classes appropriately
- Keep custom CSS to a minimum

### File Naming Conventions

- **Components**: PascalCase (e.g., `Navigation.astro`, `HeroSection.astro`)
- **Pages**: kebab-case (e.g., `blog-index.astro`, `about-page.astro`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `apiHelpers.ts`)
- **Config files**: kebab-case (e.g., `astro.config.mjs`, `tailwind.config.mjs`)

### Code Formatting

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions small and focused
- Follow existing code style in the project

## Project-Specific Guidelines

### Blog Posts

If you're contributing blog posts:

1. See [BLOG_MANAGEMENT.md](./BLOG_MANAGEMENT.md) for detailed instructions
2. Create markdown files in `src/content/blog/`
3. Run the seed script to add to database: `npx astro db execute scripts/seed.ts`

### Component Development

- Create reusable components in `src/components/`
- Use TypeScript for type safety
- Follow the existing component patterns
- Ensure components are responsive

### SEO Considerations

- Use semantic HTML elements
- Include proper meta tags (handled by SEO component)
- Add alt text to images
- Use descriptive headings (h1, h2, h3, etc.)
- Ensure proper heading hierarchy

### Testing Requirements

Before submitting a PR:

1. **Test locally**: Run `npm run dev` and verify your changes work
2. **Build successfully**: Run `npm run build` to ensure no build errors
3. **Preview production**: Run `npm run preview` to see the production build
4. **Check responsiveness**: Test on different screen sizes
5. **Verify accessibility**: Ensure proper semantic HTML and ARIA attributes

## Troubleshooting

### Common Setup Issues

**Issue**: `npm install` fails
- **Solution**: Ensure you have Node.js 18+ installed. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

**Issue**: Dev server won't start
- **Solution**: Check if port 4321 is already in use. Try `npm run dev -- --port 4322`

**Issue**: Database errors
- **Solution**: Delete `.astro/db.sqlite` and let it recreate. Run the seed script if needed.

### Build Errors

**Issue**: TypeScript errors
- **Solution**: Check your TypeScript syntax. Ensure all imports are correct.

**Issue**: Missing dependencies
- **Solution**: Run `npm install` to ensure all dependencies are installed.

**Issue**: Build fails in CI but works locally
- **Solution**: Ensure you're using the same Node.js version. The workflow uses Node.js 20.

### Workflow Failures

**Issue**: Workflow fails on "Install dependencies"
- **Solution**: Check `package-lock.json` is committed and up to date.

**Issue**: Workflow fails on "Build Astro site"
- **Solution**: Test the build locally with `npm run build` to catch errors before pushing.

**Issue**: Workflow fails on "Deploy to Cloudflare Pages"
- **Solution**: This is usually a configuration issue. Check that the Cloudflare project exists and secrets are configured correctly.

### Getting Help

If you encounter issues not covered here:

1. Check existing issues on GitHub
2. Search the documentation
3. Ask for help in a new GitHub issue
4. Reach out to maintainers

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [BLOG_MANAGEMENT.md](./BLOG_MANAGEMENT.md) - Guide for managing blog posts

Thank you for contributing to OpenSecFlow Website!
