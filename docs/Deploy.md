# Deployment

This project is configured for static export and deployment to GitHub Pages using GitHub Actions.

## Requirements

To deploy this application, you need:

1. A GitHub repository hosting this code.
2. Configured GitHub Secrets.

## Configuration

### GitHub Secrets

Navigate to your repository **Settings** > **Secrets and variables** > **Actions** and add the following repository secrets:

- `NEXT_PUBLIC_ALGOLIA_APP_ID`
- `NEXT_PUBLIC_ALGOLIA_API_KEY`
- `NEXT_PUBLIC_AGENT_ID`

These variables are required during the build process to embed the configuration into the static files.

### GitHub Pages Source

Ensure your repository is set to deploy via GitHub Actions:

1. Go to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

## References

- [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Using variables in GitHub Actions](https://docs.github.com/de/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)
