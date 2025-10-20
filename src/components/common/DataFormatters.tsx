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
      // Check if field has position: column - should span full width
      if (fieldSchema && typeof fieldSchema === 'object') {
        const field = fieldSchema as any;
        if (field.position === 'column') {
          return 2;
        }
      }
    }
  } catch (error) {
    console.warn(`Error reading colspan for field ${key} in section ${sectionName}:`, error);
  }
  return 1;
};

// Check if field is a textarea field
export const isTextareaField = (key: string, sectionName: string = 'entrepreneur', schemaData?: any): boolean => {
  try {
    if (!schemaData) return false;
    
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema) {
      const fieldSchema = sectionSchema.properties[key as keyof typeof sectionSchema.properties];
      if (fieldSchema && typeof fieldSchema === 'object') {
        return (fieldSchema as any).type === 'textarea';
      }
    }
  } catch (error) {
    console.warn(`Error checking textarea type for field ${key} in section ${sectionName}:`, error);
  }
  return false;
};

// Get field rows for textarea fields
export const getFieldRows = (key: string, sectionName: string = 'entrepreneur', schemaData?: any): number | undefined => {
  try {
    if (!schemaData) return undefined;
    
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema) {
      const fieldSchema = sectionSchema.properties[key as keyof typeof sectionSchema.properties];
      if (fieldSchema && typeof fieldSchema === 'object') {
        return (fieldSchema as any).rows;
      }
    }
  } catch (error) {
    console.warn(`Error getting rows for field ${key} in section ${sectionName}:`, error);
  }
  return undefined;
};

// Check if array should use table layout
export const isTableLayout = (sectionName: string, schemaData?: any): boolean => {
  try {
    if (!schemaData) return false;
    
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && typeof sectionSchema === 'object') {
      return (sectionSchema as any).layout === 'table';
    }
  } catch (error) {
    console.warn(`Error checking table layout for section ${sectionName}:`, error);
  }
  return false;
};

// Check if field has bottom shape positioning
export const isBottomShapeField = (key: string, sectionName: string = 'entrepreneur', schemaData?: any): boolean => {
  try {
    if (!schemaData) return false;
    
    // Check if using columns layout
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema && sectionSchema.properties.columns) {
      const columns = sectionSchema.properties.columns as any[];
      for (const column of columns) {
        if (column.properties && column.properties[key]) {
          return column.properties[key].shape === 'bottom';
        }
      }
    }
    
    // Check regular properties
    if (sectionSchema && 'properties' in sectionSchema) {
      const fieldSchema = sectionSchema.properties[key as keyof typeof sectionSchema.properties];
      if (fieldSchema && typeof fieldSchema === 'object') {
        return (fieldSchema as any).shape === 'bottom';
      }
    }
  } catch (error) {
    console.warn(`Error checking bottom shape for field ${key} in section ${sectionName}:`, error);
  }
  return false;
};

// Get all bottom shape fields for a section
export const getBottomShapeFields = (sectionName: string, schemaData?: any): string[] => {
  try {
    if (!schemaData) return [];
    
    const bottomFields: string[] = [];
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    
    if (sectionSchema && 'properties' in sectionSchema) {
      // Check if using columns layout
      if (sectionSchema.properties.columns) {
        const columns = sectionSchema.properties.columns as any[];
        for (const column of columns) {
          if (column.properties) {
            Object.entries(column.properties).forEach(([key, fieldSchema]) => {
              if (fieldSchema && typeof fieldSchema === 'object' && (fieldSchema as any).shape === 'bottom') {
                bottomFields.push(key);
              }
            });
          }
        }
      } else {
        // Check regular properties
        Object.entries(sectionSchema.properties).forEach(([key, fieldSchema]) => {
          if (fieldSchema && typeof fieldSchema === 'object' && (fieldSchema as any).shape === 'bottom') {
            bottomFields.push(key);
          }
        });
      }
    }
    
    return bottomFields;
  } catch (error) {
    console.warn(`Error getting bottom shape fields for section ${sectionName}:`, error);
  }
  return [];
};

export const isPillField = (key: string, sectionName: string = 'entrepreneur', schemaData?: any): boolean => {
  // Use dynamic shape detection if schema is available
  if (schemaData) {
    return isBottomShapeField(key, sectionName, schemaData);
  }
  
  // Fallback to hardcoded fields if no schema
  return key === 'contractorProjects' || key === 'entrepreneurProjects';
};

// Tab animation configuration
export const tabAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};