# ChakraThemes.com

A powerful visual editor for creating and customizing Chakra UI themes. Build beautiful, consistent design systems without writing code.

<p align="center">
  <a href="https://chakra-ui.com/">
    <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/logo/logo-colored@2x.png?raw=true" alt="Chakra UI logo" width="300" />
  </a>
</p>

## What is ChakraThemes.com?

ChakraThemes.com is an interactive web application that helps designers and developers create custom Chakra UI themes through a visual interface. It allows you to:

- Create and customize color palettes
- Configure spacing and sizing
- Adjust border radius and shadows
- Preview components with your theme changes in real-time
- Export your theme as ready-to-use Chakra UI code

Stop hand-crafting theme files and struggling with color scales. Our visual editor makes it easy to create professional, cohesive design systems.

## Features

- **Color Management**:
  - Create color palettes from color pickers
  - Extract colors from uploaded images
  - Browse curated inspiration palettes with pre-defined color schemes
  - Preview color shades and variants
  - Manage multiple color categories

- **Spacing and Layout**:
  - Configure consistent spacing tokens
  - Visual spacing preview and editing

- **Borders and Shadows**:
  - Edit border radius values with live preview
  - Customize shadows with copy-to-clipboard code snippets
  - Interactive preview of shadow and border styles on real components

- **Component Preview**:
  - See your theme applied to common UI components
  - Explore a variety of card layouts and designs
  - Test tables with different styles and theming options
  - Test how components look in light and dark mode
  - Verify design consistency across your UI

- **Export Options**:
  - Generate Chakra UI theme configuration
  - Copy code snippets directly from the interface

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cloudy-native/chakrathemes.com.git
   cd chakrathemes.com
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run develop
   # or
   yarn develop
   ```

4. Open [http://localhost:8000](http://localhost:8000) in your browser.

## How to Use

### Creating a New Theme

1. Start by selecting the "Colors" tab and add your primary brand colors
2. Use the color picker or choose from theme presets
3. Use the "Image Color" tab to extract colors from uploaded images
5. Configure spacing values in the "Spacing" tab
6. Adjust border radius and shadows in the "Borders & Shadows" tab
7. Preview theme elements in the "Cards & Layouts" tab
8. Preview your theme with components in the "Components Preview" tab
9. Copy the generated theme code to use in your Chakra UI project

### Working with Colors

The Colors tab provides a unified interface for creating and managing color palettes:

- Add new colors by clicking the "New Color" button
- Use the dedicated color picker tab for detailed color selection
- Use the "Image Color" tab to extract and use colors from uploaded images 
- Browse theme presets for quick starting points
- Explore themed inspiration palettes like "Summer Breeze," "Retro Wave," or "Cosmic Voyage"
- Name your color (e.g., "primary", "accent", "brand")
- The editor automatically generates a full color palette with shades

## Project Structure

Key files and directories in the project:

```
src/
├── components/               # UI components
│   ├── ThemeEditor/          # Main theme editor components
│   │   ├── components/       # Reusable editor components
│   │   │   ├── ColorInput.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── ColorTooltip.tsx
│   │   │   ├── ImageColorExtractor.tsx
│   │   │   ├── InspirationPalettes.tsx
│   │   │   ├── NewColorModal.tsx
│   │   │   ├── PaletteGenerator.tsx
│   │   │   ├── PalettePreview.tsx
│   │   │   ├── ThemeColorSwatch.tsx
│   │   │   ├── preview/      # Component preview elements
│   │   │   │   ├── AlertElements.tsx
│   │   │   │   ├── AvatarElements.tsx
│   │   │   │   ├── BasicElements.tsx
│   │   │   │   ├── BorderElements.tsx
│   │   │   │   ├── BuiltInSchemas.tsx
│   │   │   │   ├── ButtonStyles.tsx
│   │   │   │   ├── CardLayouts.tsx
│   │   │   │   ├── ColorPalette.tsx
│   │   │   │   ├── CombinedStylesPreview.tsx
│   │   │   │   ├── ComponentPreview.tsx
│   │   │   │   ├── InputElements.tsx
│   │   │   │   ├── ProgressElements.tsx
│   │   │   │   ├── ShadowElements.tsx
│   │   │   │   ├── TableLayouts.tsx
│   │   │   │   ├── TagElements.tsx
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── tabs/             # Tab content components
│   │   │   ├── BordersAndShadowsTab.tsx
│   │   │   ├── CardLayoutsTab.tsx
│   │   │   ├── ColorManagementTab.tsx
│   │   │   ├── ColorPickerTab.tsx
│   │   │   ├── ComponentsPreviewTab.tsx
│   │   │   ├── ImageColorTab.tsx
│   │   │   ├── SpacingTab.tsx
│   │   │   ├── ThemePresetsTab.tsx
│   │   └── index.tsx         # Main ThemeEditor component
│   ├── Layout.tsx            # Site layout component
│   ├── Header.tsx            # Site header component
│   └── Footer.tsx            # Site footer component
├── context/                  # React context providers
│   └── ThemeContext.tsx      # Theme state management
├── hooks/                    # Custom React hooks
│   ├── useColorManagement.ts          # Color management logic
│   ├── useImageColorExtraction.ts     # Extract colors from images
│   ├── useSpacingAndRadius.ts         # Spacing and border radius logic
│   ├── useThemeValues.ts              # Default theme values
├── pages/                    # Gatsby pages
│   ├── index.tsx             # Home page with theme editor
│   └── 404.tsx               # Not found page
├── types/                    # TypeScript type definitions
│   └── index.ts              # Theme-related type definitions
└── utils/                    # Utility functions
    ├── colorUtils.ts         # Color manipulation utilities
    ├── inspirationPalettes.ts # Pre-defined color palette themes
    └── unsplashCollections.ts # Unsplash collection IDs for images
```

### Most Important Files

- **src/components/ThemeEditor/index.tsx**: Main component that renders the tabbed interface
- **src/context/ThemeContext.tsx**: Manages the state of the theme being edited
- **src/hooks/useThemeValues.ts**: Contains default theme values and structure
- **src/components/ThemeEditor/tabs/ColorManagementTab.tsx**: Unified interface for creating and managing colors
- **src/components/ThemeEditor/tabs/ImageColorTab.tsx**: Interface for extracting colors from uploaded images
- **src/components/ThemeEditor/components/PalettePreview.tsx**: Reusable color palette preview component
- **src/components/ThemeEditor/components/InspirationPalettes.tsx**: Curated color palette inspiration browser
- **src/components/ThemeEditor/tabs/BordersAndShadowsTab.tsx**: Controls for editing border radius and shadows
- **src/components/ThemeEditor/components/preview/BorderElements.tsx**: Visual preview of border radius
- **src/components/ThemeEditor/components/preview/ShadowElements.tsx**: Visual preview of shadows
- **src/components/ThemeEditor/components/preview/CombinedStylesPreview.tsx**: Interactive preview of shadow and border styles on UI components
- **src/components/ThemeEditor/components/preview/CardLayouts.tsx**: Collection of card components with varying layouts and styles
- **src/components/ThemeEditor/components/preview/TableLayouts.tsx**: Various table designs with different styling options
- **src/components/ThemeEditor/tabs/ComponentsPreviewTab.tsx**: Shows preview of UI components with applied theme
- **src/types/index.ts**: TypeScript definitions for the theme structure

## Technical Implementation

ChakraThemes.com is built using:

- **Gatsby**: For static site generation and routing
- **TypeScript**: For type safety and better developer experience
- **Chakra UI**: For the UI components and theming system
- **React**: As the primary UI library
- **node-vibrant**: For color extraction from images

Key design patterns:

- **Context API**: Used for theme state management
- **Custom Hooks**: For encapsulating specific functionality
- **Component Composition**: For building a modular, maintainable UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Chakra UI](https://chakra-ui.com/) - The component library that inspired this project
- [Gatsby](https://www.gatsbyjs.com/) - The framework powering this application
- [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer experience
- [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant) - For color extraction from images

## Future Enhancements

### Export Options
- [ ] Add export to JSON file option
- [ ] Create direct integration with GitHub to create a PR to your theme repo
- [ ] Enable exporting to CSS variables
- [ ] Add option to create a shareable theme URL

### Color Management
- [ ] Add color accessibility checking (WCAG compliance)
- [ ] Implement color relationship visualization (complementary, analogous, etc.)
- [ ] Add AI-powered color suggestions based on brand guidelines
- [ ] Support color blind simulation views

### Component Preview
- [ ] Add more component examples in preview
- [ ] Create a "playground" mode to test component combinations
- [ ] Enable editing component props directly in preview
- [ ] Add responsive design preview at different breakpoints

### User Experience
- [ ] Implement undo/redo functionality
- [ ] Add theme presets as starting points
- [ ] Save themes to local storage to prevent data loss
- [ ] Implement theme version history

### Advanced Features
- [ ] Add custom component styling beyond basic Chakra components
- [ ] Create theme comparison view to see before/after changes
- [ ] Enable theme sharing and collaboration features
- [ ] Implement advanced animation and transition customization
- [ ] Add theme upload and compare
- [ ] Add semantic token support and management
- [ ] Create a CLI tool to apply themes directly to existing projects