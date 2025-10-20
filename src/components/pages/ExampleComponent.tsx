import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  PageHeader,
  PageTitle,
  DataGrid,
  DataCard,
  FieldsContainer,
  FieldGroup,
  DataLabel,
  DataValue,
  SectionTitle,
  SectionIcon,
  formatValue
} from '../common';

interface ExampleComponentProps {
  data?: any;
}

// Example data structure
const exampleData = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    totalRevenue: 150000,
    profitMargin: 12.5
  },
  company: {
    name: 'Example Corp',
    employees: 50,
    foundedYear: 2020,
    annualRevenue: 5000000
  }
};

const ExampleComponent: React.FC<ExampleComponentProps> = ({ data = exampleData }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>Example Component Using Shared Styles</PageTitle>
      </PageHeader>
      
      <DataGrid>
        {/* User Information Card */}
        <DataCard>
          <SectionTitle>
            <SectionIcon>👤</SectionIcon>
            User Information
          </SectionTitle>
          <FieldsContainer>
            {Object.entries(data.user).map(([key, value]) => (
              <FieldGroup key={key}>
                <DataLabel $isRTL={isRTL}>{key}</DataLabel>
                <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
              </FieldGroup>
            ))}
          </FieldsContainer>
        </DataCard>

        {/* Company Information Card */}
        <DataCard>
          <SectionTitle>
            <SectionIcon>🏢</SectionIcon>
            Company Information
          </SectionTitle>
          <FieldsContainer>
            {Object.entries(data.company).map(([key, value]) => (
              <FieldGroup key={key}>
                <DataLabel $isRTL={isRTL}>{key}</DataLabel>
                <DataValue $isRTL={isRTL}>{formatValue(key, value)}</DataValue>
              </FieldGroup>
            ))}
          </FieldsContainer>
        </DataCard>
      </DataGrid>
    </Container>
  );
};

export default ExampleComponent;