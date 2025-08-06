# Frontend Mentor - News Homepage

![Design preview for the News homepage coding challenge](preview.jpg)

## Overview

A responsive news homepage built with modern CSS and JavaScript, featuring a mobile-first design approach with smooth animations and accessibility features.

**Live Demo:** [View Live Site](https://your-live-url.com)  
**Repository:** [View Source Code](https://github.com/your-username/news-homepage-main)

## Features

### ✨ Core Functionality
- **Responsive Design**: Mobile-first approach with breakpoints at 768px (tablet) and 1024px (desktop)
- **Interactive Mobile Menu**: Slide-in/out animation using modern CSS `@starting-style` and `transition-behavior: allow-discrete`
- **Semantic HTML**: Proper use of `<dialog>`, `<header>`, `<main>`, `<aside>`, and `<article>` elements
- **Accessibility**: Skip links, ARIA attributes, keyboard navigation, and `prefers-reduced-motion` support

### 🎨 Design System
- **Design Tokens**: Extracted from Figma using MCP tools
  - 8 color variables (HSL format)
  - 6 spacing variables (rem units)
  - 7 font presets with responsive adjustments
- **Typography**: Inter font family (400, 700, 800 weights)
- **Color Palette**: Soft orange, soft red, neutral grays, and dark navy

### 🚀 Technical Implementation
- **Modern CSS**: Logical properties, individual transform properties, CSS Grid
- **Dialog Animations**: Entrance/exit animations using `@starting-style` and `transition-behavior: allow-discrete`
- **Performance**: Hardware-accelerated animations, optimized image loading
- **Code Quality**: Follows established coding style guide with modifier classes

## Project Structure

```
news-homepage-main/
├── assets/
│   └── images/          # Optimized images and icons
├── design-tokens.css    # CSS variables and font presets
├── styles.css          # Main stylesheet
├── script.js           # Interactive functionality
├── index.html          # Semantic HTML structure
├── coding-style-guide.md
├── extract-designs-guide.md
├── implement-design-guide.md
└── README.md
```

## Key Technical Decisions

### CSS Architecture
- **Modifier Classes**: Used instead of BEM methodology for cleaner, more maintainable code
- **Logical Properties**: `inline-size`, `block-size`, `margin-block-end`, `inset` for better internationalization
- **Individual Transforms**: `translate`, `scale`, `rotate` instead of `transform` shorthand
- **CSS Grid**: Primary layout system for responsive design

### Dialog Implementation
- **Native `<dialog>` Element**: Leverages built-in accessibility and modal behavior
- **Modern Animations**: Uses `@starting-style` for entrance animations
- **Exit Animations**: Handled through base state transitions with `transition-behavior: allow-discrete`
- **Backdrop Styling**: Custom backdrop with fade animations

### Responsive Design
- **Mobile (≤767px)**: Single column layout, mobile menu dialog
- **Tablet (768px-1023px)**: Adjusted spacing and typography, sidebar below hero
- **Desktop (≥1024px)**: Multi-column grid layout, desktop navigation

## Browser Support

- **Modern Browsers**: Chrome 115+, Firefox 129+, Safari 16.4+, Edge 115+
- **Features Used**: CSS `@starting-style`, `transition-behavior: allow-discrete`, logical properties
- **Fallbacks**: Graceful degradation for older browsers

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/news-homepage-main.git
   cd news-homepage-main
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or serve with a local development server

3. **Development**
   - Edit `styles.css` for styling changes
   - Modify `script.js` for interactive features
   - Update `design-tokens.css` for design system changes

## Design Token Extraction

This project demonstrates automated design token extraction from Figma using MCP tools:

1. **Color Extraction**: 8 colors converted to HSL variables
2. **Spacing Extraction**: 6 spacing values converted to rem units
3. **Typography Extraction**: 7 font presets with responsive breakpoints

See `extract-designs-guide.md` for the complete extraction process.

## Accessibility Features

- **Skip Links**: Keyboard users can skip to main content
- **ARIA Attributes**: Proper labeling and state management
- **Focus Management**: Logical tab order and visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **Semantic HTML**: Screen reader friendly structure

## Performance Optimizations

- **Hardware Acceleration**: Transform animations use GPU
- **Efficient Selectors**: Optimized CSS selectors for better performance
- **Image Optimization**: Responsive images with proper sizing
- **Minimal JavaScript**: Lightweight, modular JavaScript classes

## Future Enhancements

- [ ] Add dark mode support
- [ ] Implement article search functionality
- [ ] Add more interactive animations
- [ ] Implement service worker for offline support
- [ ] Add unit tests for JavaScript functionality

## Credits

- **Design**: [Frontend Mentor](https://www.frontendmentor.io)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- **Icons**: Custom SVG icons optimized for the design

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using modern web technologies**
