// Real Estate Module Types

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  status: 'ACTIVE' | 'PLANNING' | 'COMPLETED';
  totalProperties: number;
  availableProperties: number;
  priceFrom: number;
  imageUrl?: string;
}

export interface Property {
  id: string;
  plotNumber: string;
  block: string;
  area: number;
  price: number;
  status: 'AVAILABLE' | 'RESERVED' | 'DEPOSIT_PAID' | 'SOLD';
  projectId: string;
  projectName?: string;
  reservedBy?: string;
  reservedByName?: string;
  reservedUntil?: string;
  images?: string[];
}

export interface DashboardStats {
  totalProperties: number;
  available: number;
  availablePercentage: number;
  reserved: number;
  reservedPercentage: number;
  sold: number;
  soldPercentage: number;
}

export interface RecentProperty extends Property {
  actions?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'doc' | 'xlsx' | 'png' | 'zip' | 'mp4';
}
