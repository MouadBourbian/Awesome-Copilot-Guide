# Awesome Copilot Guide

A modern Next.js application with TypeScript, Shadcn UI, and comprehensive development tooling.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Testing**: [Vitest](https://vitest.dev/) with React Testing Library
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

Dependencies are already installed. To reinstall:

```bash
pnpm install
```

### Development

Start the development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 🧪 Testing

Run tests:

```bash
pnpm test
```

Run tests with UI:

```bash
pnpm test:ui
```

## 🎨 Code Quality

### Linting

```bash
pnpm lint
```

### Formatting

Format all files:

```bash
pnpm format
```

Check formatting:

```bash
pnpm format:check
```

## 🎯 Project Structure

```
.
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   └── ui/          # Shadcn UI components
│   ├── lib/             # Utility functions
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
├── .github/             # GitHub configuration
└── tests/               # Test files
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration
- `vitest.config.ts` - Vitest configuration
- `.prettierrc` - Prettier configuration
- `components.json` - Shadcn UI configuration

## 📚 Adding UI Components

This project uses Shadcn UI. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

Components will be added to `src/components/ui/`.

## 🤝 Contributing

1. Follow the existing code style
2. Run linting and tests before committing
3. Use Prettier for consistent formatting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
