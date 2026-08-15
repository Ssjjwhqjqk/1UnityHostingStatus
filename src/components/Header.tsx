import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Bell, 
  ExternalLink, 
  Github, 
  Zap, 
  ShieldCheck, 
  Activity,
  Radio
} from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenSubscribe: () => void;
  onOpenGitHubGuide: () => void;
  onOpenPingTester: () => void;
  lastUpdated: Date;
  onManualRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSubscribe,
  onOpenGitHubGuide,
  onOpenPingTester,
  lastUpdated,
  onManualRefresh,
}) => {
  const [countdown, setCountdown] = useState<number>(30);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onManualRefresh();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onManualRefresh]);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onManualRefresh();
    setCountdown(30);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="w-full border-b border-slate-800/80 bg-[#080d1a]/90 backdrop-blur-xl sticky top-0 z-40">
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border-b border-white/5 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Core Game Nodes &amp; Panels Active
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              SLA Guarantee: <strong className="text-amber-400 font-semibold">99.8% Uptime</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Auto-refresh in <strong className="text-slate-200 font-mono">{countdown}s</strong>
            </span>
            <button
              onClick={handleRefreshClick}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh status immediately"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Logo size="lg" showText={true} />

          {/* Mobile action toggles */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSubscribe}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              title="Subscribe"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenGitHubGuide}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              title="GitHub Guide"
            >
              <Github className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3 w-full md:w-auto justify-end">
          <a
            href="https://np.unityhosting.online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:border-amber-400/60 transition-all text-xs font-semibold shadow-sm hover:shadow-amber-500/10 group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
            <span>np.unityhosting.online</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          <button
            onClick={onOpenPingTester}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-cyan-300 hover:text-cyan-200 transition-all text-xs font-semibold cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Test Live Ping</span>
          </button>

          <button
            onClick={onOpenSubscribe}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 fill-slate-950" />
            <span>Subscribe to Updates</span>
          </button>

          <button
            onClick={onOpenGitHubGuide}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
            title="Deploy this status page to GitHub Pages"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Guide</span>
          </button>
        </div>
      </div>

      {/* Global Status Banner Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/80 border border-emerald-500/30 shadow-lg shadow-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] tracking-tight">
                  All Systems Operational
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase border border-emerald-500/30">
                  99.8% UPTIME SLA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Game panel <code className="text-amber-300 font-mono font-medium px-1.5 py-0.5 bg-slate-800/80 rounded border border-slate-700">np.unityhosting.online</code> and all game server nodes are running with optimal latency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
            <div className="text-right">
              <div className="text-slate-400 text-[11px]">90-Day Reliability</div>
              <div className="text-emerald-400 font-mono font-bold text-base flex items-center gap-1 justify-end">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                99.8%
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <div className="text-slate-400 text-[11px]">Avg Response</div>
              <div className="text-cyan-400 font-mono font-bold text-base">
                24 ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
