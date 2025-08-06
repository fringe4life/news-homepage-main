# Figma Design Token Extraction Guide

## Overview
This guide explains how to extract design tokens (colors, typography, spacing) from Figma designs and convert them into CSS variables and utility classes for web development projects.

## Prerequisites
- Access to Figma design file
- Connection string for the Figma MCP tool
- Understanding of CSS custom properties and utility classes

## Step-by-Step Process

### 1. Connect to Figma Design
```bash
# Use the connection string provided by the design team
# Example: ujkdy22d
```

### 2. Extract Design Tokens

#### A. Colors
- Look for a "Colors" frame in the design system
- Extract color values in multiple formats (HEX, RGB, HSL)
- Prefer HSL values for better readability and manipulation
- Organize by color categories (Primary, Neutral, Semantic)

#### B. Typography
- Find the "Typography" frame
- Extract font presets with:
  - Font family
  - Font weight
  - Font size (in px)
  - Line height (in px)
  - Letter spacing (in px)
- Convert pixel values to rem units

#### C. Spacing
- Locate the "Spacing" frame
- Extract spacing values in pixels
- Convert to rem units for accessibility
- Use semantic naming (spacing-100, spacing-300, etc.)

### 3. Create CSS Structure

#### Template Structure
```css
/* Design Tokens - [Project Name] */

/* ===== COLORS ===== */
:root {
  /* Primary Colors */
  --color-[name]: hsl([h], [s]%, [l]%); /* #[hex] */
  
  /* Neutral Colors */
  --color-[name]: hsl([h], [s]%, [l]%); /* #[hex] */
}

/* ===== SPACING ===== */
:root {
  --spacing-[name]: [rem]; /* [px] */
}

/* ===== TYPOGRAPHY ===== */
:root {
  --font-family: '[Font Name]', sans-serif;
  --font-weight-[weight]: [value];
}

/* ===== FONT PRESETS ===== */
.preset-[number] {
  font-family: var(--font-family);
  font-weight: var(--font-weight-[weight]);
  font-size: [rem]; /* [px] */
  line-height: [rem]; /* [px] */
  letter-spacing: [rem]; /* [px] */
}

/* ===== RESPONSIVE FONT SIZES ===== */
@media (min-width: 768px) {
  /* Desktop/tablet sizes */
}

@media (max-width: 767px) {
  /* Mobile sizes */
}
```

## Automation Script Template

### Figma MCP Commands Sequence
```javascript
// 1. Join channel
mcp_cursor-talk-to-figma-mcp_join_channel({ channel: "CONNECTION_STRING" })

// 2. Get document info
mcp_cursor-talk-to-figma-mcp_get_document_info({ random_string: "dummy" })

// 3. Extract colors
mcp_cursor-talk-to-figma-mcp_get_node_info({ nodeId: "COLORS_FRAME_ID" })

// 4. Extract typography
mcp_cursor-talk-to-figma-mcp_get_node_info({ nodeId: "TYPOGRAPHY_FRAME_ID" })

// 5. Extract spacing
mcp_cursor-talk-to-figma-mcp_get_node_info({ nodeId: "SPACING_FRAME_ID" })
```

## Data Extraction Patterns

### Color Extraction
Look for these patterns in the Figma response:
- `fills[].color` - Contains RGB values
- Text elements with color values (HEX, RGB, HSL)
- Rectangle elements with fill colors

### Typography Extraction
Extract from text elements:
- `style.fontFamily` - Font family
- `style.fontWeight` - Font weight
- `style.fontSize` - Font size in px
- `style.lineHeightPx` - Line height in px
- `style.letterSpacing` - Letter spacing in px

### Spacing Extraction
Look for:
- Text elements showing spacing values (e.g., "8px", "24px")
- Rectangle elements with width/height matching spacing values

## Conversion Formulas

### Pixel to Rem Conversion
```javascript
// Base: 16px = 1rem
const pxToRem = (px) => px / 16;

// Examples:
// 56px = 3.5rem
// 40px = 2.5rem
// 32px = 2rem
// 24px = 1.5rem
// 20px = 1.25rem
// 18px = 1.125rem
// 15px = 0.9375rem
// 14px = 0.875rem
// 8px = 0.5rem
```

### RGB to HSL Conversion
```javascript
// Use online converter or CSS color functions
// Example: rgb(233, 170, 82) → hsl(35, 77%, 62%)
```

## File Naming Convention
- `design-tokens.css` - Main design tokens file
- `extract-designs-guide.md` - This guide
- `coding-style-guide.md` - Project-specific coding standards

## Integration Steps

### 1. Import Design Tokens
```html
<link rel="stylesheet" href="design-tokens.css">
```

### 2. Use in CSS
```css
.my-component {
  color: var(--color-gold);
  padding: var(--spacing-300);
  font-family: var(--font-family);
}
```

### 3. Use Font Presets
```html
<h1 class="preset-1">Main Heading</h1>
<p class="preset-6">Body text</p>
```

## Quality Checklist

### Colors
- [ ] All colors extracted from Figma
- [ ] HSL values used (preferred over HEX)
- [ ] Semantic naming (e.g., --color-gold, --color-navy-600)
- [ ] Comments include original HEX values

### Typography
- [ ] All font presets extracted
- [ ] Pixel values converted to rem
- [ ] Font weights defined as variables
- [ ] Responsive adjustments included

### Spacing
- [ ] All spacing values extracted
- [ ] Converted to rem units
- [ ] Semantic naming (spacing-100, spacing-300, etc.)
- [ ] Comments include original pixel values

### General
- [ ] CSS variables used consistently
- [ ] Utility classes created for typography
- [ ] Mobile-first responsive design
- [ ] Accessibility considerations (rem units)

## Troubleshooting

### Common Issues
1. **Missing Frame IDs**: Check document structure for correct node IDs
2. **Color Format**: Ensure HSL values are correctly formatted
3. **Font Loading**: Verify font family names match available fonts
4. **Responsive Design**: Test font sizes across different screen sizes

### Validation
- Test CSS variables in browser dev tools
- Verify font presets render correctly
- Check spacing values in layout
- Validate responsive behavior

## Best Practices

### Naming Conventions
- Use kebab-case for CSS variables
- Prefix colors with `--color-`
- Prefix spacing with `--spacing-`
- Use semantic names over visual descriptions

### Organization
- Group related tokens together
- Use clear section comments
- Maintain consistent formatting
- Include helpful documentation

### Accessibility
- Use rem units for better scaling
- Ensure sufficient color contrast
- Test with different font sizes
- Consider reduced motion preferences

## Example Output Structure

```css
/* Design Tokens - [Project Name] */

/* ===== COLORS ===== */
:root {
  /* Primary Colors */
  --color-gold: hsl(35, 77%, 62%);
  --color-red: hsl(4, 85%, 63%);
  
  /* Neutral Colors */
  --color-white: hsl(0, 100%, 100%);
  --color-black: hsl(0, 0%, 0%);
  --color-grey-300: hsl(233, 8%, 79%);
  --color-navy-950: hsl(240, 100%, 5%);
}

/* ===== SPACING ===== */
:root {
  --spacing-100: 0.5rem; /* 8px */
  --spacing-300: 1.5rem; /* 24px */
  --spacing-400: 2rem; /* 32px */
}

/* ===== FONT PRESETS ===== */
.preset-1 {
  font-family: var(--font-family);
  font-weight: var(--font-weight-extra-bold);
  font-size: 3.5rem; /* 56px */
  line-height: 3.5rem; /* 56px */
  letter-spacing: 0;
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: 767px) {
  .preset-1 {
    font-size: 2rem; /* 32px on mobile */
  }
}
```

## Automation Tips

1. **Save Connection Strings**: Keep a list of project connection strings
2. **Template Files**: Maintain reusable CSS templates
3. **Validation Scripts**: Create scripts to validate extracted values
4. **Documentation**: Always document the extraction process
5. **Version Control**: Track changes to design tokens over time

---

*This guide should be updated as new tools and best practices emerge.* 