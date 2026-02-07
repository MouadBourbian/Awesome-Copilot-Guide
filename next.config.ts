import type { NextConfig } from 'next';

// This environment variable is automatically set by GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS || process.env.GITHUB_EVENT_NAME;

let repoName = '';

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
}

const basePath = isGithubActions && repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
