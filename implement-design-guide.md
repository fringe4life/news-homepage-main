# Figma Design Implementation Guide

## Overview
This guide explains how to implement Figma designs by first scanning existing CSS files for design tokens (colors, typography, spacing) and using them to maintain consistency across the project.

## Prerequisites
- Access to Figma design file
- Connection string for the Figma MCP tool
- Existing CSS files in the project
- Understanding of design token patterns

## Step-by-Step Implementation Process

### 1. Scan Existing CSS Files for Design Tokens

#### A. Check for Design Tokens File
```bash
# Look for these common design token files:
- design-tokens.css
- tokens.css
- variables.css
- theme.css
- styles.css
```

#### B. Scan for Color Variables
Look for CSS custom properties with color patterns:
```css
/* Common color variable patterns */
:root {
  --color-[name]: hsl([h], [s]%, [l]%);
  --color-[name]: #hex;
  --color-[name]: rgb([r], [g], [b]);
  
  /* Semantic color patterns */
  --primary: hsl(...);
  --secondary: hsl(...);
  --accent: hsl(...);
  --neutral: hsl(...);
  --success: hsl(...);
  --error: hsl(...);
  --warning: hsl(...);
}
```

#### C. Scan for Spacing Variables
Look for spacing patterns:
```css
/* Common spacing variable patterns */
:root {
  --spacing-[number]: [rem];
  --space-[number]: [rem];
  --gap-[number]: [rem];
  --margin-[size]: [rem];
  --padding-[size]: [rem];
}
```

#### D. Scan for Typography Variables
Look for font-related patterns:
```css
/* Common typography variable patterns */
:root {
  --font-family: '[Font Name]', sans-serif;
  --font-weight-[weight]: [value];
  --font-size-[size]: [rem];
}

/* Font preset utility classes */
.preset-[number] {
  font-family: var(--font-family);
  font-weight: var(--font-weight-[weight]);
  font-size: [rem];
  line-height: [rem];
  letter-spacing: [rem];
}
```

### 2. Connect to Figma and Extract Design Requirements

#### A. Join Figma Channel
```javascript
mcp_cursor-talk-to-figma-mcp_join_channel({ channel: "CONNECTION_STRING" })
```

#### B. Get Design Information
```javascript
// Get document overview
mcp_cursor-talk-to-figma-mcp_get_document_info({ random_string: "dummy" })

// Get specific design elements
mcp_cursor-talk-to-figma-mcp_get_selection({ random_string: "dummy" })
mcp_cursor-talk-to-figma-mcp_read_my_design({ random_string: "dummy" })
```

### 3. Match Figma Design to Existing Tokens

#### A. Color Matching Strategy
1. **Extract colors from Figma design**
2. **Compare with existing color variables**
3. **Use existing colors when possible**
4. **Create new colors only if necessary**

```css
/* Example: If Figma shows gold color, check for existing gold variable */
.figma-gold-color {
  /* Use existing if available */
  color: var(--color-gold);
  
  /* Or create new if needed */
  color: hsl(35, 77%, 62%);
}
```

#### B. Typography Matching Strategy
1. **Extract font properties from Figma**
2. **Match to existing font presets**
3. **Use preset classes when possible**
4. **Override only specific properties if needed**

```html
<!-- Example: If Figma shows large heading, use preset-1 -->
<h1 class="preset-1">Main Heading</h1>

<!-- Or override specific properties -->
<h1 class="preset-1" style="color: var(--color-gold);">Custom Heading</h1>
```

#### C. Spacing Matching Strategy
1. **Extract spacing from Figma design**
2. **Match to existing spacing variables**
3. **Use existing spacing when possible**
4. **Create new spacing only if necessary**

```css
/* Example: If Figma shows 24px spacing, use existing variable */
.container {
  padding: var(--spacing-300); /* 24px equivalent */
  gap: var(--spacing-300);
}
```

### 4. Implementation Priority Order

#### Priority 1: Use Existing Design Tokens
```css
/* Always prefer existing tokens */
.component {
  color: var(--color-gold);
  padding: var(--spacing-300);
  font-family: var(--font-family);
}
```

#### Priority 2: Use Font Preset Classes
```html
<!-- Use existing preset classes -->
<h1 class="preset-1">Heading</h1>
<p class="preset-6">Body text</p>
```

#### Priority 3: Override Specific Properties
```css
/* Only override what's different from existing tokens */
.custom-heading {
  composes: preset-1;
  color: var(--color-red); /* Override only color */
}
```

#### Priority 4: Create New Tokens (Last Resort)
```css
/* Only create new tokens if absolutely necessary */
:root {
  --color-new-accent: hsl(45, 90%, 50%);
}
```

### 5. CSS File Scanning Functions

#### A. Scan for Color Variables
```javascript
function scanForColorVariables(cssContent) {
  const colorPatterns = [
    /--color-[^:]+:\s*hsl\([^)]+\)/g,
    /--color-[^:]+:\s*#[0-9a-fA-F]{3,6}/g,
    /--color-[^:]+:\s*rgb\([^)]+\)/g,
    /--primary[^:]*:\s*[^;]+/g,
    /--secondary[^:]*:\s*[^;]+/g,
    /--accent[^:]*:\s*[^;]+/g
  ];
  
  const colors = [];
  colorPatterns.forEach(pattern => {
    const matches = cssContent.match(pattern);
    if (matches) colors.push(...matches);
  });
  
  return colors;
}
```

#### B. Scan for Spacing Variables
```javascript
function scanForSpacingVariables(cssContent) {
  const spacingPatterns = [
    /--spacing-[^:]+:\s*[^;]+/g,
    /--space-[^:]+:\s*[^;]+/g,
    /--gap-[^:]+:\s*[^;]+/g
  ];
  
  const spacing = [];
  spacingPatterns.forEach(pattern => {
    const matches = cssContent.match(pattern);
    if (matches) spacing.push(...matches);
  });
  
  return spacing;
}
```

#### C. Scan for Font Presets
```javascript
function scanForFontPresets(cssContent) {
  const presetPatterns = [
    /\.preset-[^}]+\{[^}]+\}/g,
    /--font-[^:]+:\s*[^;]+/g
  ];
  
  const presets = [];
  presetPatterns.forEach(pattern => {
    const matches = cssContent.match(pattern);
    if (matches) presets.push(...matches);
  });
  
  return presets;
}
```

### 6. Implementation Checklist

#### Before Implementation
- [ ] Scan all CSS files for existing design tokens
- [ ] Document available colors, spacing, and typography
- [ ] Connect to Figma and extract design requirements
- [ ] Map Figma elements to existing tokens

#### During Implementation
- [ ] Use existing color variables first
- [ ] Apply font preset classes when possible
- [ ] Use existing spacing variables
- [ ] Only create new tokens if absolutely necessary
- [ ] Follow project coding style guide

#### After Implementation
- [ ] Validate against existing design system
- [ ] Test responsive behavior
- [ ] Ensure accessibility compliance
- [ ] Update documentation if new tokens were created

### 7. Common Implementation Patterns

#### A. Component Implementation
```css
/* Good: Using existing tokens */
.news-card {
  background: var(--color-white);
  color: var(--color-navy-950);
  padding: var(--spacing-300);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-card h2 {
  composes: preset-3;
  color: var(--color-gold);
  margin-bottom: var(--spacing-100);
}

.news-card p {
  composes: preset-6;
  color: var(--color-navy-600);
}
```

#### B. Layout Implementation
```css
/* Good: Using existing spacing */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-400);
  padding: var(--spacing-500);
}

.news-section {
  margin-block: var(--spacing-800);
}
```

#### C. Typography Implementation
```html
<!-- Good: Using preset classes -->
<article class="news-article">
  <h1 class="preset-1">The Bright Future of Web 3.0?</h1>
  <p class="preset-6">We dive into the next evolution of the web...</p>
  <button class="preset-5">Read more</button>
</article>
```

### 8. Error Handling and Fallbacks

#### A. Missing Design Tokens
```css
/* Fallback when design tokens are missing */
.component {
  color: var(--color-gold, hsl(35, 77%, 62%));
  padding: var(--spacing-300, 1.5rem);
  font-family: var(--font-family, 'Inter', sans-serif);
}
```

#### B. Font Preset Fallbacks
```css
/* Fallback when preset classes don't exist */
.heading {
  font-family: var(--font-family, 'Inter', sans-serif);
  font-weight: var(--font-weight-extra-bold, 800);
  font-size: 3.5rem;
  line-height: 3.5rem;
  letter-spacing: 0;
}
```

### 9. Validation and Testing

#### A. Token Usage Validation
```javascript
function validateTokenUsage(cssContent, availableTokens) {
  const usedTokens = extractUsedTokens(cssContent);
  const unusedTokens = availableTokens.filter(token => !usedTokens.includes(token));
  const missingTokens = usedTokens.filter(token => !availableTokens.includes(token));
  
  return {
    used: usedTokens,
    unused: unusedTokens,
    missing: missingTokens
  };
}
```

#### B. Design Consistency Check
```javascript
function checkDesignConsistency(figmaDesign, implementedCSS) {
  const figmaColors = extractFigmaColors(figmaDesign);
  const implementedColors = extractImplementedColors(implementedCSS);
  
  return {
    colorMatch: compareColors(figmaColors, implementedColors),
    typographyMatch: compareTypography(figmaDesign, implementedCSS),
    spacingMatch: compareSpacing(figmaDesign, implementedCSS)
  };
}
```

### 10. Best Practices

#### A. Token Usage
- Always scan for existing tokens before creating new ones
- Use semantic naming for new tokens
- Document any new tokens created
- Maintain consistency across components

#### B. Implementation
- Follow mobile-first responsive design
- Use logical properties when possible
- Ensure accessibility compliance
- Test across different screen sizes

#### C. Maintenance
- Regularly audit token usage
- Remove unused tokens
- Update documentation
- Validate against design system

## Example Implementation Workflow

```bash
# 1. Scan existing CSS files
find . -name "*.css" -exec grep -l "design-tokens\|--color\|--spacing\|preset-" {} \;

# 2. Extract available tokens
cat design-tokens.css | grep -E "(--color-|--spacing-|\.preset-)"

# 3. Connect to Figma
# Use connection string to access design

# 4. Implement using existing tokens
# Follow the patterns above

# 5. Validate implementation
# Check against design system and accessibility requirements
```

---

*This guide ensures consistent design implementation by leveraging existing design tokens and maintaining design system integrity.*