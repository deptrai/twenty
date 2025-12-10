// Epic 4: Sales Tools & Agent Performance Types

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
export type CommissionStatus = 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';
export type SLAStatus = 'ON_TRACK' | 'WARNING' | 'OVERDUE';

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  assignedTo: string;
  assignedToName?: string;
  createdAt: string;
  lastContactedAt?: string;
  slaDeadline: string;
  slaStatus: SLAStatus;
  notes?: string;
}

export interface Commission {
  id: string;
  dealId: string;
  dealName?: string;
  propertyId: string;
  propertyName?: string;
  agentId: string;
  agentName?: string;
  amount: number;
  rate: number;
  status: CommissionStatus;
  requestedAt: string;
  approvedAt?: string;
  paidAt?: string;
  rejectedAt?: string;
  notes?: string;
}

export interface AgentStats {
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalRevenue: number;
  totalCommission: number;
  pendingCommission: number;
  approvedCommission: number;
  paidCommission: number;
  activeLeads: number;
  overdueLeads: number;
  avgDealValue: number;
  winRate: number;
}

export interface PropertySearchCriteria {
  priceMin?: number;
  priceMax?: number;
  locations?: string[];
  propertyTypes?: string[];
  status?: string[];
  areaMin?: number;
  areaMax?: number;
}
