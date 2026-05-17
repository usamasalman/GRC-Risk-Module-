import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Risk, Control, TreatmentPlan, User, RiskControlMapping, OrgUnit } from '../types';

interface DataContextType {
  risks: Risk[];
  controls: Control[];
  treatmentPlans: TreatmentPlan[];
  users: User[];
  orgUnits: OrgUnit[];
  riskControlMappings: RiskControlMapping[];
  // Actions
  addRisk: (risk: Omit<Risk, 'id' | 'code' | 'createdAt' | 'updatedAt'>) => void;
  updateRisk: (id: string, risk: Partial<Risk>) => void;
}

const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Smith', role: 'CRO', orgUnitId: 'o1' },
  { id: 'u2', name: 'Bob Johnson', role: 'Risk Owner', orgUnitId: 'o2' },
];

const mockOrgUnits: OrgUnit[] = [
  { id: 'o1', name: 'Executive', division: 'Headquarters', department: 'Management' },
  { id: 'o2', name: 'IT Infrastructure', division: 'Technology', department: 'IT' },
];

const mockRisks: Risk[] = [
  {
    id: 'r1',
    code: 'RSK-001',
    title: 'Data Breach in Cloud Storage',
    description: 'Unauthorized access to customer data stored in cloud resulting in compliance violation.',
    categoryId: 'c1',
    rootCauseId: 'rc1',
    processId: 'p1',
    ownerId: 'u2',
    likelihood: 4,
    impact: 5,
    status: 'Open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'r2',
    code: 'RSK-002',
    title: 'Vendor Service Outage',
    description: 'Critical cloud vendor goes offline, disrupting operations.',
    categoryId: 'c2',
    rootCauseId: 'rc2',
    processId: 'p2',
    ownerId: 'u2',
    likelihood: 3,
    impact: 4,
    status: 'Under Review',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'r3',
    code: 'RSK-003',
    title: 'Inadequate Phishing Reporting',
    description: 'Employees lack clear paths to report sophisticated phishing attempts.',
    categoryId: 'c3',
    rootCauseId: 'rc3',
    processId: 'p3',
    ownerId: 'u1',
    likelihood: 5,
    impact: 2,
    status: 'Open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'r4',
    code: 'RSK-004',
    title: 'Supply Chain Disruption',
    description: 'Geopolitical instability affecting key hardware suppliers.',
    categoryId: 'c4',
    rootCauseId: 'rc4',
    processId: 'p4',
    ownerId: 'u1',
    likelihood: 2,
    impact: 5,
    status: 'Open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'r5',
    code: 'RSK-005',
    title: 'Unpatched Server Vulnerability',
    description: 'Legacy servers in branch offices are missing critical security patches.',
    categoryId: 'c1',
    rootCauseId: 'rc1',
    processId: 'p2',
    ownerId: 'u2',
    likelihood: 4,
    impact: 3,
    status: 'Closed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockControls: Control[] = [
  {
    id: 'c1',
    code: 'CTRL-001',
    title: 'Multi-Factor Authentication (MFA)',
    description: 'Enforce MFA for all external access to cloud environments.',
    type: 'Preventive',
    nature: 'Automated',
    designEffectiveness: 0.9,
    operatingEffectiveness: 0.8,
    ownerId: 'u2',
  },
  {
    id: 'c2',
    code: 'CTRL-002',
    title: 'Vendor SLA Monitoring',
    description: 'Daily monitoring of vendor uptime against SLAs.',
    type: 'Detective',
    nature: 'Automated',
    designEffectiveness: 0.7,
    operatingEffectiveness: 0.6,
    ownerId: 'u2',
  }
];

const mockRiskControlMappings: RiskControlMapping[] = [
  { riskId: 'r1', controlId: 'c1', weight: 1.0 },
  { riskId: 'r2', controlId: 'c2', weight: 0.8 },
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: 't1',
    riskId: 'r1',
    strategy: 'Mitigate',
    ownerId: 'u2',
    progress: 40,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't2',
    riskId: 'r4',
    strategy: 'Mitigate',
    ownerId: 'u1',
    progress: 80,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't3',
    riskId: 'r5',
    strategy: 'Accept',
    ownerId: 'u2',
    progress: 100,
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [risks, setRisks] = useState<Risk[]>(mockRisks);
  const [controls, setControls] = useState<Control[]>(mockControls);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans);
  const [users] = useState<User[]>(mockUsers);
  const [orgUnits] = useState<OrgUnit[]>(mockOrgUnits);
  const [riskControlMappings] = useState<RiskControlMapping[]>(mockRiskControlMappings);

  const addRisk = (riskData: Omit<Risk, 'id' | 'code' | 'createdAt' | 'updatedAt'>) => {
    const newRisk: Risk = {
      ...riskData,
      id: `r${risks.length + 1}`,
      code: `RSK-00${risks.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRisks([...risks, newRisk]);
  };

  const updateRisk = (id: string, riskData: Partial<Risk>) => {
    setRisks(risks.map((r) => (r.id === id ? { ...r, ...riskData, updatedAt: new Date().toISOString() } : r)));
  };

  return (
    <DataContext.Provider
      value={{
        risks,
        controls,
        treatmentPlans,
        users,
        orgUnits,
        riskControlMappings,
        addRisk,
        updateRisk,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
