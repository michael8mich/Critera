import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { TabbedDataView, TabConfig } from '../common';
import { RootState } from '../../store/slices';
import { loadBankerData } from '../../store/slices/bankerSlice';
import sampleData from '../../tempData/sampleBankData.json';
import schemaData from '../../tempData/BankerDataConfig.json';

interface BankerProps {
  // No props needed - data comes from Redux store
}

const Banker: React.FC<BankerProps> = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('entrepreneur');
  const [showIcons] = useState(false); // Option to hide/show icons
  const isRTL = i18n.language === 'he';
  
  // Get data from Redux store
  const data = useSelector((state: RootState) => state.banker.currentData);
  const isDataLoaded = useSelector((state: RootState) => state.banker.isDataLoaded);
  
  // Load data from JSON file when component mounts
  useEffect(() => {
    if (!isDataLoaded) {
      console.log('Loading initial data from sampleBankData.json');
      // Create a deep copy to ensure data is mutable
      const mutableData = JSON.parse(JSON.stringify(sampleData));
      dispatch(loadBankerData(mutableData as any));
    }
  }, [dispatch, isDataLoaded]);

  const tabs: TabConfig[] = [
    { key: 'entrepreneur', label: t('entrepreneur.tabs.entrepreneur'), icon: '👤' },
    { key: 'project', label: t('entrepreneur.tabs.project'), icon: '🏗️' },
    { key: 'financing', label: t('entrepreneur.tabs.financing'), icon: '🏦' },
    { key: 'fee', label: t('entrepreneur.tabs.fee'), icon: '💳' },
    { key: 'creditConditions', label: t('entrepreneur.tabs.creditConditions'), icon: '📋' },
    { key: 'financialData', label: t('entrepreneur.tabs.financialData'), icon: '📊' },
  ];

  // Show loading state while data is being loaded
  if (!isDataLoaded || !data) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        fontSize: '18px',
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
        {t('loading') || 'טוען נתונים...'}
      </div>
    );
  }

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

export default Banker;