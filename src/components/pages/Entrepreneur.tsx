import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from '../common';
import sampleData from '../../tempData/sampleBankData.json';

interface EntrepreneurProps {
  data?: any;
}

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: ${theme.spacing.lg};
  box-sizing: border-box;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};
`;

const TabContainer = styled.div`
  background-color: transparent;
  border-radius: 36px;
  overflow: hidden;
  margin: 0;
  min-height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
  padding: 15px 12px 15px 12px;
  border-radius: 36px;
  border: 2px solid #6366f1;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 6px;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  width: 172px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: ${({ isActive }) => 
    isActive ? '#7D6EEC' : 'transparent'};
  color: ${({ isActive }) => 
    isActive ? 'white' : '#6b7280'};
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${({ isActive }) => 
      isActive ? '#6b5dd6' : '#f3f4f6'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #7D6EEC, 0 0 0 4px rgba(125, 110, 236, 0.1);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 140px;
    font-size: 13px;
    padding: 8px 12px;
  }
`;

const TabContent = styled(motion.div)`
  padding: ${theme.spacing['2xl']};
  flex: 1;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  margin-top: ${theme.spacing.md};
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 300px);
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid #f1f5f9;
`;

const SectionIcon = styled.span`
  font-size: 1.5em;
  padding: ${theme.spacing.sm};
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: ${theme.borderRadius.lg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
`;

const DataGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const DataCard = styled(Card)`
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  padding: ${theme.spacing.lg};
`;

const FieldsContainer = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const DataLabel = styled.label<{ $isRTL: boolean }>`
  display: flex;
  height: 28px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
  flex: 1 0 0;
  font-size: 14px;
  line-height: var(--line-height-body-sm, 22px);
`;

const DataValue = styled.div<{ $isRTL?: boolean }>`
  color: ${theme.colors.gray[900]};
  font-weight: ${theme.typography.fontWeight.normal};
  font-size: 18px;
  line-height: 26px;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 2px solid #e5e7eb;
  min-height: 40px;
  display: flex;
  align-items: center;
  text-align: left;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  justify-content: flex-start;
  
  &:hover {
    border-bottom-color: #6366f1;
  }
`;

const SubSectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: #6366f1;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-left: 4px solid #6366f1;
  border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
`;

const ArrayContainer = styled.div`
  display: flex;
  min-height: 48px;
padding: var(--v-padding, 12px) 0 var(--v-padding, 12px) var(--h-paddingRight, 12px);
align-items: center;
gap: var(--spacing, 12px);
align-self: stretch;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

const formatValue = (key: string, value: any): string => {
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

const renderDataSection = (title: string, data: any, icon: string, t: any, isRTL: boolean) => {
  if (Array.isArray(data)) {
    return (
      <div>
        <SectionTitle>
          <SectionIcon>{icon}</SectionIcon>
          {title}
        </SectionTitle>
        <ArrayContainer>
          {data.map((item, index) => (
            <DataCard key={index}>
              <SubSectionTitle>{t('entrepreneur.fields.item', { index: index + 1 }) || `פריט ${index + 1}`}</SubSectionTitle>
              <FieldsContainer>
                {Object.entries(item).map(([key, value]) => (
                  <FieldGroup key={key}>
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
            <SectionIcon>{icon}</SectionIcon>
            {title}
          </SectionTitle>
          <DataGrid>
            {Object.entries(data).map(([subKey, subData]) => (
              <DataCard key={subKey}>
                <SubSectionTitle>{subKey}</SubSectionTitle>
                <FieldsContainer>
                  {typeof subData === 'object' && subData !== null ? (
                    Object.entries(subData).map(([key, value]) => (
                      <FieldGroup key={key}>
                        <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                        <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                      </FieldGroup>
                    ))
                  ) : (
                    <FieldGroup>
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
          <SectionIcon>{icon}</SectionIcon>
          {title}
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <FieldsContainer>
              {Object.entries(data).map(([key, value]) => (
                <FieldGroup key={key}>
                  <DataLabel $isRTL={isRTL}>{t(`entrepreneur.fields.${key}`) || key}</DataLabel>
                  <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
                </FieldGroup>
              ))}
            </FieldsContainer>
          </DataCard>
        </DataGrid>
      </div>
    );
  }

  return null;
};

const Entrepreneur: React.FC<EntrepreneurProps> = ({ data = sampleData }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('entrepreneur');
  const isRTL = i18n.language === 'he';

  const tabs = [
    { key: 'entrepreneur', label: t('entrepreneur.tabs.entrepreneur'), icon: '👤' },
    { key: 'funding', label: t('entrepreneur.tabs.funding'), icon: '💰' },
    { key: 'project', label: t('entrepreneur.tabs.project'), icon: '🏗️' },
    { key: 'financing', label: t('entrepreneur.tabs.financing'), icon: '🏦' },
    { key: 'fee', label: t('entrepreneur.tabs.fee'), icon: '💳' },
    { key: 'creditConditions', label: t('entrepreneur.tabs.creditConditions'), icon: '📋' },
    { key: 'financialData', label: t('entrepreneur.tabs.financialData'), icon: '📊' },
  ];

  const tabAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>{t('entrepreneur.title') || 'מערכת ניהול יזמים'}</PageTitle>
      </PageHeader>
      
      <TabContainer>
        <TabHeader>
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabHeader>

        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            {...tabAnimation}
          >
            {data[activeTab] && renderDataSection(
              tabs.find(tab => tab.key === activeTab)?.label || '',
              data[activeTab],
              tabs.find(tab => tab.key === activeTab)?.icon || '📄',
              t,
              isRTL
            )}
          </TabContent>
        </AnimatePresence>
      </TabContainer>
    </Container>
  );
};

export default Entrepreneur;