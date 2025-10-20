import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import { FormField, EditButton, SaveButton, ButtonContainer } from './FormComponents';
import { formatValue, getFieldColspan, isPillField, isTextareaField, getFieldRows, isTableLayout, getBottomShapeFields, tabAnimation } from './DataFormatters';

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
    const useTableLayout = isTableLayout(sectionName, schemaData);
    
    if (useTableLayout && data.length > 0) {
      const firstItem = data[0];
      const columns = Object.keys(firstItem);
      
      // Special handling for financialData - display metrics as individual columns with metric name as header
      if (sectionName === 'financialData' && firstItem.metric) {
        const dataColumns = columns.filter(col => col !== 'metric' && col !== 'comments');
        
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
                    {isEditing && (
                      <TableHeaderCell $isRTL={isRTL}>
                        {t('buttons.edit') || 'Edit'}
                      </TableHeaderCell>
                    )}
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
                            {isEditing && onFieldChange ? (
                              <FormField
                                fieldName={`${index}.${column}`}
                                fieldSchema={{ type: 'integer', minimum: 0 }}
                                value={item[column]}
                                onChange={(fieldName, value) => {
                                  const [rowIndex, colName] = fieldName.split('.');
                                  const newData = [...data];
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
                                direction: isRTL ? 'rtl' : 'ltr'
                              }}>
                                {formatValue(column, item[column])}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      ))}
                      {isEditing && (
                        <TableCell $isRTL={isRTL}>
                          <EditButton onClick={() => console.log('Edit row', index)}>
                            ✏️
                          </EditButton>
                        </TableCell>
                      )}
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
                    })
                  ) : (
                    <FieldGroup $colspan={getFieldColspan(subKey, sectionName, schemaData)}>
                      <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${subKey}`) || subKey}</DataLabel>
                      {isTextareaField(subKey, sectionName, schemaData) ? (
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
                  const isTextarea = isTextareaField(key, sectionName, schemaData);
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
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(data);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setEditableData((prev: any) => {
      // Handle array updates (like financialData)
      if (fieldName === activeTab) {
        return {
          ...prev,
          [activeTab]: value
        };
      }
      // Handle regular field updates
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [fieldName]: value
        }
      };
    });
  }, [activeTab]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditableData(data); // Reset to original data when starting edit
  };

  const handleSave = () => {
    console.log('Updated data:', editableData);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableData(data); // Reset to original data
  };

  return (
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
              <EditButton $isEditing onClick={handleCancel}>
                ❌ {t('buttons.cancel') || 'Cancel'}
              </EditButton>
              <SaveButton onClick={handleSave}>
                💾 {t('buttons.save') || 'Save'}
              </SaveButton>
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
            {editableData[activeTab] && renderDataSection({
              title: tabs.find(tab => tab.key === activeTab)?.label || '',
              data: editableData[activeTab],
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