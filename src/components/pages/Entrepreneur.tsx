import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabbedDataView, TabConfig } from '../common';
import sampleData from '../../tempData/sampleBankData.json';
import schemaData from '../../tempData/EntrepreneurDataConfig.json';

interface EntrepreneurProps {
  data?: any;
}

const Entrepreneur: React.FC<EntrepreneurProps> = ({ data = sampleData }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('entrepreneur');
  const [showIcons] = useState(false); // Option to hide/show icons
  const isRTL = i18n.language === 'he';

  const tabs: TabConfig[] = [
    { key: 'entrepreneur', label: t('entrepreneur.tabs.entrepreneur'), icon: '👤' },
    { key: 'funding', label: t('entrepreneur.tabs.funding'), icon: '💰' },
    { key: 'project', label: t('entrepreneur.tabs.project'), icon: '🏗️' },
    { key: 'financing', label: t('entrepreneur.tabs.financing'), icon: '🏦' },
    { key: 'fee', label: t('entrepreneur.tabs.fee'), icon: '💳' },
    { key: 'creditConditions', label: t('entrepreneur.tabs.creditConditions'), icon: '📋' },
    { key: 'financialData', label: t('entrepreneur.tabs.financialData'), icon: '📊' },
  ];

  return (
    <TabbedDataView
      title={t('entrepreneur.title') || 'מערכת ניהול יזמים'}
      data={data}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      t={t}
      isRTL={isRTL}
      showIcons={showIcons}
      schemaData={schemaData}
    />
  );
};

export default Entrepreneur;