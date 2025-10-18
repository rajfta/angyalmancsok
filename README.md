# Angyalmancsok

## [Kutyaterápiás honlap](https://www.angyalmancsok.hu)

A therapy dog foundation website built with Astro, React, and TinaCMS.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server with TinaCMS admin
pnpm dev

# Access TinaCMS admin panel
# Navigate to http://localhost:3009/admin
```

## 📝 Content Management

All content is managed through **TinaCMS** - a Git-based CMS:

- **Admin Panel**: `http://localhost:3009/admin` (when running `pnpm dev`)
- **Content Files**: Stored as MDX in `src/content/`
- **Automatic Saving**: Changes save directly to Git

### Content Types

- **Dogs** (`src/content/dogs/`) - Therapy dog profiles
- **Members** (`src/content/members/`) - Trainer/team profiles
- **Posts** (`src/content/posts/`) - Blog articles
- **Testimonials** (`src/content/testimonials/`) - Client feedback
- **Partners** (`src/content/partners/`) - Partner organizations
- **Programs** (`src/content/programs/`) - Program descriptions

### Editing Content

1. Run `pnpm dev`
2. Open `/admin` in your browser
3. Select a collection (Dogs, Members, etc.)
4. Edit visually - changes save to MDX files
5. Commit changes to Git

## 🛠 Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with TinaCMS |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm check` | Run linter/formatter check |
| `pnpm check:write` | Auto-fix linting issues |

## 📦 Tech Stack

- **Framework**: [Astro](https://astro.build/) 4.x
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **CMS**: [TinaCMS](https://tina.io/)
- **Code Quality**: Biome
- **Animations**: Framer Motion
- **Components**: Radix UI

## 📁 Project Structure

```
src/
├── content/          # Content collections (MDX)
│   ├── dogs/
│   ├── members/
│   ├── posts/
│   ├── testimonials/
│   ├── partners/
│   └── programs/
├── components/       # React & Astro components
├── layouts/          # Page layouts
├── pages/            # Routes
└── styles/           # Global styles

.tina/
└── config.ts         # TinaCMS schema
```

## 🎨 Key Features

- ✅ Static site generation (SSG)
- ✅ Git-based content management
- ✅ Visual content editing
- ✅ Responsive design
- ✅ Hungarian language support
- ✅ SEO optimized
- ✅ Type-safe content schemas

## 📝 Notes

- Content relationships use file slugs (e.g., `owner: "gemesi-rita"`)
- Dogs and trainers have bidirectional references
- Priority field controls display order
- All content versioned in Git automatically
