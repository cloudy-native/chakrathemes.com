# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

- Built with Gatsby and Chakra UI
- Components: `src/components`
- Pages: `src/pages`
- Theme configuration: `src/theme`
- Editor functionality: `src/components/ThemeEditor`

## Coding Conventions

- Use TypeScript for type safety
- Use lucide-react for all icons
- Follow Prettier configuration (double quotes, semi: true, printWidth: 100)
- Unused variables: prefix with `_` to suppress warnings
- Error handling: use try/catch with explicit error typing
- Component naming: PascalCase for components, camelCase for utils/hooks
- Imports order: React > third-party libraries > project imports
- Keep components focused and modular
- Use Chakra UI for styling and components