import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/slices';
import { updateCurrentData, resetToOriginal, saveChanges } from '../../store/slices/bankerSlice';
import {
  Container,
  PageHeader,
  PageTitle,
  TabContainer,
  TabHeader,
  TabButton,
  TabContent,
  SectionTitle,
  SectionIcon,
  SubSectionTitle,
  DataGrid,
  DataCard,
  FieldsContainer,
  FieldGroup,
  ArrayContainer,
  DataLabel,
  DataValue,
  PillFieldsContainer,
  PillField,
  PillLabel,
  PillContainer,
  PillValue,
  TextareaValue,
  ColumnsContainer,
  ColumnContainer,
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell
} from './StyledComponents';
import { FormField, EditButton, SaveButton, ClearButton, ButtonContainer, PDFField, PDFListField } from './FormComponents';
import { formatValue, getFieldColspan, isPillField, isTextareaField, getFieldRows, isTableLayout, getBottomShapeFields, tabAnimation, isPDFField } from './DataFormatters';

// Helper function to check if schema defines columns layout
const hasColumnsLayout = (sectionName: string, schemaData?: any): boolean => {
  try {
    if (!schemaData) return false;
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema && sectionSchema.properties.columns) {
      return Array.isArray(sectionSchema.properties.columns);
    }
  } catch (error) {
    console.warn(`Error checking columns layout for section ${sectionName}:`, error);
  }
  return false;
};

// Helper function to get columns from schema
const getColumnsFromSchema = (sectionName: string, schemaData?: any): any[] => {
  try {
    if (!schemaData) return [];
    const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
    if (sectionSchema && 'properties' in sectionSchema && sectionSchema.properties.columns) {
      return sectionSchema.properties.columns as any[];
    }
  } catch (error) {
    console.warn(`Error getting columns for section ${sectionName}:`, error);
  }
  return [];
};

// Helper function to check if any column has rank layout
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasRankColumn = (sectionName: string, schemaData?: any): boolean => {
  const columns = getColumnsFromSchema(sectionName, schemaData);
  return columns.some(column => column.layout === 'rank');
};

// Helper function to get field schema from all columns
const getFieldSchemaFromAllColumns = (fieldName: string, sectionName: string, schemaData?: any): any => {
  const columns = getColumnsFromSchema(sectionName, schemaData);
  for (const column of columns) {
    if (column.properties && column.properties[fieldName]) {
      return column.properties[fieldName];
    }
  }
  return { type: 'string' }; // fallback
};

// Helper function to get field schema from array items (for financialData)
const getArrayFieldSchema = (fieldName: string, sectionName: string, schemaData?: any): any => {
  if (!schemaData) return { type: 'string' };
  
  const sectionSchema = schemaData.properties[sectionName as keyof typeof schemaData.properties];
  if (sectionSchema?.type === 'array' && sectionSchema.items?.properties) {
    const fieldSchema = sectionSchema.items.properties[fieldName];
    return fieldSchema || { type: 'string' };
  }
  
  return { type: 'string' };
};

// Helper function to get column width from schema
const getColumnWidth = (column: any): string => {
  return column.width || 'auto';
};

// Helper function to get column height from schema
const getColumnHeight = (column: any): string => {
  return column.height || 'auto';
};

// Interface for tab configuration
export interface TabConfig {
  key: string;
  label: string;
  icon: string;
}

// Props for the pill field renderer
interface PillFieldProps {
  keyName: string;
  value: any;
  t: any;
  isRTL: boolean;
  isEditing?: boolean;
  onFieldChange?: (fieldName: string, value: any) => void;
  fieldSchema?: any;
}

// Props for the data section renderer
interface DataSectionProps {
  title: string;
  data: any;
  icon: string;
  t: any;
  isRTL: boolean;
  showIcons: boolean;
  sectionName?: string;
  schemaData?: any;
  isEditing?: boolean;
  onFieldChange?: (fieldName: string, value: any) => void;
}

// Props for the tabbed data view
interface TabbedDataViewProps {
  title: string;
  data: any;
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  t: any;
  isRTL: boolean;
  showIcons?: boolean;
  schemaData?: any;
}

// Render a pill field component
export const renderPillField = ({ keyName, value, t, isRTL, isEditing = false, onFieldChange, fieldSchema }: PillFieldProps) => (
  <PillField key={keyName} $isRTL={isRTL}>
    <PillLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${keyName}`) || keyName}</PillLabel>
    <PillContainer $isRTL={isRTL}>
      {isEditing && onFieldChange && fieldSchema ? (
        <FormField
          fieldName={keyName}
          fieldSchema={fieldSchema}
          value={value}
          onChange={onFieldChange}
          isEditing={isEditing}
          isRTL={isRTL}
          t={t}
        />
      ) : (
        <PillValue $isRTL={isRTL}>{value}</PillValue>
      )}
    </PillContainer>
  </PillField>
);

// Render a data section with various layout types
export const renderDataSection = ({ 
  title, 
  data, 
  icon, 
  t, 
  isRTL, 
  showIcons, 
  sectionName = 'entrepreneur',
  schemaData,
  isEditing = false,
  onFieldChange
}: DataSectionProps) => {
  if (Array.isArray(data)) {
    // Check if this is a PDF array (like appraisalReport)
    if (data.length > 0 && data[0] && typeof data[0] === 'object' && 
        'filename' in data[0] && 'data' in data[0]) {
      return (
        <div>
          <SectionTitle>
            {showIcons && <SectionIcon>{icon}</SectionIcon>}
            {title}
          </SectionTitle>
          <PDFListField
            fieldName={sectionName}
            files={data as Array<{ filename: string; data: string }>}
            isRTL={isRTL}
            t={t}
          />
        </div>
      );
    }
    
    const useTableLayout = isTableLayout(sectionName, schemaData);
    
    if (useTableLayout && data.length > 0) {
      const firstItem = data[0];
      const columns = Object.keys(firstItem);
      
      // Special handling for financialData - display metrics as individual columns with metric name as header
      if (sectionName === 'financialData' && firstItem.metric) {
        const dataColumns = columns.filter(col => col !== 'metric');
        
        return (
          <div>
            <SectionTitle>
              {showIcons && <SectionIcon>{icon}</SectionIcon>}
              {title}
            </SectionTitle>
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    {dataColumns.map((column) => (
                      <TableHeaderCell key={column} $isRTL={isRTL}>
                        {t(`entrepreneur.fields.${column}`) || column}
                      </TableHeaderCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      {dataColumns.map((column) => (
                        <TableCell key={column} $isRTL={isRTL}>
                          <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}>
                            {column !== 'comments' && (
                              <div style={{ 
                                fontSize: '14px',
                                fontWeight: 'normal',
                                color: '#6b7280',
                                lineHeight: '22px',
                                display: 'flex',
                                height: '28px',
                                alignItems: 'center'
                              }}>
                                {t(`entrepreneur.fields.${item.metric}`) || item.metric}
                              </div>
                            )}
                            {isEditing && onFieldChange ? (
                              <FormField
                                fieldName={`${index}.${column}`}
                                fieldSchema={getArrayFieldSchema(column, sectionName, schemaData)}
                                value={item[column]}
                                onChange={(fieldName, value) => {
                                  const [rowIndex, colName] = fieldName.split('.');
                                  // Create deep mutable copies to avoid read-only property issues
                                  const newData = JSON.parse(JSON.stringify(data));
                                  newData[parseInt(rowIndex)][colName] = value;
                                  onFieldChange(sectionName, newData);
                                }}
                                isEditing={isEditing}
                                isRTL={isRTL}
                                t={t}
                              />
                            ) : (
                              <div style={{ 
                                color: '#111827',
                                fontWeight: 'normal',
                                fontSize: '18px',
                                lineHeight: '26px',
                                padding: '8px 0',
                                borderBottom: '2px solid #e5e7eb',
                                minHeight: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: isRTL ? 'right' : 'left',
                                direction: isRTL ? 'rtl' : 'ltr',
                                marginTop: column === 'comments' ? '36px' : '0'
                              }}>
                                {formatValue(column, item[column])}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      }
      
      // Default table layout for other sections
      return (
        <div>
          <SectionTitle>
            {showIcons && <SectionIcon>{icon}</SectionIcon>}
            {title}
          </SectionTitle>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHeaderCell key={column} $isRTL={isRTL}>
                      {t(`entrepreneur.fields.${column}`) || column}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column} $isRTL={isRTL}>
                        {formatValue(column, item[column])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    
    // Default card layout for arrays
    return (
      <div>
        <SectionTitle>
          {showIcons && <SectionIcon>{icon}</SectionIcon>}
          {title}
        </SectionTitle>
        <ArrayContainer>
          {data.map((item, index) => (
            <DataCard key={index}>
              <SubSectionTitle>{t('entrepreneur.fields.item', { index: index + 1 }) || `פריט ${index + 1}`}</SubSectionTitle>
              <FieldsContainer>
                {Object.entries(item).map(([key, value]) => {
                  const isTextarea = isTextareaField(key, sectionName, schemaData);
                  const rows = isTextarea ? getFieldRows(key, sectionName, schemaData) : undefined;
                  return (
                    <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                      <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                      {isTextarea ? (
                        <TextareaValue $isRTL={isRTL} $rows={rows}>{String(value)}</TextareaValue>
                      ) : (
                        <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                      )}
                    </FieldGroup>
                  );
                })}
              </FieldsContainer>
            </DataCard>
          ))}
        </ArrayContainer>
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    // Check if it's a nested object with sub-objects
    const hasSubObjects = Object.values(data).some(value => 
      typeof value === 'object' && value !== null && !Array.isArray(value)
    );

    if (hasSubObjects) {
      return (
        <div>
          <SectionTitle>
            {showIcons && <SectionIcon>{icon}</SectionIcon>}
            {title}
          </SectionTitle>
          <DataGrid>
            {Object.entries(data).map(([subKey, subData]) => (
              <DataCard key={subKey}>
                <SubSectionTitle>{subKey}</SubSectionTitle>
                <FieldsContainer>
                  {typeof subData === 'object' && subData !== null ? (
                    Object.entries(subData).map(([key, value]) => {
                      const isTextarea = isTextareaField(key, sectionName, schemaData);
                      const isPDF = isPDFField(key, sectionName, schemaData);
                      const rows = isTextarea ? getFieldRows(key, sectionName, schemaData) : undefined;
                      return (
                        <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                          <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                          {isPDF ? (
                            <PDFField fieldName={key} value={String(value)} isRTL={isRTL} t={t} />
                          ) : isTextarea ? (
                            <TextareaValue $isRTL={isRTL} $rows={rows}>{String(value)}</TextareaValue>
                          ) : (
                            <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                          )}
                        </FieldGroup>
                      );
                    })
                  ) : (
                    <FieldGroup $colspan={getFieldColspan(subKey, sectionName, schemaData)}>
                      <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${subKey}`) || subKey}</DataLabel>
                      {isPDFField(subKey, sectionName, schemaData) ? (
                        <PDFField fieldName={subKey} value={String(subData)} isRTL={isRTL} t={t} />
                      ) : isTextareaField(subKey, sectionName, schemaData) ? (
                        <TextareaValue $isRTL={isRTL} $rows={getFieldRows(subKey, sectionName, schemaData)}>{String(subData)}</TextareaValue>
                      ) : (
                        <DataValue $isRTL={isRTL}>{formatValue(subKey, subData)}</DataValue>
                      )}
                    </FieldGroup>
                  )}
                </FieldsContainer>
              </DataCard>
            ))}
          </DataGrid>
        </div>
      );
    }

    // Simple object
    // Check if this section uses columns layout
    if (hasColumnsLayout(sectionName, schemaData)) {
      const columns = getColumnsFromSchema(sectionName, schemaData);
      
      return (
        <div>
          <SectionTitle>
            {showIcons && <SectionIcon>{icon}</SectionIcon>}
            {title}
          </SectionTitle>
          <DataGrid>
            <DataCard>
              <ColumnsContainer>
                {columns.map((column, columnIndex) => {
                  const columnWidth = getColumnWidth(column);
                  const columnHeight = getColumnHeight(column);
                  const columnProperties = column.properties || {};
                  const columnLayout = column.layout || 'default';
                  
                  // Check if this column contains any textarea fields
                  const hasTextarea = Object.values(columnProperties).some(
                    (fieldSchema: any) => fieldSchema?.type === 'textarea'
                  );
                  
                  return (
                    <ColumnContainer 
                      key={columnIndex} 
                      $width={columnWidth} 
                      $height={columnHeight}
                      $hasTextarea={hasTextarea}
                      $layout={columnLayout}
                    >
                      {columnLayout === 'rank' ? (
                        // Rank layout: render bottom shape fields from all columns vertically as pills
                        <PillFieldsContainer $isRTL={isRTL} $layout="vertical">
                          {getBottomShapeFields(sectionName, schemaData)
                            .filter(key => data[key] !== undefined)
                            .map((key) => {
                              const fieldSchema = getFieldSchemaFromAllColumns(key, sectionName, schemaData);
                              return renderPillField({ 
                                keyName: key, 
                                value: data[key], 
                                t, 
                                isRTL, 
                                isEditing, 
                                onFieldChange, 
                                fieldSchema 
                              });
                            })}
                        </PillFieldsContainer>
                      ) : (
                        <div>
                          {/* Default layout: render fields in grid */}
                          <FieldsContainer>
                            {Object.entries(columnProperties)
                              .filter(([key, fieldSchema]) => {
                                // Show regular fields (not bottom shape)
                                const isBottomShape = (fieldSchema as any)?.shape === 'bottom';
                                return !isBottomShape && data[key] !== undefined;
                              })
                              .map(([key, fieldSchema]) => {
                                const value = data[key];
                                const isTextarea = (fieldSchema as any)?.type === 'textarea';
                                const colspan = (fieldSchema as any)?.colspan || 1;
                                const rows = (fieldSchema as any)?.rows;
                                
                                const isPDF = (fieldSchema as any)?.contentMediaType === 'application/octet-stream' && 
                                             (fieldSchema as any)?.contentEncoding === 'base64';
                                
                                return (
                                  <FieldGroup key={key} $colspan={colspan}>
                                    <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                                    {isEditing && onFieldChange ? (
                                      <FormField
                                        fieldName={key}
                                        fieldSchema={fieldSchema}
                                        value={value}
                                        onChange={onFieldChange}
                                        isEditing={isEditing}
                                        isRTL={isRTL}
                                        t={t}
                                      />
                                    ) : isPDF ? (
                                      <PDFField fieldName={key} value={String(value)} isRTL={isRTL} t={t} />
                                    ) : isTextarea ? (
                                      <TextareaValue $isRTL={isRTL} $rows={rows}>{String(value)}</TextareaValue>
                                    ) : (
                                      <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                                    )}
                                  </FieldGroup>
                                );
                              })}
                          </FieldsContainer>
                          
                          {/* Render bottom shape fields for this column in 2-column pill layout - only for first column */}
                          {columnIndex === 0 && Object.entries(columnProperties).some(([, fieldSchema]) => (fieldSchema as any)?.shape === 'bottom') && (
                            <PillFieldsContainer $isRTL={isRTL}>
                              {Object.entries(columnProperties)
                                .filter(([key, fieldSchema]) => (fieldSchema as any)?.shape === 'bottom' && data[key] !== undefined)
                                .map(([key, fieldSchema]) => renderPillField({ 
                                  keyName: key, 
                                  value: data[key], 
                                  t, 
                                  isRTL, 
                                  isEditing, 
                                  onFieldChange, 
                                  fieldSchema 
                                }))}
                            </PillFieldsContainer>
                          )}
                        </div>
                      )}
                    </ColumnContainer>
                  );
                })}
              </ColumnsContainer>
            </DataCard>
          </DataGrid>
        </div>
      );
    }

    // Default single column layout
    return (
      <div>
        <SectionTitle>
          {showIcons && <SectionIcon>{icon}</SectionIcon>}
          {title}
        </SectionTitle>
        <DataGrid>
          <DataCard>
            {/* Render regular fields first */}
            <FieldsContainer>
              {Object.entries(data)
                .filter(([key]) => !isPillField(key, sectionName, schemaData))
                .map(([key, value]) => {
                  // Check if this field is a PDF array (like appraisalReport)
                  if (Array.isArray(value) && value.length > 0 && 
                      value[0] && typeof value[0] === 'object' && 
                      'filename' in value[0] && 'data' in value[0]) {
                    return (
                      <FieldGroup key={key} $colspan={2}>
                        <PDFListField
                          fieldName={key}
                          files={value as Array<{ filename: string; data: string }>}
                          isRTL={isRTL}
                          t={t}
                        />
                      </FieldGroup>
                    );
                  }
                  
                  const isTextarea = isTextareaField(key, sectionName, schemaData);
                  const isPDF = isPDFField(key, sectionName, schemaData);
                  const rows = isTextarea ? getFieldRows(key, sectionName, schemaData) : undefined;
                  return (
                    <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                      <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                      {isEditing && onFieldChange ? (
                        <FormField
                          fieldName={key}
                          fieldSchema={{ type: isTextarea ? 'textarea' : 'string', rows }}
                          value={value}
                          onChange={onFieldChange}
                          isEditing={isEditing}
                          isRTL={isRTL}
                          t={t}
                        />
                      ) : isPDF ? (
                        <PDFField fieldName={key} value={String(value)} isRTL={isRTL} t={t} />
                      ) : isTextarea ? (
                        <TextareaValue $isRTL={isRTL} $rows={rows}>{String(value)}</TextareaValue>
                      ) : (
                        <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                      )}
                    </FieldGroup>
                  );
                })}
            </FieldsContainer>
            
            {/* Render pill fields at the bottom in 2 columns */}
            <PillFieldsContainer $isRTL={isRTL}>
              {getBottomShapeFields(sectionName, schemaData)
                .filter(key => data[key] !== undefined)
                .map((key) => {
                  const fieldSchema = getFieldSchemaFromAllColumns(key, sectionName, schemaData);
                  return renderPillField({ 
                    keyName: key, 
                    value: data[key], 
                    t, 
                    isRTL, 
                    isEditing, 
                    onFieldChange, 
                    fieldSchema 
                  });
                })}
            </PillFieldsContainer>
          </DataCard>
        </DataGrid>
      </div>
    );
  }

  return null;
};

// Complete tabbed data view component
export const TabbedDataView: React.FC<TabbedDataViewProps> = ({
  title,
  data,
  tabs,
  activeTab,
  onTabChange,
  t,
  isRTL,
  showIcons = false,
  schemaData
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get data from Redux store
  const storeData = useSelector((state: RootState) => state.banker.currentData);
  const originalStoreData = useSelector((state: RootState) => state.banker.originalData);
  
  // Use store data if available, fallback to prop data
  // Always create mutable copies to avoid read-only property issues
  const editableData = storeData ? JSON.parse(JSON.stringify(storeData)) : JSON.parse(JSON.stringify(data));
  const originalData = originalStoreData ? JSON.parse(JSON.stringify(originalStoreData)) : JSON.parse(JSON.stringify(data));
  
  // Type-safe data access
  const currentTabData = editableData?.[activeTab];

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    console.log('Field change:', fieldName, value, 'activeTab:', activeTab);
    
    // Get fresh data from store to ensure we have the latest state
    const currentStoreData = storeData || data;
    // Create a completely new object to break any references to read-only objects
    const updatedData = JSON.parse(JSON.stringify(currentStoreData));
    
    try {
      // Handle array updates (like financialData)
      if (fieldName === activeTab) {
        updatedData[activeTab] = JSON.parse(JSON.stringify(value));
      } else {
        // Handle regular field updates
        if (updatedData[activeTab]) {
          updatedData[activeTab][fieldName] = value;
        }
      }
      
      console.log('Dispatching updated data:', updatedData);
      // Dispatch update to Redux store
      dispatch(updateCurrentData(updatedData));
    } catch (error) {
      console.error('Error updating field:', error);
    }
  }, [activeTab, storeData, data, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
    // Data is now managed by Redux store, no local state updates needed
  };

  const handleSave = () => {
    console.log('Save button clicked - saving data to store and console:', editableData);
    dispatch(saveChanges()); // This will console.log the changes and update original data
    setIsEditing(false);
  };

  const handleCancel = () => {
    console.log('Cancel button clicked - reverting to original data:', originalData);
    dispatch(resetToOriginal()); // Reset to original data from store
    setIsEditing(false);
  };

  const handleClear = () => {
    console.log('Cancel changes button clicked - reverting to original values:', originalData);
    dispatch(resetToOriginal()); // Reset to original data but keep edit mode
    // Keep edit mode active - don't call setIsEditing(false)
  };

  // Debug logging
  console.log('TabbedDataView render - isEditing:', isEditing, 'buttons should show:', !isEditing ? 'Edit only' : 'Save, Cancel, Restore');  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        <ButtonContainer $isRTL={isRTL}>
          {!isEditing ? (
            <EditButton onClick={handleEdit}>
              ✏️ {t('buttons.edit') || 'Edit'}
            </EditButton>
          ) : (
            <>
              <SaveButton onClick={handleSave}>
                💾 {t('buttons.save') || 'Save'}
              </SaveButton>
              <EditButton $isEditing onClick={handleCancel}>
                ❌ {t('buttons.cancel') || 'Cancel'}
              </EditButton>
              <ClearButton onClick={handleClear}>
                ↶ {t('buttons.cancelChanges') || 'Cancel Changes'}
              </ClearButton>
            </>
          )}
        </ButtonContainer>
      </PageHeader>
      
      <TabContainer>
        <TabHeader>
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              isActive={activeTab === tab.key}
              onClick={() => onTabChange(tab.key)}
            >
              {showIcons && <span>{tab.icon}</span>}
              {tab.label}
            </TabButton>
          ))}
        </TabHeader>

        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            {...tabAnimation}
          >
            {currentTabData && renderDataSection({
              title: tabs.find(tab => tab.key === activeTab)?.label || '',
              data: currentTabData,
              icon: tabs.find(tab => tab.key === activeTab)?.icon || '📄',
              t,
              isRTL,
              showIcons,
              sectionName: activeTab,
              schemaData,
              isEditing,
              onFieldChange: handleFieldChange
            })}
          </TabContent>
        </AnimatePresence>
      </TabContainer>
    </Container>
  );
};