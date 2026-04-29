# yorkejohn.dev

A modern personal portfolio and developer tools website built with [Next.js](https://nextjs.org), featuring an interactive 3D starry background, developer utilities, and project showcase.

## Features

- **Home Page** - Hero landing page with interactive 3D starry background animation
- **About** - Personal information and background
- **Projects** - Showcase of projects and work
- **DevTools** - Utility collection including:
  - JSON Formatter - Format and validate JSON with syntax highlighting
- **Responsive Design** - Mobile-first responsive layout
- **Dark Theme** - Modern dark theme with custom styling
- **Interactive Components** - Built with Radix UI and Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with [@tailwindcss/typography](https://tailwindcss.com/docs/plugins#typography)
- **3D Graphics**: [Three.js](https://threejs.org) with [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **UI Components**: [Radix UI](https://www.radix-ui.com) + [shadcn](https://shadcn.dev)
- **Icons**: [@phosphor-icons/react](https://phosphoricons.com)
- **Code Highlighting**: [highlight.js](https://highlightjs.org)
- **Linting & Formatting**: [Biome](https://biomejs.dev)
- **Runtime**: [React 19](https://react.dev)

## Getting Started

### Prerequisites

- Node.js 18+ 
- [bun](https://bun.sh)

### Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The page will automatically update as you edit files.

### Build & Production

```bash
bun run build
bun start
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun start` - Start production server
- `bun run check` - Run Biome linter
- `bun run format` - Format code with Biome
- `bun run fix` - Format and fix issues with Biome
- `bun run fix:unsafe` - Format and fix with unsafe transformations

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── (main)/            # Main route group
│       ├── about/         # About page
│       ├── projects/      # Projects page
│       └── devtools/      # Developer tools
│           └── json-formatter/  # JSON formatter tool
├── components/            # React components
│   ├── pages/            # Page-level components
│   ├── ui/               # Reusable UI components
│   └── nav/              # Navigation components
└── lib/                  # Utilities and helpers
```

## Customization

### Colors & Styling

Edit tailwind.config.ts to customize colors, fonts, and theme.

### Components

Reusable UI components are located in src/components/ui/.

### Fonts

Configure fonts in src/lib/fonts.ts.

## Development Tools

This project uses [Biome](https://biomejs.dev) for linting and formatting. Configuration is in biome.json.

## Deployment

Deploy easily on [Vercel](https://vercel.com):

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel automatically detects Next.js and deploys

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
