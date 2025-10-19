import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface FooterProps {
  children?: React.ReactNode;
}

const StyledFooter = styled.footer`
  background-color: ${theme.colors.gray[900]};
  color: ${theme.colors.gray[300]};
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg};
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.xl};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FooterTitle = styled.h3`
  color: white;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
`;

const FooterLink = styled.a`
  color: ${theme.colors.gray[400]};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${theme.colors.primary[400]};
  }
`;

const Copyright = styled.div`
  border-top: 1px solid ${theme.colors.gray[700]};
  padding-top: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.gray[500]};
`;

const Footer: React.FC<FooterProps> = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Critera</FooterTitle>
            <p>{t('footer.description')}</p>
          </FooterSection>
          <FooterSection>
            <FooterTitle>{t('footer.quickLinks')}</FooterTitle>
            <FooterLink href="#home">{t('nav.home')}</FooterLink>
            <FooterLink href="#about">{t('nav.about')}</FooterLink>
            <FooterLink href="#services">{t('nav.services')}</FooterLink>
            <FooterLink href="#contact">{t('nav.contact')}</FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterTitle>{t('footer.support')}</FooterTitle>
            <FooterLink href="#help">{t('footer.helpCenter')}</FooterLink>
            <FooterLink href="#docs">{t('footer.documentation')}</FooterLink>
            <FooterLink href="#privacy">{t('footer.privacy')}</FooterLink>
            <FooterLink href="#terms">{t('footer.terms')}</FooterLink>
          </FooterSection>
        </FooterContent>
        {children}
        <Copyright>
          © {new Date().getFullYear()} Critera. {t('footer.rightsReserved')}
        </Copyright>
      </Container>
    </StyledFooter>
  );
};

export default Footer;