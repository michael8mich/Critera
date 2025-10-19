import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Button, Card } from '../common';

const HomeContainer = styled.div`
  padding: ${theme.spacing['3xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const HeroSection = styled(motion.section)`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTASection = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const FeatureCard = styled(Card)`
  text-align: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]});
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  color: white;
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray[900]};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <HomeContainer>
      <Container>
        <HeroSection
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={itemVariants}>
            {t('home.title')}
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            {t('home.subtitle')}
          </HeroSubtitle>
          <CTASection variants={itemVariants}>
            <Button size="lg">{t('home.getStarted')}</Button>
            <Button variant="outline" size="lg">{t('home.learnMore')}</Button>
          </CTASection>
        </HeroSection>

        <FeaturesGrid>
          <FeatureCard shadow="lg">
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>{t('home.features.performance.title')}</FeatureTitle>
            <FeatureDescription>
              {t('home.features.performance.description')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard shadow="lg">
            <FeatureIcon>🎨</FeatureIcon>
            <FeatureTitle>{t('home.features.design.title')}</FeatureTitle>
            <FeatureDescription>
              {t('home.features.design.description')}
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard shadow="lg">
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>{t('home.features.typeSafe.title')}</FeatureTitle>
            <FeatureDescription>
              {t('home.features.typeSafe.description')}
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Container>
    </HomeContainer>
  );
};

export default HomePage;