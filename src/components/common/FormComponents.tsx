import React from 'react';
import styled from 'styled-components';

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

// DataValue-styled input for seamless editing
export const DataValueInput = styled.input<{ $isRTL?: boolean }>`
  color: #111827;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  padding: 8px 0;
  border: none;
  border-bottom: 2px solid #e5e7eb;
  min-height: 40px;
  display: flex;
  align-items: center;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  background: transparent;
  width: 100%;
  outline: none;
  
  &:focus {
    border-bottom-color: #6366f1;
    background-color: #f8fafc;
  }
  
  &:hover {
    border-bottom-color: #6366f1;
  }
`;

// DataValue-styled textarea for seamless editing
export const DataValueTextarea = styled.textarea<{ $isRTL?: boolean; $rows?: number }>`
  color: #111827;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  padding: 8px 0;
  border: none;
  border-bottom: 2px solid #e5e7eb;
  min-height: ${({ $rows }) => $rows ? `${$rows * 26 + 16}px` : '40px'};
  display: flex;
  align-items: flex-start;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  background: transparent;
  width: 100%;
  outline: none;
  resize: none;
  font-family: inherit;
  
  &:focus {
    border-bottom-color: #6366f1;
    background-color: #f8fafc;
  }
  
  &:hover {
    border-bottom-color: #6366f1;
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

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #d97706;
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

// PDF Action Buttons
export const PDFActionButton = styled.button<{ $variant?: 'download' | 'view' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid ${({ $variant }) => $variant === 'view' ? '#059669' : '#3b82f6'};
  background-color: ${({ $variant }) => $variant === 'view' ? '#059669' : '#3b82f6'};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $variant }) => $variant === 'view' ? '#047857' : '#2563eb'};
    border-color: ${({ $variant }) => $variant === 'view' ? '#047857' : '#2563eb'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

export const PDFButtonsContainer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  flex-wrap: wrap;
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

// Edit indicator icon for editable fields (using icons/edit.svg)
export const EditIndicator = styled.div<{ $isRTL?: boolean; $tooltipText?: string }>`
  position: absolute;
  top: 8px;
  ${({ $isRTL }) => $isRTL ? 'left: 8px;' : 'right: 8px;'}
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--hint-v-padding, 10px);
  align-self: stretch;
  cursor: help;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.08327 3.66676L12.3332 6.91673M4.74997 14.5L13.8336 5.38383C14.2603 4.95717 14.5 4.37849 14.5 3.7751C14.5 3.1717 14.2603 2.59302 13.8336 2.16636C13.407 1.7397 12.8283 1.5 12.2249 1.5C11.6215 1.5 11.0428 1.7397 10.6162 2.16636L1.5 11.25V14.5H4.74997Z' stroke='%232C3E50' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
    transform: scale(1.1);
  }
  
  /* Tooltip */
  &::after {
    content: '${({ $tooltipText }) => $tooltipText || 'Editable field'}';
    position: absolute;
    bottom: 100%;
    ${({ $isRTL }) => $isRTL ? 'right: 0;' : 'left: 0;'}
    background-color: #1f2937;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    margin-bottom: 5px;
  }
  
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

// Clear indicator icon for editable fields (using icons/clear.svg)
export const ClearIndicator = styled.div<{ $isRTL?: boolean; $tooltipText?: string; onClick?: () => void }>`
  position: absolute;
  top: 8px;
  ${({ $isRTL }) => $isRTL ? 'left: 32px;' : 'right: 32px;'}
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--hint-v-padding, 10px);
  align-self: stretch;
  cursor: pointer;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 12.5L12.5 3.5M12.5 12.5L3.5 3.5' stroke='%232C3E50' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
    transform: scale(1.1);
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 12.5L12.5 3.5M12.5 12.5L3.5 3.5' stroke='%23DC2626' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
  
  /* Tooltip */
  &::after {
    content: '${({ $tooltipText }) => $tooltipText || 'Clear field'}';
    position: absolute;
    bottom: 100%;
    ${({ $isRTL }) => $isRTL ? 'right: 0;' : 'left: 0;'}
    background-color: #1f2937;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    margin-bottom: 5px;
  }
  
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

// Clear indicator specifically for textareas (positioned below, using icons/clear.svg)
export const ClearIndicatorTextarea = styled.div<{ $isRTL?: boolean; $tooltipText?: string; onClick?: () => void }>`
  position: absolute;
  bottom: 8px;
  ${({ $isRTL }) => $isRTL ? 'left: 32px;' : 'right: 32px;'}
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--hint-v-padding, 10px);
  align-self: stretch;
  cursor: pointer;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 12.5L12.5 3.5M12.5 12.5L3.5 3.5' stroke='%232C3E50' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
    transform: scale(1.1);
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 12.5L12.5 3.5M12.5 12.5L3.5 3.5' stroke='%23DC2626' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
  
  /* Tooltip */
  &::after {
    content: '${({ $tooltipText }) => $tooltipText || 'Clear field'}';
    position: absolute;
    top: 100%;
    ${({ $isRTL }) => $isRTL ? 'right: 0;' : 'left: 0;'}
    background-color: #1f2937;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    margin-top: 5px;
  }
  
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

// Edit indicator specifically for textareas (positioned below, using icons/edit.svg)
export const EditIndicatorTextarea = styled.div<{ $isRTL?: boolean; $tooltipText?: string }>`
  position: absolute;
  bottom: 8px;
  ${({ $isRTL }) => $isRTL ? 'left: 8px;' : 'right: 8px;'}
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--hint-v-padding, 10px);
  align-self: stretch;
  cursor: help;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.08327 3.66676L12.3332 6.91673M4.74997 14.5L13.8336 5.38383C14.2603 4.95717 14.5 4.37849 14.5 3.7751C14.5 3.1717 14.2603 2.59302 13.8336 2.16636C13.407 1.7397 12.8283 1.5 12.2249 1.5C11.6215 1.5 11.0428 1.7397 10.6162 2.16636L1.5 11.25V14.5H4.74997Z' stroke='%232C3E50' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
    transform: scale(1.1);
  }
  
  /* Tooltip */
  &::after {
    content: '${({ $tooltipText }) => $tooltipText || 'Editable field'}';
    position: absolute;
    top: 100%;
    ${({ $isRTL }) => $isRTL ? 'right: 0;' : 'left: 0;'}
    background-color: #1f2937;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    margin-top: 5px;
  }
  
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
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

// PDF List Component for arrays of PDF files
interface PDFListProps {
  fieldName: string;
  files: Array<{ filename: string; data: string }>;
  isRTL: boolean;
  t: any;
}

export const PDFListContainer = styled.div`
  margin-top: 8px;
`;

export const PDFListHeader = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const PDFListTitle = styled.h4<{ $isRTL?: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const PDFItemContainer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: #f9fafb;
  transition: all 0.2s ease;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  
  &:hover {
    border-color: #d1d5db;
    background-color: #f3f4f6;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PDFItemInfo = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

// PDF icon component (using icons/pdf.svg)
export const PDFIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.283px;
  height: 37.034px;
  flex-shrink: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='39' height='38' viewBox='0 0 39 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5171 1.20026H26.23L37.8003 12.7696V32.2344C37.8 34.2225 36.1878 35.834 34.1997 35.834H14.5171C12.5291 35.8339 10.9177 34.2224 10.9175 32.2344V4.79987C10.9176 2.8118 12.529 1.20036 14.5171 1.20026Z' fill='%23EEF1F7' stroke='%23CBD0DC' stroke-width='2.4'/%3E%3Crect x='0.674316' y='16.3638' width='25.8377' height='15.0719' rx='5.6' fill='%23D82042'/%3E%3Cpath d='M4.95667 27.5602V20.357H7.52423C8.08464 20.357 8.54891 20.459 8.91705 20.663C9.28518 20.867 9.5607 21.146 9.74359 21.5001C9.92649 21.8518 10.0179 22.2481 10.0179 22.6889C10.0179 23.1321 9.92531 23.5307 9.74007 23.8847C9.55718 24.2365 9.28049 24.5155 8.91001 24.7218C8.54188 24.9258 8.07878 25.0278 7.52071 25.0278H5.75507V24.1063H7.42223C7.7763 24.1063 8.06354 24.0454 8.28395 23.9234C8.50436 23.7992 8.66615 23.6303 8.76932 23.417C8.87249 23.2036 8.92408 22.9609 8.92408 22.6889C8.92408 22.4169 8.87249 22.1754 8.76932 21.9644C8.66615 21.7533 8.50319 21.588 8.28043 21.4684C8.06002 21.3488 7.76926 21.2891 7.40816 21.2891H6.04348V27.5602H4.95667Z' fill='white'/%3E%3Cpath d='M13.624 27.5602H11.292V20.357H13.6978C14.4036 20.357 15.0097 20.5012 15.5162 20.7896C16.0227 21.0757 16.4108 21.4872 16.6804 22.0241C16.9524 22.5588 17.0884 23.2001 17.0884 23.9481C17.0884 24.6984 16.9512 25.3432 16.6769 25.8825C16.4049 26.4218 16.011 26.8368 15.4951 27.1276C14.9793 27.416 14.3555 27.5602 13.624 27.5602ZM12.3789 26.6106H13.5642C14.1128 26.6106 14.5689 26.5074 14.9324 26.3011C15.2958 26.0924 15.5678 25.7911 15.7484 25.3971C15.9289 25.0009 16.0192 24.5178 16.0192 23.9481C16.0192 23.383 15.9289 22.9034 15.7484 22.5095C15.5701 22.1156 15.304 21.8166 14.9499 21.6126C14.5959 21.4086 14.1562 21.3066 13.631 21.3066H12.3789V26.6106Z' fill='white'/%3E%3Cpath d='M18.4399 27.5602V20.357H22.9068V21.2926H19.5267V23.4873H22.5867V24.4194H19.5267V27.5602H18.4399Z' fill='white'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const PDFDetails = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const PDFFilename = styled.div<{ $isRTL?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
`;

export const PDFFileSize = styled.div<{ $isRTL?: boolean }>`
  font-size: 14px;
  color: #6b7280;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
`;

export const PDFActionsContainer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  gap: 8px;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

export const PDFListField: React.FC<PDFListProps> = ({
  fieldName,
  files,
  isRTL,
  t
}) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    return (
      <PDFListContainer>
        <PDFListHeader $isRTL={isRTL}>
          <PDFListTitle $isRTL={isRTL}>
            📄 {t('entrepreneur.fields.appraisalReport') || 'Appraisal Reports'}
          </PDFListTitle>
        </PDFListHeader>
        <PDFItemContainer $isRTL={isRTL}>
          <PDFItemInfo $isRTL={isRTL}>
            <div style={{ 
              color: '#6b7280',
              fontStyle: 'italic',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t('buttons.noPDFsAvailable') || 'No PDF files available'}
            </div>
          </PDFItemInfo>
        </PDFItemContainer>
      </PDFListContainer>
    );
  }

  const handleDownload = (data: string, filename: string) => {
    const { downloadPDF } = require('../../utils');
    downloadPDF(data, filename);
  };

  const handleView = (data: string, filename: string) => {
    const { openPDFInNewWindow } = require('../../utils');
    openPDFInNewWindow(data, filename);
  };

  const calculateFileSize = (base64Data: string): string => {
    // Rough estimate: base64 is ~33% larger than original binary
    const sizeInBytes = (base64Data.length * 3) / 4;
    if (sizeInBytes < 1024) {
      return `${Math.round(sizeInBytes)} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${Math.round(sizeInBytes / 1024)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <PDFListContainer>
      <PDFListHeader $isRTL={isRTL}>
        <PDFListTitle $isRTL={isRTL}>
          📄 {t('entrepreneur.fields.appraisalReport') || 'Appraisal Reports'}
          <span style={{ 
            fontSize: '14px', 
            fontWeight: 'normal', 
            color: '#6b7280' 
          }}>
            ({files.length} {files.length === 1 ? 
              (t('buttons.file') || 'file') : 
              (t('buttons.files') || 'files')
            })
          </span>
        </PDFListTitle>
      </PDFListHeader>
      
      {files.map((file, index) => (
        <PDFItemContainer key={index} $isRTL={isRTL}>
          <PDFItemInfo $isRTL={isRTL}>
            <PDFIcon />
            <PDFDetails $isRTL={isRTL}>
              <PDFFilename $isRTL={isRTL}>
                {file.filename || `${t('buttons.document') || 'Document'} ${index + 1}.pdf`}
              </PDFFilename>
              <PDFFileSize $isRTL={isRTL}>
                {calculateFileSize(file.data)} • PDF {t('buttons.document') || 'Document'}
              </PDFFileSize>
            </PDFDetails>
          </PDFItemInfo>
          
          <PDFActionsContainer $isRTL={isRTL}>
            <PDFActionButton 
              $variant="view" 
              onClick={() => handleView(file.data, file.filename)}
              title={t('buttons.viewPDF') || 'View PDF in new window'}
            >
              👁️ {t('buttons.view') || 'View'}
            </PDFActionButton>
            <PDFActionButton 
              $variant="download" 
              onClick={() => handleDownload(file.data, file.filename)}
              title={t('buttons.downloadPDF') || 'Download PDF file'}
            >
              📥 {t('buttons.download') || 'Download'}
            </PDFActionButton>
          </PDFActionsContainer>
        </PDFItemContainer>
      ))}
    </PDFListContainer>
  );
};

// PDF Field Component
interface PDFFieldProps {
  fieldName: string;
  value: string;
  isRTL: boolean;
  t: any;
}

export const PDFField: React.FC<PDFFieldProps> = ({
  fieldName,
  value,
  isRTL,
  t
}) => {
  const handleDownload = () => {
    if (value && typeof value === 'string') {
      const { downloadPDF } = require('../../utils');
      downloadPDF(value, `${fieldName}.pdf`);
    }
  };

  const handleView = () => {
    if (value && typeof value === 'string') {
      const { openPDFInNewWindow } = require('../../utils');
      openPDFInNewWindow(value, `${fieldName}.pdf`);
    }
  };

  const isPDFAvailable = value && typeof value === 'string' && value.length > 0;

  return (
    <FormFieldWrapper>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '2px solid #e5e7eb',
        minHeight: '40px'
      }}>
        <span style={{ 
          color: isPDFAvailable ? '#059669' : '#6b7280',
          fontWeight: '500',
          fontSize: '16px'
        }}>
          {isPDFAvailable 
            ? `📄 ${t('buttons.pdfAvailable') || 'PDF Available'}`
            : `❌ ${t('buttons.pdfNotAvailable') || 'PDF Not Available'}`
          }
        </span>
        
        {isPDFAvailable && (
          <PDFButtonsContainer $isRTL={isRTL}>
            <PDFActionButton $variant="view" onClick={handleView}>
              👁️ {t('buttons.view') || 'View'}
            </PDFActionButton>
            <PDFActionButton $variant="download" onClick={handleDownload}>
              📥 {t('buttons.download') || 'Download'}
            </PDFActionButton>
          </PDFButtonsContainer>
        )}
      </div>
    </FormFieldWrapper>
  );
};

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

  const handleClear = () => {
    const clearValue = fieldSchema.type === 'integer' || fieldSchema.type === 'number' ? 0 : '';
    onChange(fieldName, clearValue);
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

  // Check if field is editable based on schema property
  const isFieldEditable = isEditing && (fieldSchema.editable === true);
  const showEditIndicator = isEditing && (fieldSchema.editable === true);
  const editTooltipText = t('buttons.editableField') || 'This field is editable';
  const clearTooltipText = t('buttons.clearField') || 'Clear field';
  
  // Extract actual field name for placeholder (handle composite names like "0.banker" -> "banker")
  const actualFieldName = fieldName.includes('.') ? fieldName.split('.').pop() : fieldName;
  const placeholderText = isFieldEditable ? t(`entrepreneur.fields.${actualFieldName}`) || actualFieldName : '';

  // Handle PDF fields specially
  if (fieldSchema.contentMediaType === 'application/octet-stream' && 
      fieldSchema.contentEncoding === 'base64') {
    return <PDFField fieldName={fieldName} value={value} isRTL={isRTL} t={t} />;
  }

  if (fieldSchema.type === 'textarea') {
    return (
      <FormFieldWrapper $isEditing={isEditing}>
        {showEditIndicator && <EditIndicatorTextarea $isRTL={isRTL} $tooltipText={editTooltipText} />}
        {showEditIndicator && <ClearIndicatorTextarea $isRTL={isRTL} $tooltipText={clearTooltipText} onClick={handleClear} />}
        <DataValueTextarea
          value={value || ''}
          onChange={handleChange}
          disabled={!isFieldEditable}
          $isRTL={isRTL}
          $rows={fieldSchema.rows}
          placeholder={placeholderText}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormFieldWrapper $isEditing={isEditing}>
      {showEditIndicator && <EditIndicator $isRTL={isRTL} $tooltipText={editTooltipText} />}
      {showEditIndicator && <ClearIndicator $isRTL={isRTL} $tooltipText={clearTooltipText} onClick={handleClear} />}
      <DataValueInput
        type={getInputType()}
        value={value || ''}
        onChange={handleChange}
        disabled={!isFieldEditable}
        $isRTL={isRTL}
        placeholder={placeholderText}
        min={fieldSchema.minimum}
        max={fieldSchema.maximum}
        pattern={fieldSchema.pattern}
      />
    </FormFieldWrapper>
  );
};