# Critera - React TypeScript Redux Application

A modern React application built with TypeScript, Redux Toolkit, and styled-components, designed for seamless integration with Figma designs.

## 🚀 Features

- **Modern React 18** with TypeScript
- **Redux Toolkit** for state management
- **Styled Components** for component styling
- **Framer Motion** for animations
- **Multi-language Support** with i18next (Hebrew RTL + English LTR)
- **Language Switcher** with automatic RTL/LTR direction switching
- **Figma-Ready Design System** with CSS custom properties
- **Responsive Design** with mobile-first approach
- **Component Library** with reusable UI components
- **Type Safety** with comprehensive TypeScript interfaces

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components (Button, Card, Input)
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   ├── pages/            # Page-specific components
│   └── App.tsx           # Main App component
├── store/
│   ├── slices/           # Redux slices
│   └── index.ts          # Store configuration
├── styles/
│   ├── globals.css       # Global styles & CSS variables
│   ├── theme.ts          # Design system theme
│   └── components/       # Component-specific styles
├── hooks/
│   └── redux.ts          # Typed Redux hooks
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   └── index.ts          # Utility functions
└── assets/
    ├── icons/            # SVG icons
    └── images/           # Images and graphics
```

## 🎨 Design System Integration

### CSS Custom Properties (Update from Figma)
The design system uses CSS custom properties in `src/styles/globals.css`:

```css
:root {
  /* Update these colors from your Figma design */
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  /* ... more design tokens */
}
```

### Theme Configuration
Styled Components theme in `src/styles/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: { /* Figma color palette */ },
    gray: { /* Neutral colors */ },
    // ...
  },
  typography: { /* Font system */ },
  spacing: { /* Spacing scale */ },
  // ...
};
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## 📦 Component Usage

### Button Component
```tsx
import { Button } from '../components/common';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

### Card Component
```tsx
import { Card } from '../components/common';

<Card shadow="lg" padding="lg">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Input Component
```tsx
import { Input } from '../components/common';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
  fullWidth
/>
```

### Language Switcher Component
```tsx
import { LanguageSwitcher } from '../components/common';

// Automatically included in Header component
<LanguageSwitcher />
```

## 🌐 Multi-language Support

### Using Translations
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
};
```

### Supported Languages
- **Hebrew (עברית)** - Primary language, RTL support
- **English** - Secondary language, LTR support

### Language Files Location
- `src/i18n/locales/he.json` - Hebrew translations
- `src/i18n/locales/en.json` - English translations

### RTL/LTR Support
The app automatically switches between RTL and LTR modes when changing languages:
- Hebrew: `direction: rtl`
- English: `direction: ltr`
- CSS automatically adjusts margins, paddings, and text alignment

## 🎭 Redux State Management

### Using Redux Hooks
```tsx
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setLoading, addNotification } from '../store/slices/appSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { loading, theme } = useAppSelector(state => state.app);
  
  const handleAction = () => {
    dispatch(setLoading(true));
    dispatch(addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Action completed successfully'
    }));
  };
};
```

## 🎨 Figma Integration Tips

1. **Export Design Tokens**: Use Figma plugins like "Design Tokens" to export colors, spacing, and typography
2. **SVG Icons**: Export icons as SVG and place in `src/assets/icons/`
3. **Images**: Export images in multiple formats (WebP, PNG) for optimization
4. **Components**: Match Figma component names with React component names for consistency

### Recommended Figma Plugins:
- **Figma to React** - Generate React components from Figma designs
- **Design Tokens** - Export design tokens as CSS or JavaScript
- **Figma to CSS** - Get CSS properties for precise styling
- **Auto Layout to CSS** - Convert Auto Layout to Flexbox/Grid

## 🛠 Development Workflow

1. **Update Design System**: Copy colors, fonts, and spacing from Figma to `theme.ts` and `globals.css`
2. **Create Components**: Build React components matching Figma designs
3. **Add Interactions**: Use Framer Motion for animations matching Figma prototypes
4. **Test Responsiveness**: Ensure components work across all breakpoints
5. **State Management**: Add Redux slices for complex state requirements

## 🚀 Deployment

Build the app for production:
```bash
npm run build
```

The `build` folder contains optimized files ready for deployment to any static hosting service (Netlify, Vercel, AWS S3, etc.).

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)