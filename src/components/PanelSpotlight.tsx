import React, { useState } from 'react';
import { 
  Server, 
  ExternalLink, 
  Copy, 
  Check, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap,
  Clock
} from 'lucide-react';
import { ServiceItem } from '../types';

interface PanelSpotlightProps {
  panelService: ServiceItem;
  onOpenPingTester: () => void;
}

export const PanelSpotlight: React.FC<PanelSpotlightProps> = ({
  panelService,
  onOpenPingTester,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://np.unityhosting.online');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-card-glow p-6 sm:p-7 border border-amber-500/30">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              PRIMARY GAME PANEL
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% OPERATIONAL
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
              🇳🇵 Kathmandu Gateway (NP)
            </span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                np.unityhosting.online
              </h2>
              <button
                onClick={handleCopyUrl}
                className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Panel Address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              Official high-speed Pterodactyl Game Management Panel hosting Minecraft, CS2, Rust, FiveM, and Discord bots with guaranteed 
              <strong className="text-amber-300 font-bold ml-1">99.8% Uptime SLA</strong>.
            </p>
          </div>

          {/* Quick Hardware Specs tags */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              AMD Ryzen 9 7950X (5.7GHz)
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              Enterprise NVMe Gen 4 (7000MB/s)
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              10Gbps DDoS Protected
            </span>
          </div>
        </div>

        {/* Right Action & Metric Cards */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-72 shrink-0">
          <div className="grid grid-cols-2 gap-2 bg-slate-900/90 rounded-xl p-3 border border-slate-800">
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">90-Day SLA</div>
              <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">99.8%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Panel Ping</div>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-0.5">~24ms</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">30-Day Rate</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">99.85%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Packet Loss</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">0.0%</div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="https://np.unityhosting.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 group cursor-pointer"
            >
              <span>Launch Game Panel</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenPingTester}
              className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              title="Test real-time ping to np.unityhosting.online"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ping</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini 90 Day Uptime Strip for Panel */}
      <div className="mt-6 pt-5 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            90 Days Uptime History (<strong className="text-amber-400">99.8% Overall</strong>)
          </span>
          <span className="text-emerald-400 font-medium">100% Operational Today</span>
        </div>

        <div className="flex gap-[3px] h-7 w-full rounded-lg bg-slate-950/80 p-1 border border-slate-800/80">
          {panelService.history90d.map((day, idx) => {
            let color = 'bg-emerald-500 hover:bg-emerald-400';
            if (day.status === 'maintenance') {
              color = 'bg-amber-500 hover:bg-amber-400';
            } else if (day.status === 'degraded') {
              color = 'bg-yellow-400 hover:bg-yellow-300';
            } else if (day.status === 'outage') {
              color = 'bg-red-500 hover:bg-red-400';
            }

            return (
              <div
                key={idx}
                className={`flex-1 rounded-[2px] transition-all cursor-pointer ${color} group relative`}
                title={`${day.formattedDate}: ${day.uptimePercentage}% Uptime (${day.status.toUpperCase()})`}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
          <span>90 days ago</span>
          <span>45 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </section>
  );
};
