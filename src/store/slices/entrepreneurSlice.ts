import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Helper function to calculate delta (only changed fields)
const calculateDelta = (original: any, current: any, path: string = ''): any => {
  const delta: any = {};
  
  if (!original || !current) return current || {};
  
  // Handle arrays
  if (Array.isArray(current)) {
    if (!Array.isArray(original) || original.length !== current.length) {
      return current; // If structure changed, return entire array
    }
    
    const arrayDelta: any[] = [];
    let hasChanges = false;
    
    current.forEach((item: any, index: number) => {
      if (typeof item === 'object' && item !== null) {
        const itemDelta = calculateDelta(original[index], item, `${path}[${index}]`);
        if (Object.keys(itemDelta).length > 0) {
          arrayDelta[index] = itemDelta;
          hasChanges = true;
        }
      } else if (original[index] !== item) {
        arrayDelta[index] = item;
        hasChanges = true;
      }
    });
    
    return hasChanges ? arrayDelta : {};
  }
  
  // Handle objects
  if (typeof current === 'object' && current !== null) {
    Object.keys(current).forEach(key => {
      const originalValue = original[key];
      const currentValue = current[key];
      
      if (typeof currentValue === 'object' && currentValue !== null) {
        const nestedDelta = calculateDelta(originalValue, currentValue, path ? `${path}.${key}` : key);
        if (Object.keys(nestedDelta).length > 0) {
          delta[key] = nestedDelta;
        }
      } else if (originalValue !== currentValue) {
        delta[key] = currentValue;
      }
    });
  }
  
  return delta;
};

// Type definition for the entrepreneur data structure
type EntrepreneurData = {
  entrepreneur: {
    firstName: string;
    lastName: string;
    role: string;
    companyName: string;
    nc: number;
    phone: string;
    email: string;
    owner: string;
    mortgage: string;
    encumbrance: string;
    externalData: string;
    contractorProjects: number;
    entrepreneurProjects: number;
  };
  funding: {
    fundingType: string;
    previousFunders: string;
    numProjectsAsContractor: number;
    numProjectsAsEntrepreneur: number;
  };
  project: {
    type: string;
    city: string;
    street: string;
    number: number;
    block: number;
    parcel: number;
    officialStatus: string;
    plannedStatus: string;
    ownersAppartements: number;
    sellingAppartements: number;
    soldAppartements: number;
    totalSales: number;
    parkingType: string;
    parkingCount: number;
    appraisalReport: Array<{
      filename: string;
      data: string;
    }>;
  };
  financing: {
    creditPeriodMonths: number;
    creditLine: number;
    requiredEquityRatio: number;
    requiredEquityTotal: number;
    equityInjectionRatio: number;
    equityInjectionTotal: number;
    netSponsorEquityRatio: number;
    netSponsorEquityTotal: number;
    InterestOnEquityInjection: number;
    SeniorDebtInterest: number;
  };
  fee: Array<{
    ArrangementAndSetupFee: number;
    legalExpenses: number;
    creditManagementFees: number;
    saleLawGuaranteeFee: number;
    performanceGuaranteeFee: number;
  }>;
  creditConditions: {
    requiredPreSale: number;
    requiredPreTotal: number;
    notes: string;
  };
  financialData: Array<{
    metric: string;
    appraisal: number;
    ai: number;
    banker: number;
    comments: string;
  }>;
};

interface EntrepreneurState {
  originalData: EntrepreneurData | null;
  currentData: EntrepreneurData | null;
  isDataLoaded: boolean;
}

const initialState: EntrepreneurState = {
  originalData: null,
  currentData: null,
  isDataLoaded: false, // Will be set to true when data is loaded
};

export const entrepreneurSlice = createSlice({
  name: 'entrepreneur',
  initialState,
  reducers: {
    // Load data from JSON file (simulating server response)
    loadEntrepreneurData: (state, action: PayloadAction<EntrepreneurData>) => {
      // Create deep mutable copies to avoid read-only property issues
      const mutableData = JSON.parse(JSON.stringify(action.payload));
      state.originalData = mutableData;
      state.currentData = JSON.parse(JSON.stringify(mutableData));
      state.isDataLoaded = true;
    },
    
    // Update current form data during editing
    updateCurrentData: (state, action: PayloadAction<EntrepreneurData>) => {
      try {
        // Create a deep mutable copy with additional safeguards
        const newData = JSON.parse(JSON.stringify(action.payload));
        // Ensure all nested objects are mutable
        Object.keys(newData).forEach(key => {
          if (typeof newData[key] === 'object' && newData[key] !== null) {
            newData[key] = JSON.parse(JSON.stringify(newData[key]));
          }
        });
        state.currentData = newData;
        console.log('Redux: Successfully updated current data');
      } catch (error) {
        console.error('Redux: Error updating current data:', error);
      }
    },
    
    // Reset current data back to original (restore from store)
    resetToOriginal: (state) => {
      if (state.originalData) {
        state.currentData = JSON.parse(JSON.stringify(state.originalData));
      }
    },
    
    // Save changes - update original data with current changes
    saveChanges: (state) => {
      if (state.currentData && state.originalData) {
        // Calculate delta (only changed fields)
        const delta = calculateDelta(state.originalData, state.currentData);
        
        if (Object.keys(delta).length > 0) {
          console.log('Saving changes - Delta (only changed fields):', JSON.stringify(delta, null, 2));
        } else {
          console.log('No changes detected - nothing to save');
        }
        
        state.originalData = JSON.parse(JSON.stringify(state.currentData));
      }
    },
  },
});

export const { 
  loadEntrepreneurData, 
  updateCurrentData, 
  resetToOriginal, 
  saveChanges 
} = entrepreneurSlice.actions;

export default entrepreneurSlice.reducer;