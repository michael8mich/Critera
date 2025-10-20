import React from 'react';
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
export const renderPillField = ({ keyName, value, t, isRTL }: PillFieldProps) => (
  <PillField key={keyName} $isRTL={isRTL}>
    <PillLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${keyName}`) || keyName}</PillLabel>
    <PillContainer $isRTL={isRTL}>
      <PillValue $isRTL={isRTL}>{value}</PillValue>
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
  schemaData 
}: DataSectionProps) => {
  if (Array.isArray(data)) {
    const useTableLayout = isTableLayout(sectionName, schemaData);
    
    if (useTableLayout && data.length > 0) {
      // Table layout for arrays
      const firstItem = data[0];
      const columns = Object.keys(firstItem);
      
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
                            .map((key) => renderPillField({ keyName: key, value: data[key], t, isRTL }))}
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
                                    {isTextarea ? (
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
                                .map(([key]) => renderPillField({ keyName: key, value: data[key], t, isRTL }))}
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
                      {isTextarea ? (
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
                .map((key) => renderPillField({ keyName: key, value: data[key], t, isRTL }))}
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
  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
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
            {data[activeTab] && renderDataSection({
              title: tabs.find(tab => tab.key === activeTab)?.label || '',
              data: data[activeTab],
              icon: tabs.find(tab => tab.key === activeTab)?.icon || '📄',
              t,
              isRTL,
              showIcons,
              sectionName: activeTab,
              schemaData
            })}
          </TabContent>
        </AnimatePresence>
      </TabContainer>
    </Container>
  );
};