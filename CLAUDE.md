# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angyalmancsok is a dog therapy website (https://www.angyalmancsok.hu) built with Astro, React, TypeScript, and Tailwind CSS. Content is managed through TinaCMS (Git-based CMS), featuring information about therapy dogs, their trainers, and therapy programs.

## Development Commands

```bash
# Development
pnpm dev          # Start dev server with TinaCMS admin
pnpm start        # Alias for dev (without TinaCMS)

# Build & Preview
pnpm build        # Type check and build for production
pnpm preview      # Preview production build

# Code Quality
pnpm check        # Run Biome linter and formatter (dry-run)
pnpm check:write  # Run Biome with auto-fix
pnpm check:unsafe # Run Biome with unsafe auto-fixes
```

## Architecture

### Tech Stack
- **Framework**: Astro 4.x with React integration
- **Styling**: Tailwind CSS with custom design system
- **CMS**: TinaCMS (Git-based, file-backed)
- **Type Safety**: TypeScript with strictest Astro config
- **Code Quality**: Biome (formatter & linter)

### File Structure
- `src/pages/*.astro` - Route pages (index, rolunk, cikkek)
- `src/layouts/Layout.astro` - Base layout with header, footer, and global styles
- `src/components/` - React components (`.tsx`) and Astro components
- `src/content/` - Content collections (MDX files)
  - `dogs/` - Therapy dog profiles
  - `members/` - Trainer/team member profiles
  - `posts/` - Blog articles
  - `testimonials/` - Client testimonials
  - `partners/` - Partner organizations
  - `programs/` - Therapy program descriptions
- `src/content/config.ts` - Astro content collection schemas
- `.tina/config.ts` - TinaCMS schema and configuration
- `src/styles/globals.css` - Global Tailwind styles

### Path Aliases
- `~/*` maps to `./src/*` (configured in tsconfig.json)

### TinaCMS Integration

**How it works:**
- Content stored as MDX files in `src/content/`
- TinaCMS provides visual editing interface at `/admin`
- Changes saved directly to Git repository
- No external API or database required

**Access Admin Panel:**
- Run `pnpm dev`
- Navigate to `http://localhost:3009/admin`
- Edit content visually, saves to MDX files

**Content Collections:**
- **Dogs**: Therapy dogs with name, photos, workplaces, trainer reference, certificates (SEGÍTŐ/TANULÓ/TERÁPIÁS), priority
- **Members**: Trainers with name, photo, role, dog references, titles/certifications, priority
- **Posts**: Blog posts with title, slug, thumbnail, description, date, content, gallery
- **Testimonials**: Client feedback with quote, author, dog name, handler name, photo
- **Partners**: Partner organizations with name, logo, website
- **Programs**: Therapy program types with title, description, icon

**Relationships:**
- Dogs reference trainers via `owner` field (file slug, e.g., "gemesi-rita")
- Members reference dogs via `dogs` array (file slugs, e.g., ["enid", "isha", "nala"])

**Environment Variables** (optional, only for Tina Cloud):
- `TINA_CLIENT_ID` - Tina Cloud client ID
- `TINA_TOKEN` - Tina Cloud token
- Leave empty for local-only development

### Styling System

**Custom Tailwind Configuration**:
- Primary color: `#81b3c9` (blue tones for therapy/trust)
- Secondary color: Warm browns
- Accent color: `#c381c9` (purple)
- Background: `#f3ede1` (warm off-white)
- Typography: Nunito Variable font

**Custom Utilities**:
- `.container-padding` - Responsive padding
- `.header-spacing` - Spacing for fixed header
- 3D perspective transforms for flip cards
- Custom animations for accordions

### React Integration

- React components use `client:load` directive in Astro files
- Framer Motion for animations
- Radix UI for accessible components (Accordion, Dialog, Popover)
- Custom UI components in `src/components/ui/`

## Key Development Notes

1. **Data Fetching**: Use Astro's `getCollection()` to fetch content from collections
2. **Ordering**: Content typically ordered by `priority` field (ascending for members, descending for dogs)
3. **Type Safety**: Content schemas defined in `src/content/config.ts` using Zod
4. **Client-Side Hydration**: Interactive components require `client:load` or similar directives
5. **Hungarian Language**: Site content is in Hungarian (`lang="hu"`)
6. **Content Editing**: All content editable via TinaCMS admin at `/admin` during development
