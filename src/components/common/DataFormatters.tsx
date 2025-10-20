// Utility functions for formatting and data processing

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatValue = (key: string, value: any): string => {
  if (typeof value === 'number') {
    // Currency fields
    if (key.toLowerCase().includes('total') || 
        key.toLowerCase().includes('revenue') || 
        key.toLowerCase().includes('expenses') || 
        key.toLowerCase().includes('profit') || 
        key.toLowerCase().includes('fee') || 
        key.toLowerCase().includes('credit') ||
        key.toLowerCase().includes('equity')) {
      return formatCurrency(value);
    }
    // Percentage fields
    if (key.toLowerCase().includes('ratio') || 
        key.toLowerCase().includes('margin') || 
        key.toLowerCase().includes('interest') ||
        key.toLowerCase().includes('presale')) {
      return formatPercentage(value);
    }
    // Regular numbers
    return value.toLocaleString('he-IL');
  }
  return String(value);
};

// Field configuration for colspan support - read from schema
export const getFieldColspan = (key: string, sectionName: string = 'entrepreneur', schemaData?: any): number => {
  try {
    if (!schemaData) return 1;
    
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema) {
      const fieldSchema = sectionSchema.properties[key as keyof typeof sectionSchema.properties];
      if (fieldSchema && typeof fieldSchema === 'object' && 'colspan' in fieldSchema) {
        return (fieldSchema as any).colspan || 1;
      }
    }
  } catch (error) {
    console.warn(`Error reading colspan for field ${key} in section ${sectionName}:`, error);
  }
  return 1;
};

export const isPillField = (key: string): boolean => {
  return key === 'contractorProjects' || key === 'entrepreneurProjects';
};

// Tab animation configuration
export const tabAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};