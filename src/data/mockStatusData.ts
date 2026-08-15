import { ServiceItem, IncidentItem, LatencyDataPoint, RegionalPing, DailyUptimePoint } from '../types';

// Generate 90 days of uptime history
export function generate90DaysHistory(
  baseUptime: number = 99.8,
  anomalyDayOffset: number = 18
): DailyUptimePoint[] {
  const days: DailyUptimePoint[] = [];
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const formattedDate = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let status: 'operational' | 'degraded' | 'outage' | 'maintenance' = 'operational';
    let uptime = 100;
    let latency = 22 + Math.floor(Math.sin(i * 0.4) * 6) + Math.floor(Math.random() * 4);
    let incident: string | undefined = undefined;

    // Simulate minor maintenance on specific offset day to achieve realistic 99.8% rate
    if (i === anomalyDayOffset) {
      status = 'maintenance';
      uptime = 98.4;
      latency = 48;
      incident = 'Scheduled kernel & storage driver optimization (18m downtime)';
    } else if (i === anomalyDayOffset + 35) {
      status = 'degraded';
      uptime = 99.4;
      latency = 75;
      incident = 'Upstream tier-1 transit reroute - resolved automatically';
    } else if (i % 23 === 0 && baseUptime < 99.9) {
      status = 'operational';
      uptime = 99.9;
      latency = 28;
    }

    days.push({
      date: dateStr,
      formattedDate,
      status,
      uptimePercentage: uptime,
      latencyMs: latency,
      incident,
    });
  }

  return days;
}

export const initialServices: ServiceItem[] = [
  {
    id: 'panel-primary',
    name: 'Game Control Panel',
    tagline: 'np.unityhosting.online',
    category: 'panel',
    url: 'https://np.unityhosting.online',
    status: 'operational',
    uptimePercentage: 99.8,
    uptime30d: 99.85,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 24,
    location: 'Kathmandu, Nepal (NP Gateway)',
    locationFlag: '🇳🇵',
    description: 'Pterodactyl Enterprise Game Server Management Panel & API Daemon for game instances.',
    isPrimary: true,
    history90d: generate90DaysHistory(99.8, 14),
    metrics: {
      cpuUsage: 18.4,
      memoryUsage: 34.2,
      diskUsage: 42.8,
      activeServers: 342,
      packetLoss: 0.0,
      networkInMbps: 248.5,
      networkOutMbps: 680.2,
    },
  },
  {
    id: 'node-nepal-01',
    name: 'Nepal Core Node 01 (NP-RYZEN)',
    tagline: 'High-Frequency AMD Ryzen 9 7950X',
    category: 'nodes',
    url: 'https://np.unityhosting.online',
    status: 'operational',
    uptimePercentage: 99.9,
    uptime30d: 99.95,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 14,
    location: 'Kathmandu, Nepal',
    locationFlag: '🇳🇵',
    description: 'Ultra-low latency NVMe game node for Minecraft, Rust, CS2, and FiveM Nepal & South Asia players.',
    history90d: generate90DaysHistory(99.9, 42),
    metrics: {
      cpuUsage: 38.6,
      memoryUsage: 64.1,
      diskUsage: 51.0,
      activeServers: 88,
      packetLoss: 0.0,
      networkInMbps: 420.0,
      networkOutMbps: 890.4,
    },
  },
  {
    id: 'node-asia-sg-01',
    name: 'Asia SG Node 01 (SG-TURBO)',
    tagline: 'Equinix SG1 Singapore Gateway',
    category: 'nodes',
    url: 'https://np.unityhosting.online',
    status: 'operational',
    uptimePercentage: 99.85,
    uptime30d: 99.9,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 38,
    location: 'Singapore (SG1)',
    locationFlag: '🇸🇬',
    description: 'Premium international routing node connected to SGIX and direct Telia/NTT peering.',
    history90d: generate90DaysHistory(99.85, 28),
    metrics: {
      cpuUsage: 45.2,
      memoryUsage: 58.7,
      diskUsage: 49.3,
      activeServers: 124,
      packetLoss: 0.0,
      networkInMbps: 580.3,
      networkOutMbps: 1120.0,
    },
  },
  {
    id: 'billing-client-area',
    name: 'Billing & Client Portal',
    tagline: 'Client Portal & Automatic Server Provisioning',
    category: 'billing',
    url: 'https://billing.unityhosting.online',
    status: 'operational',
    uptimePercentage: 100.0,
    uptime30d: 100.0,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 32,
    location: 'Global Anycast Edge',
    locationFlag: '🌐',
    description: 'Secure instant billing, server automated upgrades, PayPal/eSewa/Khalti/Stripe checkouts.',
    history90d: generate90DaysHistory(100.0, 999), // no outages
    metrics: {
      cpuUsage: 12.1,
      memoryUsage: 26.5,
      diskUsage: 22.4,
      packetLoss: 0.0,
    },
  },
  {
    id: 'database-clusters',
    name: 'Managed Remote MySQL & Redis Clusters',
    tagline: 'High-Performance MariaDB 10.11 & Redis v7',
    category: 'database',
    status: 'operational',
    uptimePercentage: 99.95,
    uptime30d: 99.98,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 8,
    location: 'Private NVMe SAN Cluster',
    locationFlag: '🔒',
    description: 'Synchronous replication database nodes for game server plugins, LuckPerms, and CoreProtect.',
    history90d: generate90DaysHistory(99.95, 60),
    metrics: {
      cpuUsage: 21.0,
      memoryUsage: 48.9,
      diskUsage: 61.2,
      packetLoss: 0.0,
    },
  },
  {
    id: 'ddos-edge-protection',
    name: 'DDoS Shield & Edge DNS Anycast',
    tagline: 'Enterprise Layer 3/4/7 Scrubbing & 3.2 Tbps Filter',
    category: 'network',
    status: 'operational',
    uptimePercentage: 100.0,
    uptime30d: 100.0,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 4,
    location: 'Cloudflare Magic Transit & Voxility',
    locationFlag: '🛡️',
    description: 'Always-on BGP DDoS mitigation, filtering SYN floods, UDP amplification, and Minecraft bot attacks.',
    history90d: generate90DaysHistory(100.0, 999),
    metrics: {
      packetLoss: 0.0,
    },
  },
  {
    id: 'discord-bot-api',
    name: 'Unity Discord Bot & Webhooks Delivery',
    tagline: 'Ticket Support, Server Status & Role Sync Bot',
    category: 'api',
    status: 'operational',
    uptimePercentage: 99.9,
    uptime30d: 99.92,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 44,
    location: 'Discord Gateway API',
    locationFlag: '🤖',
    description: 'Automated Discord ticket creation, server start/stop alerts, and role assignment engine.',
    history90d: generate90DaysHistory(99.9, 32),
  },
  {
    id: 'backup-nvme-storage',
    name: 'Automated Daily Backups & S3 Glacier',
    tagline: 'Encrypted off-site snapshot storage',
    category: 'network',
    status: 'operational',
    uptimePercentage: 99.8,
    uptime30d: 99.82,
    uptime7d: 100,
    uptime24h: 100,
    latencyMs: 52,
    location: 'Frankfurt & Singapore Cold Storage',
    locationFlag: '📦',
    description: 'Off-site automated snapshots with instant 1-click restore functionality directly in panel.',
    history90d: generate90DaysHistory(99.8, 22),
  },
];

export const initialIncidents: IncidentItem[] = [
  {
    id: 'inc-2026-08-02',
    title: 'Completed: Pterodactyl Wings Daemon v1.11 Upgrade & Kernel Security Patch',
    impact: 'maintenance',
    status: 'completed',
    createdAt: 'August 2, 2026 at 03:00 UTC',
    resolvedAt: 'August 2, 2026 at 03:22 UTC',
    affectedServices: ['np.unityhosting.online', 'Nepal Core Node 01'],
    updates: [
      {
        timestamp: '03:22 UTC',
        status: 'completed',
        message: 'All node daemon components upgraded to latest stable release. All game servers restarted and operating with 100% nominal performance.',
      },
      {
        timestamp: '03:15 UTC',
        status: 'monitoring',
        message: 'Rebooting physical nodes into latest optimized low-latency kernel. Game panel is back online.',
      },
      {
        timestamp: '03:00 UTC',
        status: 'investigating',
        message: 'Scheduled maintenance started. Game servers are safely paused while Wings daemon is hot-reloaded.',
      },
    ],
  },
  {
    id: 'inc-2026-07-19',
    title: 'Resolved: Upstream Fiber Route Optimization (Kathmandu NPIX Gateway)',
    impact: 'minor',
    status: 'resolved',
    createdAt: 'July 19, 2026 at 14:10 UTC',
    resolvedAt: 'July 19, 2026 at 14:38 UTC',
    affectedServices: ['np.unityhosting.online', 'Nepal Core Node 01'],
    updates: [
      {
        timestamp: '14:38 UTC',
        status: 'resolved',
        message: 'Upstream transit provider completed fiber path switch. Latency returned to baseline ~14ms with 0% packet loss.',
      },
      {
        timestamp: '14:18 UTC',
        status: 'identified',
        message: 'Identified temporary packet fluctuation on primary Kathmandu transit route. BGP automated failover activated.',
      },
    ],
  },
];

export const generateLatencyTrend = (): LatencyDataPoint[] => {
  const points: LatencyDataPoint[] = [];
  const hours = 24;
  for (let i = hours; i >= 0; i--) {
    const timeStr = `${(24 - i) % 24}:00`;
    const base = 23 + Math.sin(i * 0.5) * 5;
    const panel = Number((base + (Math.random() * 4 - 2)).toFixed(1));
    const nepal = Number((14 + (Math.random() * 3 - 1.5)).toFixed(1));
    const asia = Number((38 + (Math.random() * 6 - 3)).toFixed(1));
    const avg = Number(((panel + nepal + asia) / 3).toFixed(1));

    points.push({
      time: timeStr,
      panelLatency: panel,
      nodeNepalLatency: nepal,
      nodeAsiaLatency: asia,
      avgLatency: avg,
    });
  }
  return points;
};

export const regionalPings: RegionalPing[] = [
  {
    region: 'South Asia',
    city: 'Kathmandu, Nepal',
    flag: '🇳🇵',
    latency: 14,
    jitter: 1.2,
    status: 'optimal',
  },
  {
    region: 'South Asia',
    city: 'New Delhi, India',
    flag: '🇮🇳',
    latency: 28,
    jitter: 2.1,
    status: 'optimal',
  },
  {
    region: 'Southeast Asia',
    city: 'Singapore',
    flag: '🇸🇬',
    latency: 38,
    jitter: 1.8,
    status: 'optimal',
  },
  {
    region: 'Middle East',
    city: 'Dubai, UAE',
    flag: '🇦🇪',
    latency: 64,
    jitter: 3.4,
    status: 'good',
  },
  {
    region: 'Europe',
    city: 'Frankfurt, Germany',
    flag: '🇩🇪',
    latency: 118,
    jitter: 4.0,
    status: 'good',
  },
  {
    region: 'North America',
    city: 'Ashburn (US-East)',
    flag: '🇺🇸',
    latency: 182,
    jitter: 5.2,
    status: 'fair',
  },
];
