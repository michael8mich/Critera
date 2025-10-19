import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const StyledCard = styled.div<CardProps>`
  background-color: white;
  border: 1px solid ${theme.colors.gray[200]};
  
  /* Padding variations */
  ${({ padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return `padding: ${theme.spacing.md};`;
      case 'lg':
        return `padding: ${theme.spacing.xl};`;
      default:
        return `padding: ${theme.spacing.lg};`;
    }
  }}
  
  /* Shadow variations */
  ${({ shadow = 'md' }) => {
    switch (shadow) {
      case 'sm':
        return `box-shadow: ${theme.shadows.sm};`;
      case 'lg':
        return `box-shadow: ${theme.shadows.lg};`;
      case 'xl':
        return `box-shadow: ${theme.shadows.xl};`;
      default:
        return `box-shadow: ${theme.shadows.md};`;
    }
  }}
  
  /* Border radius variations */
  ${({ rounded = 'lg' }) => {
    switch (rounded) {
      case 'sm':
        return `border-radius: ${theme.borderRadius.sm};`;
      case 'md':
        return `border-radius: ${theme.borderRadius.md};`;
      case 'xl':
        return `border-radius: ${theme.borderRadius.xl};`;
      default:
        return `border-radius: ${theme.borderRadius.lg};`;
    }
  }}
`;

const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  className,
  ...props
}) => {
  return (
    <StyledCard
      padding={padding}
      shadow={shadow}
      rounded={rounded}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;