![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![GitHub CI/CD](https://img.shields.io/github/actions/workflow/status/MouadBourbian/Awesome-Copilot-Guide/ci.yml)

# Awesome Copilot Guide

A modern Next.js application featuring an AI-powered chat interface using Algolia Agent Studio. Fully built with GitHub Copilot CLI and hosted on GitHub Pages.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Search & AI**: Algolia Agent Studio with Google Gemini
- **Package Manager**: pnpm

## Prerequisites

- Node.js 20+
- pnpm 10+

## Installation

```bash
pnpm install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_API_KEY=your_api_key
NEXT_PUBLIC_AGENT_ID=your_agent_id
```

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Building

Build the application for production:

```bash
pnpm build
```

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier

## Documentation

- [Algolia Configuration](./docs/Algolia.md): Detailed guide on generating the search index, importing data, and configuring the Algolia Agent.
- [Deployment Guide](./docs/Deploy.md): Instructions for configuring GitHub Secrets and deploying the application to GitHub Pages.
