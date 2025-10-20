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
  PillValue
} from './StyledComponents';
import { formatValue, getFieldColspan, isPillField, tabAnimation } from './DataFormatters';

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
                {Object.entries(item).map(([key, value]) => (
                  <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                    <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                    <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                  </FieldGroup>
                ))}
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
                    Object.entries(subData).map(([key, value]) => (
                      <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                        <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                        <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                      </FieldGroup>
                    ))
                  ) : (
                    <FieldGroup $colspan={getFieldColspan(subKey, sectionName, schemaData)}>
                      <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${subKey}`) || subKey}</DataLabel>
                      <DataValue $isRTL={isRTL}>{formatValue(subKey, subData)}</DataValue>
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
                .filter(([key]) => !isPillField(key))
                .map(([key, value]) => (
                  <FieldGroup key={key} $colspan={getFieldColspan(key, sectionName, schemaData)}>
                    <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                    <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                  </FieldGroup>
                ))}
            </FieldsContainer>
            
            {/* Render pill fields at the bottom in 2 columns */}
            <PillFieldsContainer $isRTL={isRTL}>
              {Object.entries(data)
                .filter(([key]) => isPillField(key))
                .map(([key, value]) => renderPillField({ keyName: key, value, t, isRTL }))}
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