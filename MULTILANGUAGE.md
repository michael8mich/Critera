# Multi-language Implementation Guide

This guide explains how the multi-language support is implemented in the Critera app.

## 📁 File Structure

```
src/
├── i18n/
│   ├── index.ts              # i18next configuration
│   └── locales/
│       ├── he.json           # Hebrew translations (Primary)
│       └── en.json           # English translations
├── components/
│   └── common/
│       └── LanguageSwitcher.tsx  # Language switcher component
└── styles/
    └── globals.css           # RTL/LTR CSS support
```

## 🔧 Implementation Details

### 1. i18next Configuration (`src/i18n/index.ts`)
- Default language: Hebrew (`he`)
- Fallback language: English (`en`)
- Browser language detection enabled
- Local storage persistence

### 2. Language Switcher Component
- Dropdown interface with flags
- Automatic direction switching (RTL/LTR)
- Updates document direction and language attributes
- Integrated in header navigation

### 3. RTL Support
- CSS automatically adjusts for RTL languages
- Hebrew font family optimization
- Direction-aware margins and paddings
- Input field RTL support

## 🌍 Adding New Languages

### Step 1: Create Translation File
Create a new JSON file in `src/i18n/locales/`:

```json
// src/i18n/locales/ar.json (Arabic example)
{
  "nav": {
    "home": "الرئيسية",
    "about": "حول",
    // ... more translations
  }
}
```

### Step 2: Update i18n Configuration
```typescript
// src/i18n/index.ts
import arTranslations from './locales/ar.json';

const resources = {
  he: { translation: heTranslations },
  en: { translation: enTranslations },
  ar: { translation: arTranslations }, // Add new language
};
```

### Step 3: Update Language Switcher
```typescript
// src/components/common/LanguageSwitcher.tsx
const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱', isRtl: true },
  { code: 'en', name: 'English', flag: '🇺🇸', isRtl: false },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', isRtl: true }, // Add new language
];
```

### Step 4: Update Redux Language Slice
```typescript
// src/store/slices/languageSlice.ts
const initialState: LanguageState = {
  availableLanguages: [
    { code: 'he', name: 'עברית', flag: '🇮🇱', isRtl: true },
    { code: 'en', name: 'English', flag: '🇺🇸', isRtl: false },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', isRtl: true }, // Add new language
  ],
};
```

## 🎨 RTL Styling Guidelines

### CSS Custom Properties for RTL
```css
/* Add RTL-specific styles in globals.css */
[lang="ar"] {
  font-family: 'Arial', 'Tahoma', sans-serif;
}

/* Direction-aware utilities */
[dir="rtl"] .text-right { text-align: left; }
[dir="rtl"] .text-left { text-align: right; }
```

### Component RTL Support
```typescript
// In styled components, use direction-aware properties
const StyledComponent = styled.div<{ isRtl: boolean }>`
  margin-${({ isRtl }) => isRtl ? 'left' : 'right'}: 1rem;
  text-align: ${({ isRtl }) => isRtl ? 'right' : 'left'};
`;
```

## 🔄 Language Switching Flow

1. User clicks language switcher
2. `i18n.changeLanguage()` called
3. Document direction updated (`dir="rtl"` or `dir="ltr"`)
4. Document language updated (`lang="he"` or `lang="en"`)
5. All translated text updates automatically
6. Language preference saved to localStorage

## 📝 Translation Keys Structure

```json
{
  "nav": {           // Navigation
    "home": "...",
    "about": "..."
  },
  "home": {          // Home page
    "title": "...",
    "subtitle": "...",
    "features": {     // Nested features
      "performance": {
        "title": "...",
        "description": "..."
      }
    }
  },
  "forms": {         // Form elements
    "email": "...",
    "required": "..."
  },
  "buttons": {       // Common buttons
    "save": "...",
    "cancel": "..."
  }
}
```

## 🧪 Testing Multi-language

1. Change language using switcher
2. Verify all text translates
3. Check RTL/LTR direction switching
4. Test form inputs in both directions
5. Verify localStorage persistence
6. Test browser language detection

## 🌐 Best Practices

1. **Consistent Key Structure**: Use nested objects for organization
2. **Plural Forms**: Use i18next plural rules for count-based text
3. **Context**: Add context for ambiguous translations
4. **RTL Testing**: Always test layout in RTL mode
5. **Font Loading**: Ensure proper fonts for each language
6. **Performance**: Consider lazy loading for large translation files