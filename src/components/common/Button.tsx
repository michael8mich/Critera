import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily.primary.join(', ')};
  
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
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          height: 48px;
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
          height: 40px;
        `;
    }
  }}
  
  /* Variant styles */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[700]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[200]};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          border-color: ${theme.colors.primary[600]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary[600]};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
          }
        `;
    }
  }}
  
  /* Full width */
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Loading state */
  ${({ loading }) => loading && `
    position: relative;
    color: transparent;
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `}
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;