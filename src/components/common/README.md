# Shared Styled Components

This document explains how to use the shared styled components extracted from the Entrepreneur component. These components can be reused across different parts of the application to maintain consistency.

## Available Components

### Layout Components

- `Container` - Main page container with consistent padding and layout
- `PageHeader` - Centered page header wrapper
- `PageTitle` - Styled H1 title component

### Tab Components

- `TabContainer` - Container for tabbed interfaces
- `TabHeader` - Header containing tab buttons
- `TabButton` - Individual tab button with active/inactive states
- `TabContent` - Animated content area for tab content

### Section Components

- `SectionTitle` - Section headers with optional icons
- `SectionIcon` - Icon wrapper for sections
- `SubSectionTitle` - Subsection headers

### Grid and Layout

- `DataGrid` - Responsive grid for data cards
- `DataCard` - Card component for data display
- `FieldsContainer` - Grid container for form fields
- `FieldGroup` - Individual field wrapper with colspan support
- `ArrayContainer` - Container for array/list data

### Form and Data Display

- `DataLabel` - Label component with RTL support
- `DataValue` - Value display component with hover effects

### Pill Components (Special Fields)

- `PillFieldsContainer` - Container for pill-style fields
- `PillField` - Individual pill field wrapper
- `PillLabel` - Label for pill fields
- `PillContainer` - Container for pill values
- `PillValue` - Styled pill value display

## Utility Functions

### Data Formatters (`DataFormatters.tsx`)

- `formatCurrency(value)` - Formats numbers as ILS currency
- `formatPercentage(value)` - Formats numbers as percentages
- `formatValue(key, value)` - Smart formatting based on field name
- `getFieldColspan(key, sectionName, schemaData)` - Gets column span from schema
- `isPillField(key)` - Checks if field should use pill styling
- `tabAnimation` - Animation configuration for tabs

### Data Renderers (`DataRenderers.tsx`)

- `renderPillField()` - Renders a pill-style field
- `renderDataSection()` - Renders complete data sections with various layouts
- `TabbedDataView` - Complete tabbed interface component

## Usage Examples

### Basic Data Display

```tsx
import React from 'react';
import {
  Container,
  PageHeader,
  PageTitle,
  DataCard,
  FieldsContainer,
  FieldGroup,
  DataLabel,
  DataValue,
  formatValue
} from '../common';

const MyComponent = ({ data }) => {
  const isRTL = i18n.language === 'he';
  
  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>My Data View</PageTitle>
      </PageHeader>
      
      <DataCard>
        <FieldsContainer>
          {Object.entries(data).map(([key, value]) => (
            <FieldGroup key={key}>
              <DataLabel $isRTL={isRTL}>{key}</DataLabel>
              <DataValue $isRTL={isRTL}>
                {formatValue(key, value)}
              </DataValue>
            </FieldGroup>
          ))}
        </FieldsContainer>
      </DataCard>
    </Container>
  );
};
```

### Using TabbedDataView

```tsx
import React, { useState } from 'react';
import { TabbedDataView, TabConfig } from '../common';

const MyTabbedComponent = ({ data }) => {
  const [activeTab, setActiveTab] = useState('first');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  
  const tabs: TabConfig[] = [
    { key: 'first', label: 'First Tab', icon: '📊' },
    { key: 'second', label: 'Second Tab', icon: '📈' },
  ];
  
  return (
    <TabbedDataView
      title="My Tabbed Data"
      data={data}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      t={t}
      isRTL={isRTL}
      showIcons={true}
    />
  );
};
```

### Custom Section with Icons

```tsx
import React from 'react';
import {
  SectionTitle,
  SectionIcon,
  DataGrid,
  DataCard
} from '../common';

const MySectionComponent = () => {
  return (
    <div>
      <SectionTitle>
        <SectionIcon>💰</SectionIcon>
        Financial Data
      </SectionTitle>
      
      <DataGrid>
        <DataCard>
          {/* Your content */}
        </DataCard>
      </DataGrid>
    </div>
  );
};
```

## Features

### RTL Support
All components support right-to-left languages through the `$isRTL` prop.

### Responsive Design
Components are responsive and adapt to different screen sizes using CSS Grid and Flexbox.

### Theme Integration
All components use the application's theme system for consistent colors, spacing, and typography.

### Animation Support
Tab components include smooth animations using Framer Motion.

### Schema-Based Layout
Components can read field configuration from schema data for dynamic layouts.

## File Structure

```
src/components/common/
├── StyledComponents.tsx    # All styled components
├── DataFormatters.tsx     # Utility functions for formatting
├── DataRenderers.tsx      # Reusable rendering functions
├── Button.tsx            # Button component (existing)
├── Card.tsx              # Card component (existing)
├── Input.tsx             # Input component (existing)
├── LanguageSwitcher.tsx  # Language switcher (existing)
└── index.ts              # Exports all components
```

## Migration Benefits

1. **Consistency** - All components using these styles will have the same look and feel
2. **Maintainability** - Changes to styling only need to be made in one place
3. **Reusability** - Easy to create new components with consistent styling
4. **Performance** - Styled components are only defined once and reused
5. **Type Safety** - Full TypeScript support with proper prop types

## Best Practices

1. Always pass the `$isRTL` prop to components that support it
2. Use the `formatValue` function for consistent data formatting
3. Import only the components you need to keep bundle size small
4. Follow the existing naming conventions for props
5. Use the `DataCard` component as a wrapper for related data fields