# GitHub Pages Deployment Setup Guide

This guide walks you through setting up GitHub Actions for CI/CD and deploying to GitHub Pages.

## Prerequisites

- GitHub repository with this code
- Algolia account with API credentials

## Step 1: Configure GitHub Secrets

The application requires Algolia environment variables to build. These must be added as GitHub Secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add each of the following:

   | Secret Name | Description | Example Value |
   |-------------|-------------|---------------|
   | `NEXT_PUBLIC_ALGOLIA_APP_ID` | Your Algolia Application ID | `ABC123DEF456` |
   | `NEXT_PUBLIC_ALGOLIA_API_KEY` | Your Algolia Search API Key | `a1b2c3d4e5f6...` |
   | `NEXT_PUBLIC_AGENT_ID` | Your Algolia Agent ID | `agent_xyz789` |

   **Important**: These are `NEXT_PUBLIC_` prefixed variables, which means they will be embedded in your static build and will be visible in the deployed application's JavaScript. Use a Search-Only API key, never an Admin API key.

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This tells GitHub to use the deployment workflow we created

That's it! The workflow will handle the rest automatically.

## Step 3: Verify Deployment

1. Make a commit and push to the `main` branch
2. Go to the **Actions** tab in your repository
3. You should see two workflows running:
   - **CI**: Lints, formats, and builds the code
   - **Deploy to GitHub Pages**: Builds and deploys to GitHub Pages

4. Once the deployment completes (usually 2-5 minutes), your site will be available at:
   ```
   https://{your-username}.github.io/{repo-name}/
   ```

## Workflows Overview

### CI Workflow (`ci.yml`)

**Triggers**: Push or Pull Request to `main` or `develop` branches

**Steps**:
1. Checkout code
2. Setup pnpm and Node.js
3. Install dependencies
4. Check code formatting (Prettier)
5. Run linter (ESLint)
6. Build Next.js with environment variables
7. Upload build artifacts

### Deployment Workflow (`deploy.yml`)

**Triggers**: Push to `main` branch only

**Steps**:
1. **Build Job**:
   - Checkout code
   - Setup pnpm and Node.js
   - Configure GitHub Pages
   - Install dependencies
   - Build Next.js with environment variables
   - Upload pages artifact

2. **Deploy Job**:
   - Deploy artifact to GitHub Pages
   - Runs in `github-pages` environment

## Troubleshooting

### Build Fails with "Missing required Algolia environment variables"

**Solution**: Ensure all three secrets are properly configured in GitHub repository settings.

### Deployment Workflow Doesn't Appear

**Solution**: 
1. Ensure you've pushed the `.github/workflows/` directory to your repository
2. Check that the workflow files are in the correct location
3. Verify the workflows are enabled in Settings > Actions > General

### GitHub Pages Returns 404

**Solution**:
1. Verify GitHub Pages is enabled and source is set to "GitHub Actions"
2. Check the deployment workflow completed successfully
3. Wait a few minutes for DNS propagation

### Changes Don't Appear on Deployed Site

**Solution**:
1. GitHub Pages may cache aggressively. Try:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Try in incognito/private browsing mode

## Local Development with Environment Variables

For local development, create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_API_KEY=your_api_key
NEXT_PUBLIC_AGENT_ID=your_agent_id
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Security Considerations

- ✅ Use Search-Only API keys for `NEXT_PUBLIC_ALGOLIA_API_KEY`
- ❌ Never use Admin API keys in client-side code
- ⚠️ Remember: `NEXT_PUBLIC_` variables are visible in the browser
- ✅ Keep sensitive admin credentials in backend services only

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Algolia Documentation](https://www.algolia.com/doc/)
