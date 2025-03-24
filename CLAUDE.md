# Commands for Claude

These are commands that Claude should know to run automatically.

## Development Commands

```bash
# Start development server
npm run develop

# Build the site
npm run build

# Lint the code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with prettier
npm run format

# Type check TypeScript files
npm run typecheck
```

## Deployment Commands

```bash
# Deploy to GitHub Pages
npm run deploy
```

## Project Structure Notes

- The project is built with Gatsby and Chakra UI
- Components are located in `src/components`
- Pages are in `src/pages`
- The theme configuration is in `src/theme`
- The editor functionality is in `src/components/ThemeEditor`