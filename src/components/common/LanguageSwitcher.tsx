import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface LanguageSwitcherProps {
  className?: string;
}

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled.button<{ isRtl: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background-color: white;
  color: ${theme.colors.gray[700]};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  direction: ${({ isRtl }) => isRtl ? 'rtl' : 'ltr'};
  
  &:hover {
    border-color: ${theme.colors.primary[500]};
    color: ${theme.colors.primary[600]};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean; isRtl: boolean }>`
  position: absolute;
  top: 100%;
  ${({ isRtl }) => isRtl ? 'left: 0;' : 'right: 0;'}
  margin-top: ${theme.spacing.sm};
  background-color: white;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  min-width: 120px;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease-in-out;
`;

const LanguageOption = styled.button<{ isActive: boolean; isRtl: boolean }>`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background-color: ${({ isActive }) => isActive ? theme.colors.primary[50] : 'transparent'};
  color: ${({ isActive }) => isActive ? theme.colors.primary[700] : theme.colors.gray[700]};
  text-align: ${({ isRtl }) => isRtl ? 'right' : 'left'};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  direction: ${({ isRtl }) => isRtl ? 'rtl' : 'ltr'};
  
  &:first-child {
    border-top-left-radius: ${theme.borderRadius.md};
    border-top-right-radius: ${theme.borderRadius.md};
  }
  
  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.md};
    border-bottom-right-radius: ${theme.borderRadius.md};
  }
  
  &:hover {
    background-color: ${({ isActive }) => isActive ? theme.colors.primary[100] : theme.colors.gray[50]};
  }
`;

const FlagIcon = styled.span`
  font-size: 16px;
`;

const ChevronIcon = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease-in-out;
`;

const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱', isRtl: true },
  { code: 'en', name: 'English', flag: '🇺🇸', isRtl: false },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const isRtl = currentLanguage.isRtl;
  
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    
    // Update document direction and language
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      document.documentElement.setAttribute('dir', selectedLang.isRtl ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', langCode);
    }
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-language-switcher]')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Set initial direction
  React.useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language, isRtl]);
  
  return (
    <SwitcherContainer className={className} data-language-switcher>
      <LanguageButton
        onClick={() => setIsOpen(!isOpen)}
        isRtl={isRtl}
        aria-label={t('nav.language')}
      >
        <FlagIcon>{currentLanguage.flag}</FlagIcon>
        <span>{currentLanguage.name}</span>
        <ChevronIcon isOpen={isOpen}>▼</ChevronIcon>
      </LanguageButton>
      
      <DropdownMenu isOpen={isOpen} isRtl={isRtl}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            isActive={language.code === i18n.language}
            isRtl={language.isRtl}
          >
            <FlagIcon style={{ marginRight: language.isRtl ? '0' : '8px', marginLeft: language.isRtl ? '8px' : '0' }}>
              {language.flag}
            </FlagIcon>
            {language.name}
          </LanguageOption>
        ))}
      </DropdownMenu>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;