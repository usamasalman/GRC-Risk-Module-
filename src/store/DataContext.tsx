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

const mockRisksData = [
  { id: 'r1', code: 'EB-01', title: 'Find the Breach', description: 'Clean-desk, locked screen & printer security in a virtual ADNOC office.' },
  { id: 'r2', code: 'EB-02', title: 'Stop the Phishing', description: 'High-pressure inbox triage — identify phishing tells, lookalike domains & malicious attachments.' },
  { id: 'r3', code: 'EB-03', title: 'The Rogue USB', description: 'Physical security decision-making & visualization of malware propagation.' },
  { id: 'r4', code: 'EB-04', title: 'Unsafe Wi-Fi Trap', description: 'Man-in-the-Middle risk identification on public networks (airport scenario).' },
  { id: 'r5', code: 'EB-05', title: 'Tailgating Challenge', description: 'Mixed Reality overlay: challenge unbadged personnel entering secured zones.' },
  { id: 'r6', code: 'EB-06', title: 'Vishing Voice Clone', description: 'Resist AI-generated executive voice clones requesting urgent file transfers.' },
  { id: 'r7', code: 'EB-07', title: 'Credential Harvest', description: 'Detect spoofed ADNOC SSO pages before credential entry.' },
  { id: 'r8', code: 'EB-08', title: 'QR Code Quishing', description: 'Verify destination URLs before scanning QR codes overlaid in real environments.' },
  { id: 'r9', code: 'EB-09', title: 'Social Media OSINT', description: 'Visualize attacker data harvesting from LinkedIn/Instagram for spear-phishing.' },
  { id: 'r10', code: 'EB-10', title: 'MFA Push Fatigue', description: 'Resist multi-factor authentication flood attacks and unauthorized approval prompts.' },
  { id: 'r11', code: 'IT-26', title: 'Artica Offensive', description: 'Lateral movement through Windows AD to compromise the Domain Controller — understand attacker TTPs.' },
  { id: 'r12', code: 'IT-27', title: 'Boot2Root Drill', description: 'Simultaneous multi-host attack for privilege escalation and vulnerability exploitation.' },
  { id: 'r13', code: 'IT-28', title: 'Operation Typhon', description: 'SOC analyst detection and containment of a persistent threat actor within the enterprise network.' },
  { id: 'r14', code: 'IT-29', title: 'Heist II Aftermath', description: 'Cross-network forensic investigation tracking data exfiltration and persistence mechanisms.' },
  { id: 'r15', code: 'IT-30', title: 'SQLi to Shell', description: 'Real-time SQL injection mitigation on public portals with code patching and WAF configuration.' },
  { id: 'r16', code: 'IT-31', title: 'Zero-Day Investigation', description: 'Investigate zero-day exploits on enterprise assets (SharePoint); determine impact and remediation.' },
  { id: 'r17', code: 'IT-32', title: 'Cloud Misconfiguration', description: 'Detect and remediate exposed S3 buckets and insecure API gateways in hybrid cloud environments.' },
  { id: 'r18', code: 'IT-33', title: 'Insider Exfiltration', description: 'Monitor and detect anomalous data transfers from privileged IT users.' },
  { id: 'r19', code: 'IT-34', title: 'Network Topology Mapping', description: 'Identify weak network segmentation points and practice VLAN isolation.' },
  { id: 'r20', code: 'IT-35', title: 'Malware Sandbox', description: 'Safely detonate suspicious attachments to analyze Command & Control (C2) callbacks.' },
  { id: 'r21', code: 'OT-51', title: 'Shut Down the Grid', description: 'Reverse logic-based attacks on a power distribution grid using virtual PLC interaction.' },
  { id: 'r22', code: 'OT-52', title: 'Modding Modbus', description: 'Detect unauthorized register changes in the Modbus industrial protocol.' },
  { id: 'r23', code: 'OT-53', title: 'Triton Analysis', description: 'High-fidelity simulation of Triton/Trisis malware targeting Safety Instrumented Systems (SIS).' },
  { id: 'r24', code: 'OT-54', title: 'Pressure Vessel Failure', description: 'Manage critical valve-sequence failures caused by cyber-attack on a refinery pressure vessel.' },
  { id: 'r25', code: 'OT-55', title: 'Offshore Rig Drill', description: 'Emergency response to a cyber-triggered blowout preventer (BOP) system outage.' },
  { id: 'r26', code: 'OT-56', title: 'PLC Code Cracker', description: 'Restore production line integrity by solving malicious ladder-logic injection puzzles.' },
  { id: 'r27', code: 'OT-57', title: 'HMI Spoofing', description: 'Identify discrepancies between physical sensor data and a hijacked HMI display.' },
  { id: 'r28', code: 'OT-58', title: 'Protocol Injection', description: 'Recognize and block malicious traffic on PROFINET and S7Comm industrial protocols.' },
  { id: 'r29', code: 'OT-59', title: 'Remote Site Hijack', description: 'Secure 5G and satellite WAN connections at remote offshore/pipeline pumping stations.' },
  { id: 'r30', code: 'OT-60', title: 'LOTO Cyber Breach', description: 'Execute Lockout-Tagout (LOTO) procedures when automated control systems are compromised.' },
  { id: 'r31', code: 'EX-76', title: 'Ransomware Crisis', description: 'Coordinate Legal, PR & IT response to a company-wide encryption event with a 30-minute timer.' },
  { id: 'r32', code: 'EX-77', title: 'Vendor Compromise', description: 'Navigate strategic fallout when a critical supply chain partner is breached.' },
  { id: 'r33', code: 'EX-78', title: 'Deepfake CEO Fraud', description: 'Verify high-value wire transfer requests delivered via convincing deepfake video.' },
  { id: 'r34', code: 'EX-79', title: 'OSINT Risk View', description: 'Personalized executive digital footprint review showing exploitability of public data.' },
  { id: 'r35', code: 'EX-80', title: 'Regulator Liaison', description: 'Practice UAE regulatory reporting (NESA/DESC) requirements during a significant data breach.' },
  { id: 'r36', code: 'HS-91', title: 'Fire & Cyber', description: 'Respond to facility fire caused by a hacked industrial cooling system; execute safe evacuation.' },
  { id: 'r37', code: 'HS-92', title: 'Confined Space Entry', description: 'Atmospheric testing and safety permit procedures before entering a virtual refinery storage tank.' },
  { id: 'r38', code: 'HS-93', title: 'Active Assailant', description: 'Physical facility breach response concurrent with a cyber-attack on communication systems.' },
  { id: 'r39', code: 'HS-94', title: 'Disaster Muster', description: 'Coordinate physical muster drill while digital systems are being restored from backups.' },
  { id: 'r40', code: 'HS-95', title: 'Hazard Spotting', description: 'Identify trip, fall, and chemical hazards in virtual warehouse or rig floor environments.' },
];

const mockRisks: Risk[] = mockRisksData.map((item, index) => ({
  ...item,
  categoryId: `c${(index % 4) + 1}`,
  rootCauseId: `rc${(index % 4) + 1}`,
  processId: `p${(index % 2) + 1}`,
  ownerId: index % 2 === 0 ? 'u1' : 'u2',
  likelihood: (index % 5) + 1,
  impact: (index % 4) + 2,
  status: index % 3 === 0 ? 'Closed' : index % 2 === 0 ? 'Under Review' : 'Open',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

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
