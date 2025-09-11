# Project Graphics Assets

This folder contains all static graphics assets for the Character Saga project.

## Folder Structure

### `/images/`
- **Purpose**: Main content images
- **Examples**: character photos, screenshots, banners, background images
- **Formats**: JPG, PNG, WebP
- **Recommendations**: 
  - Use WebP for better optimization
  - Create multiple sizes for responsive design
  - Naming: `hero-banner.webp`, `character-avatar-1.png`

### `/icons/`
- **Purpose**: Interface icons and functional elements
- **Examples**: menu icons, social media icons, action icons
- **Formats**: SVG (preferred), PNG
- **Recommendations**:
  - Use SVG for scalability
  - Sizes: 16x16, 24x24, 32x32, 48x48 pixels
  - Naming: `menu-icon.svg`, `twitter-icon.svg`

### `/logos/`
- **Purpose**: Logos and branding elements
- **Examples**: company logo, partner logos
- **Formats**: SVG, PNG
- **Recommendations**:
  - Create versions for light and dark themes
  - Different sizes: small, medium, large
  - Naming: `logo-light.svg`, `logo-dark.svg`, `partner-logo.png`

### `/illustrations/`
- **Purpose**: Illustrations and decorative elements
- **Examples**: illustrations for empty states, errors, onboarding
- **Formats**: SVG, PNG
- **Recommendations**:
  - Use SVG for vector illustrations
  - Maintain consistent style
  - Naming: `empty-state.svg`, `error-illustration.png`

## Best Practices

### Optimization
- Compress images before adding
- Use modern formats (WebP, AVIF)
- Create responsive versions of images

### File Naming
- Use kebab-case: `my-image.png`
- Add sizes: `logo-32x32.png`
- Specify purpose: `hero-banner-mobile.webp`

### Accessibility
- Add alt-texts for all images
- Use semantically correct file names
- Ensure contrast for icons

## Usage in Code

```tsx
// Import from public folder
import Image from 'next/image'

// Usage
<Image 
  src="/images/hero-banner.webp" 
  alt="Image description"
  width={800}
  height={400}
/>

// For icons
<img src="/icons/menu-icon.svg" alt="Menu" />
```

## Recommended Tools

- **Optimization**: TinyPNG, Squoosh
- **Conversion**: CloudConvert, Online-Convert
- **SVG editing**: SVGOMG, SVG-Edit