import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  PageHeader,
  PageTitle,
  DataCard,
  FieldsContainer,
  FieldGroup,
  DataLabel,
  Button,
  Input
} from '../common';

interface SimpleFormProps {
  onSubmit?: (data: any) => void;
}

const SimpleForm: React.FC<SimpleFormProps> = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Container dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader>
        <PageTitle>Simple Form Example</PageTitle>
      </PageHeader>
      
      <DataCard>
        <form onSubmit={handleSubmit}>
          <FieldsContainer>
            <FieldGroup>
              <DataLabel $isRTL={isRTL}>Name</DataLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </FieldGroup>
            
            <FieldGroup>
              <DataLabel $isRTL={isRTL}>Email</DataLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </FieldGroup>
            
            <FieldGroup>
              <DataLabel $isRTL={isRTL}>Phone</DataLabel>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </FieldGroup>
            
            <FieldGroup>
              <DataLabel $isRTL={isRTL}>Company</DataLabel>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter your company name"
              />
            </FieldGroup>
            
            <FieldGroup $colspan={2}>
              <Button type="submit">
                Submit Form
              </Button>
            </FieldGroup>
          </FieldsContainer>
        </form>
      </DataCard>
    </Container>
  );
};

export default SimpleForm;