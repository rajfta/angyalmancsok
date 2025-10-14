# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angyalmancsok is a dog therapy website (https://www.angyalmancsok.hu) built with Astro, React, TypeScript, and Tailwind CSS. Content is managed through Contentful CMS, featuring information about therapy dogs, their owners, and therapy programs.

## Development Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm start        # Alias for dev

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
- **CMS**: Contentful (headless CMS)
- **Type Safety**: TypeScript with strictest Astro config
- **Code Quality**: Biome (formatter & linter)

### File Structure
- `src/pages/*.astro` - Route pages (index, rolunk, cikkek)
- `src/layouts/Layout.astro` - Base layout with header, footer, and global styles
- `src/components/` - React components (`.tsx`) and Astro components
- `src/lib/contentful.ts` - Contentful client initialization and utilities
- `src/types/content.ts` - TypeScript types for Contentful content models
- `src/styles/globals.css` - Global Tailwind styles

### Path Aliases
- `~/*` maps to `./src/*` (configured in tsconfig.json)

### Contentful Integration

**Client Configuration** (`src/lib/contentful.ts`):
- Uses preview API in development, delivery API in production
- Environment variables: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_PREVIEW_TOKEN`, `CONTENTFUL_DELIVERY_TOKEN`
- Helper functions: `isAssetLink()`, `isEntryLink()` for type guards

**Content Models**:
- **Dog**: Therapy dogs with name, thumbnail, photoWithOwner, nicknames, workplaces, owner reference, certificates (SEGÍTŐ/TANULÓ/TERÁPIÁS), priority
- **Member**: Team members with name, title, certificates, content, dogs references, priority
- **Post**: Blog posts with title, slug, thumbnail, description, date, content, gallery

**Important**: When updating relationships in Contentful, you must update references in BOTH directions (e.g., dog's reference to owner AND owner's reference to dogs).

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

1. **Data Fetching**: Contentful queries use `include: 2` to fetch nested relationships (dogs → owners)
2. **Ordering**: Content typically ordered by `priority` field (ascending for members, descending for dogs)
3. **Type Safety**: All Contentful responses are mapped to typed interfaces before use
4. **Client-Side Hydration**: Interactive components require `client:load` or similar directives
5. **Hungarian Language**: Site content is in Hungarian (`lang="hu"`)
