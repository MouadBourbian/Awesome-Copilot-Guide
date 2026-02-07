# Awesome Copilot Guide

A modern Next.js application with TypeScript, Shadcn UI, and comprehensive development tooling. Features automated CI/CD with GitHub Actions and GitHub Pages deployment.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: GitHub Pages (Static Export)

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

## 🔄 CI/CD

This project uses GitHub Actions for continuous integration and deployment:

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main` and `develop` branches:

- Checks code formatting with Prettier
- Runs ESLint linting
- Builds the Next.js application with environment variables
- Uploads build artifacts

### Deployment Workflow (`.github/workflows/deploy.yml`)

Automatically deploys to GitHub Pages on push to `main`:

- Builds the static Next.js export with environment variables
- Deploys to GitHub Pages using the official GitHub Actions
- Available at: `https://{username}.github.io/{repo-name}/`

### Required Secrets

Both workflows require the following secrets to be configured in your GitHub repository (Settings > Secrets and variables > Actions):

- `NEXT_PUBLIC_ALGOLIA_APP_ID` - Your Algolia application ID
- `NEXT_PUBLIC_ALGOLIA_API_KEY` - Your Algolia API key
- `NEXT_PUBLIC_AGENT_ID` - Your Algolia agent ID

These environment variables are embedded in the static build at build time.

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
├── .github/
│   └── workflows/       # GitHub Actions workflows
└── out/                 # Static export output (generated)
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration (static export enabled)
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration
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

## 🚀 Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment uses:

- Next.js static export (`output: 'export'`)
- GitHub Actions with proper permissions
- `.nojekyll` file for proper routing
- Environment variables from GitHub Secrets

### Setup Instructions

1. **Configure GitHub Secrets**: Go to Settings > Secrets and variables > Actions and add:
   - `NEXT_PUBLIC_ALGOLIA_APP_ID`
   - `NEXT_PUBLIC_ALGOLIA_API_KEY`
   - `NEXT_PUBLIC_AGENT_ID`

2. **Enable GitHub Pages**: Go to Settings > Pages
   - Source should be set to "GitHub Actions" (automatically configured by the workflow)

3. **Push to main branch**: The deployment workflow will automatically trigger

**Note**: Environment variables with the `NEXT_PUBLIC_` prefix are embedded in the static build at build time and will be publicly visible in the deployed application.

## 🤝 Contributing

1. Follow the existing code style
2. Run linting and formatting before committing
3. Use Prettier for consistent formatting
4. Follow the branching strategy and commit conventions in `.github/instructions/`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
