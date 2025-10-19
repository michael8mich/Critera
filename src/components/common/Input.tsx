import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
`;

const StyledInput = styled.input<InputProps>`
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background-color: white;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.join(', ')};
  transition: all 0.2s ease-in-out;
  
  /* Size variations */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          height: 32px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
          height: 48px;
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.base};
          height: 40px;
        `;
    }
  }}
  
  /* Full width */
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  /* Error state */
  ${({ error }) => error && `
    border-color: ${theme.colors.error};
    &:focus {
      outline: none;
      border-color: ${theme.colors.error};
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `}
  
  /* Normal focus state */
  &:focus:not([data-error="true"]) {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  /* Disabled state */
  &:disabled {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  color: ${({ error }) => error ? theme.colors.error : theme.colors.gray[500]};
`;

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  size = 'md',
  fullWidth = false,
  error = false,
  label,
  helperText,
  className,
  ...props
}) => {
  return (
    <InputContainer fullWidth={fullWidth} className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: theme.colors.error }}>*</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        size={size}
        fullWidth={fullWidth}
        error={error}
        data-error={error}
        {...props}
      />
      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </InputContainer>
  );
};

export default Input;