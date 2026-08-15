import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Heart, ExternalLink, Clock, Radio, MessageSquare, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenGitHubGuide: () => void;
  onOpenSubscribe: () => void;
  onOpenPingTester: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGitHubGuide,
  onOpenSubscribe,
  onOpenPingTester,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [nepalTime, setNepalTime] = useState<string>('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUtcTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setNepalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060913] text-slate-400 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <Logo size="md" showText={true} />
            <p className="text-xs text-slate-400 max-w-md leading-relaxed mt-2">
              Unity Hosting provides ultra-low latency game server hosting, NVMe VPS, and dedicated infrastructure backed by 
              <strong className="text-amber-300 font-semibold ml-1">99.8% Uptime SLA</strong> and enterprise DDoS mitigation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Live Status: 100% Operational
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                99.8% SLA Guaranteed
              </span>
            </div>
          </div>

          {/* Col 2: Endpoints */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-['Space_Grotesk']">
              Core Endpoints
            </h4>
            <ul className="space-y-1.5 font-mono">
              <li>
                <a
                  href="https://np.unityhosting.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>np.unityhosting.online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://billing.unityhosting.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>billing.unityhosting.online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPingTester}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Interactive Ping Tool</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Actions */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-['Space_Grotesk']">
              Resources
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenGitHubGuide}
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>GitHub Deployment Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Subscribe to Status Alerts</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ISO 27001 &amp; Tier 3 Certified</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Dual Clocks & Copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>UTC: <strong className="text-slate-200">{utcTime || '12:00:00'}</strong></span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span>🇳🇵 NPT (Nepal): <strong className="text-cyan-300">{nepalTime || '17:45:00'}</strong></span>
            </div>
          </div>

          <div className="text-slate-500 text-[11px] text-center sm:text-right">
            &copy; {new Date().getFullYear()} Unity Hosting. All rights reserved. Always 99.8% Uptime SLA.
          </div>
        </div>
      </div>
    </footer>
  );
};
