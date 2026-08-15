import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Server, 
  Database, 
  ShieldCheck, 
  CreditCard, 
  Bot, 
  HardDrive, 
  Cpu, 
  Activity, 
  Search,
  Zap
} from 'lucide-react';
import { ServiceItem, DailyUptimePoint, ServiceCategory } from '../types';

interface ServicesListProps {
  services: ServiceItem[];
  onOpenPingTester: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ services, onOpenPingTester }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('panel-primary');
  const [hoveredDay, setHoveredDay] = useState<{
    serviceId: string;
    day: DailyUptimePoint;
    x: number;
    y: number;
  } | null>(null);

  const categories = [
    { id: 'all', label: 'All Services', icon: Server },
    { id: 'panel', label: 'Game Panel & Nodes', icon: Zap },
    { id: 'billing', label: 'Billing & Portals', icon: CreditCard },
    { id: 'database', label: 'Databases & SAN', icon: Database },
    { id: 'network', label: 'DDoS & Storage', icon: ShieldCheck },
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'panel' && (s.category === 'panel' || s.category === 'nodes')) ||
      (selectedCategory === 'billing' && s.category === 'billing') ||
      (selectedCategory === 'database' && s.category === 'database') ||
      (selectedCategory === 'network' && (s.category === 'network' || s.category === 'api'));

    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.url && s.url.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Operational
          </span>
        );
      case 'maintenance':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5">
            <Wrench className="w-3 h-3" />
            Maintenance
          </span>
        );
      case 'degraded':
        return (
          <span className="px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-semibold border border-yellow-500/30 flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            Degraded
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-semibold border border-red-500/30 flex items-center gap-1.5">
            Outage
          </span>
        );
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="space-y-6">
      {/* Category Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nodes or endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Services List Cards */}
      <div className="space-y-3.5">
        {filteredServices.map((service) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`rounded-2xl transition-all ${
                service.isPrimary
                  ? 'glass-card border-amber-500/40 shadow-md shadow-amber-500/5'
                  : 'glass-card hover:border-slate-700/90'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Service Title and URL */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {service.category === 'panel' ? (
                        <Zap className="w-5 h-5 text-amber-400" />
                      ) : service.category === 'nodes' ? (
                        <Server className="w-5 h-5 text-cyan-400" />
                      ) : service.category === 'billing' ? (
                        <CreditCard className="w-5 h-5 text-emerald-400" />
                      ) : service.category === 'database' ? (
                        <Database className="w-5 h-5 text-purple-400" />
                      ) : service.category === 'api' ? (
                        <Bot className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white font-['Space_Grotesk'] tracking-tight">
                          {service.name}
                        </h3>
                        {service.isPrimary && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-wider border border-amber-500/30">
                            OFFICIAL PANEL
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <span>{service.locationFlag}</span>
                          <span>{service.location}</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{service.tagline}</p>
                      {service.url && (
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 hover:underline mt-1"
                        >
                          <span>{service.url.replace('https://', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status, Latency and Uptime */}
                  <div className="flex items-center justify-between md:justify-end gap-5">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 font-medium">90d Uptime</div>
                      <div className="text-sm font-mono font-bold text-emerald-400">
                        {service.uptimePercentage.toFixed(1)}%
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <div className="text-[11px] text-slate-400 font-medium">Latency</div>
                      <div className="text-sm font-mono font-bold text-cyan-400">
                        {service.latencyMs} ms
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(service.status)}

                      <button
                        onClick={() => toggleExpand(service.id)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse telemetry' : 'Expand telemetry'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 90-Day Interactive Timeline Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="font-mono text-slate-300">90 days history</span>
                    <span className="font-mono text-slate-300">
                      <strong className="text-emerald-400">{service.uptimePercentage.toFixed(1)}%</strong> uptime
                    </span>
                  </div>

                  {/* Bar array */}
                  <div className="relative">
                    <div className="flex gap-[2px] h-5 w-full rounded bg-slate-950/90 p-0.5 border border-slate-800/60">
                      {service.history90d.map((day, idx) => {
                        let barColor = 'bg-emerald-500 hover:bg-emerald-400';
                        if (day.status === 'maintenance') {
                          barColor = 'bg-amber-500 hover:bg-amber-400';
                        } else if (day.status === 'degraded') {
                          barColor = 'bg-yellow-400 hover:bg-yellow-300';
                        } else if (day.status === 'outage') {
                          barColor = 'bg-red-500 hover:bg-red-400';
                        }

                        return (
                          <div
                            key={idx}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                serviceId: service.id,
                                day,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`flex-1 rounded-[1px] transition-all cursor-pointer ${barColor}`}
                          />
                        );
                      })}
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>90 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Telemetry Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-slate-950/40 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 sm:p-5 rounded-b-2xl">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          CPU Load
                        </span>
                        <span className="text-white font-mono font-semibold">
                          {service.metrics?.cpuUsage ?? 18.2}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${service.metrics?.cpuUsage ?? 18.2}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-amber-400" />
                          Memory Load
                        </span>
                        <span className="text-white font-mono font-semibold">
                          {service.metrics?.memoryUsage ?? 34.5}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: `${service.metrics?.memoryUsage ?? 34.5}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                          Disk / NVMe
                        </span>
                        <span className="text-white font-mono font-semibold">
                          {service.metrics?.diskUsage ?? 42.0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${service.metrics?.diskUsage ?? 42.0}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-center">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Packet Loss</span>
                        <span className="text-emerald-400 font-mono font-bold">0.00%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                        <span>24h Availability</span>
                        <span className="text-emerald-400 font-mono font-bold">100.0%</span>
                      </div>
                    </div>

                    <div className="col-span-full pt-1 text-slate-400 text-[11px] flex flex-wrap items-center justify-between gap-2">
                      <span>{service.description}</span>
                      {service.url && (
                        <button
                          onClick={onOpenPingTester}
                          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Activity className="w-3 h-3" />
                          <span>Run live network check on this endpoint &rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Hover Tooltip for Day info */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 rounded-xl bg-slate-950/95 border border-slate-700 text-xs shadow-2xl backdrop-blur-md min-w-48 text-slate-200"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
          }}
        >
          <div className="font-bold text-white border-b border-slate-800 pb-1 mb-1 flex items-center justify-between">
            <span>{hoveredDay.day.formattedDate}</span>
            <span
              className={`font-mono text-[11px] font-bold ${
                hoveredDay.day.uptimePercentage >= 99.5
                  ? 'text-emerald-400'
                  : hoveredDay.day.uptimePercentage >= 98
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {hoveredDay.day.uptimePercentage}%
            </span>
          </div>

          <div className="space-y-0.5 text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="font-semibold capitalize text-emerald-400">
                {hoveredDay.day.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Ping:</span>
              <span className="font-mono text-cyan-300">{hoveredDay.day.latencyMs} ms</span>
            </div>
            {hoveredDay.day.incident && (
              <div className="mt-1 pt-1 border-t border-slate-800 text-amber-300 text-[10px] italic">
                {hoveredDay.day.incident}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
