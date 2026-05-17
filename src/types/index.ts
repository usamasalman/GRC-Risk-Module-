export type Likelihood = 1 | 2 | 3 | 4 | 5;
export type Impact = 1 | 2 | 3 | 4 | 5;

export interface OrgUnit {
  id: string;
  name: string;
  division: string;
  department: string;
  parentUnitId?: string;
}

export type Role = 'Admin' | 'CRO' | 'Risk Owner';

export interface User {
  id: string;
  name: string;
  role: Role;
  orgUnitId: string;
  avatarUrl?: string;
}

export interface Risk {
  id: string;
  code: string;
  title: string;
  description: string;
  categoryId: string;
  rootCauseId: string;
  processId: string;
  ownerId: string;
  likelihood: Likelihood;
  impact: Impact;
  status: 'Open' | 'Closed' | 'Under Review';
  createdAt: string;
  updatedAt: string;
}

export interface RiskAssessment {
  riskId: string;
  inherentLikelihood: Likelihood;
  inherentImpact: Impact;
}

export interface Control {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'Preventive' | 'Detective' | 'Corrective';
  nature: 'Manual' | 'Automated' | 'IT Dependent';
  designEffectiveness: number; // 0 to 1
  operatingEffectiveness: number; // 0 to 1
  ownerId: string;
}

export interface RiskControlMapping {
  riskId: string;
  controlId: string;
  weight: number; // For weighting the control's importance to the specific risk
}

export interface TreatmentTask {
  id: string;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  deadline: string;
  assigneeId: string;
}

export interface TreatmentPlan {
  id: string;
  riskId: string;
  strategy: 'Avoid' | 'Mitigate' | 'Transfer' | 'Accept';
  ownerId: string;
  progress: number; // 0 - 100
  deadline: string;
}
