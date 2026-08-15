export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export type ServiceCategory = 'panel' | 'nodes' | 'billing' | 'database' | 'network' | 'api';

export interface DailyUptimePoint {
  date: string;
  formattedDate: string;
  status: ServiceStatus;
  uptimePercentage: number;
  latencyMs: number;
  incident?: string;
}

export interface ServiceNodeMetrics {
  cpuUsage?: number;
  memoryUsage?: number;
  diskUsage?: number;
  activeServers?: number;
  packetLoss?: number;
  networkInMbps?: number;
  networkOutMbps?: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: ServiceCategory;
  url?: string;
  status: ServiceStatus;
  uptimePercentage: number; // e.g. 99.8
  uptime30d: number;
  uptime7d: number;
  uptime24h: number;
  latencyMs: number;
  location: string;
  locationFlag: string;
  description: string;
  isPrimary?: boolean;
  history90d: DailyUptimePoint[];
  metrics?: ServiceNodeMetrics;
}

export interface IncidentUpdate {
  timestamp: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'completed';
  message: string;
}

export interface IncidentItem {
  id: string;
  title: string;
  impact: 'minor' | 'major' | 'critical' | 'maintenance';
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'completed';
  createdAt: string;
  resolvedAt?: string;
  affectedServices: string[];
  updates: IncidentUpdate[];
}

export interface LatencyDataPoint {
  time: string;
  panelLatency: number;
  nodeNepalLatency: number;
  nodeAsiaLatency: number;
  avgLatency: number;
}

export interface RegionalPing {
  region: string;
  city: string;
  flag: string;
  latency: number;
  jitter: number;
  status: 'optimal' | 'good' | 'fair';
}
