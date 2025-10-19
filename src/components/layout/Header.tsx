import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { LanguageSwitcher } from '../common';

interface HeaderProps {
  children?: React.ReactNode;
}

const StyledHeader = styled.header`
  background-color: white;
  border-bottom: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Logo = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary[600]};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const NavLink = styled.a`
  color: ${theme.colors.gray[600]};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <StyledHeader>
      <Container>
        <Nav>
          <Logo>Critera</Logo>
          <NavLinks>
            <NavLink href="#home">{t('nav.home')}</NavLink>
            <NavLink href="#about">{t('nav.about')}</NavLink>
            <NavLink href="#services">{t('nav.services')}</NavLink>
            <NavLink href="#contact">{t('nav.contact')}</NavLink>
          </NavLinks>
          <RightSection>
            <LanguageSwitcher />
            {children}
          </RightSection>
        </Nav>
      </Container>
    </StyledHeader>
  );
};

export default Header;