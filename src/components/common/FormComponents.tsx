import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

// Form Input Components
export const FormInput = styled.input<{ $isRTL?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  line-height: 20px;
  background-color: white;
  transition: all 0.2s ease;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
  
  &[type="number"] {
    text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  }
`;

export const FormTextarea = styled.textarea<{ $isRTL?: boolean; $rows?: number }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  line-height: 20px;
  background-color: white;
  transition: all 0.2s ease;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  rows: ${({ $rows }) => $rows || 4};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
    resize: none;
  }
`;

export const EditButton = styled.button<{ $isEditing?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${({ $isEditing }) => $isEditing ? '#ef4444' : '#6366f1'};
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $isEditing }) => $isEditing ? '#dc2626' : '#5856eb'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #059669;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonContainer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  gap: 12px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const FormFieldWrapper = styled.div<{ $isEditing?: boolean }>`
  position: relative;
  transition: all 0.2s ease;
  
  ${({ $isEditing }) => $isEditing && `
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      border-radius: 22px;
      z-index: -1;
      opacity: 0.1;
    }
  `}
`;

// Form field component that handles different input types
interface FormFieldProps {
  fieldName: string;
  fieldSchema: any;
  value: any;
  onChange: (fieldName: string, value: any) => void;
  isEditing: boolean;
  isRTL: boolean;
  t: any;
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldName,
  fieldSchema,
  value,
  onChange,
  isEditing,
  isRTL,
  t
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = fieldSchema.type === 'integer' || fieldSchema.type === 'number' 
      ? parseFloat(e.target.value) || 0 
      : e.target.value;
    onChange(fieldName, newValue);
  };

  const getInputType = () => {
    switch (fieldSchema.type) {
      case 'integer':
      case 'number':
        return 'number';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };

  if (fieldSchema.type === 'textarea') {
    return (
      <FormFieldWrapper $isEditing={isEditing}>
        <FormTextarea
          value={value || ''}
          onChange={handleChange}
          disabled={!isEditing}
          $isRTL={isRTL}
          $rows={fieldSchema.rows}
          placeholder={isEditing ? t(`entrepreneur.fields.${fieldName}`) || fieldName : ''}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper $isEditing={isEditing}>
      <FormInput
        type={getInputType()}
        value={value || ''}
        onChange={handleChange}
        disabled={!isEditing}
        $isRTL={isRTL}
        placeholder={isEditing ? t(`entrepreneur.fields.${fieldName}`) || fieldName : ''}
        min={fieldSchema.minimum}
        max={fieldSchema.maximum}
        pattern={fieldSchema.pattern}
      />
    </FormFieldWrapper>
  );
};