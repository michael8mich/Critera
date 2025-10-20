import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from './index';

// Layout Components
export const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: ${theme.spacing.lg};
  box-sizing: border-box;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};
`;

// Tab Components
export const TabContainer = styled.div`
  background-color: transparent;
  border-radius: 36px;
  overflow: hidden;
  margin: 0;
  min-height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TabHeader = styled.div`
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

export const TabButton = styled.button<{ isActive: boolean }>`
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

export const TabContent = styled(motion.div)`
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

// Section Components
export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: var(--text-headings, #405061);
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid #f1f5f9;
  font-size: var(--font-size-heading-h6, 24px);
  font-style: normal;
  font-weight: 600;
  line-height: var(--line-height-heading-h6, 24px); /* 100% */
`;

export const SectionIcon = styled.span`
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

export const SubSectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: #6366f1;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-left: 4px solid #6366f1;
  border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
`;

// Grid and Layout Components
export const DataGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const DataCard = styled(Card)`
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  padding: ${theme.spacing.lg};
`;

export const FieldsContainer = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

export const ColumnContainer = styled.div<{ $width?: string; $height?: string; $hasTextarea?: boolean }>`
  flex: ${({ $width }) => $width === 'auto' ? '1' : '0 0 ' + $width};
  min-width: 0;
  width: ${({ $width }) => $width || 'auto'};
  height: ${({ $height }) => $height || 'auto'};
  padding: ${({ $hasTextarea }) => $hasTextarea ? '20px' : '0'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex: 1;
    width: 100%;
    padding: 0;
  }
`;

export const FieldGroup = styled.div<{ $colspan?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  grid-column: span ${({ $colspan }) => $colspan || 1};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

export const ArrayContainer = styled.div`
  display: flex;
  min-height: 48px;
  padding: var(--v-padding, 12px) 0 var(--v-padding, 12px) var(--h-paddingRight, 12px);
  align-items: center;
  gap: var(--spacing, 12px);
  align-self: stretch;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

// Form and Data Components
export const DataLabel = styled.label<{ $isRTL: boolean }>`
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

export const DataValue = styled.div<{ $isRTL?: boolean }>`
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

// Pill Components (for special fields)
export const PillFieldsContainer = styled.div<{ $isRTL?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const PillField = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: ${({ $isRTL }) => $isRTL ? 'flex-end' : 'flex-start'};
`;

export const PillLabel = styled.div<{ $isRTL?: boolean }>`
  font-size: 14px;
  line-height: 22px;
  color: ${theme.colors.gray[700]};
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  width: 100%;
`;

export const PillContainer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const PillValue = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  width: 180px;
  height: 44px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 2px solid #6A7784;
  background: #FFF;
  box-shadow: 0 2px 4px 0 rgba(64, 80, 97, 0.18);
  color: #566473;
  text-align: center;
  font-family: "Noto Sans Hebrew", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  font-feature-settings: 'liga' off, 'clig' off;
  margin-left: ${({ $isRTL }) => $isRTL ? 'auto' : '0'};
  margin-right: ${({ $isRTL }) => $isRTL ? '0' : 'auto'};
`;

// Textarea component for large text fields
export const TextareaValue = styled.div<{ $isRTL?: boolean; $rows?: number }>`
  color: ${theme.colors.gray[900]};
  font-weight: ${theme.typography.fontWeight.normal};
  font-size: 16px;
  line-height: 22px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  min-height: ${({ $rows }) => $rows ? `${$rows * 22 + 40}px` : '120px'};
  max-height: ${({ $rows }) => $rows ? `${$rows * 22 + 40}px` : '340px'};
  overflow-y: auto;
  background: #f9fafb;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  white-space: pre-wrap;
  word-wrap: break-word;
  
  &:hover {
    border-color: #6366f1;
    background: #f8fafc;
  }
`;