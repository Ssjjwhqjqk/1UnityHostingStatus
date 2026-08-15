import React, { useState } from 'react';
import { Activity, Globe, Wifi, TrendingDown, ArrowUpRight } from 'lucide-react';
import { LatencyDataPoint, RegionalPing } from '../types';

interface LatencyGraphProps {
  latencyData: LatencyDataPoint[];
  regionalPings: RegionalPing[];
  onOpenPingTester: () => void;
}

export const LatencyGraph: React.FC<LatencyGraphProps> = ({
  latencyData,
  regionalPings,
  onOpenPingTester,
}) => {
  const [activeMetric, setActiveMetric] = useState<'panel' | 'nepal' | 'asia' | 'all'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<LatencyDataPoint | null>(null);

  const maxLatency = 80;
  const chartHeight = 180;
  const chartWidth = 700;

  // Generate SVG path for a given metric
  const createPath = (key: 'panelLatency' | 'nodeNepalLatency' | 'nodeAsiaLatency' | 'avgLatency') => {
    if (!latencyData.length) return '';
    const points = latencyData.map((d, index) => {
      const x = (index / (latencyData.length - 1)) * chartWidth;
      const val = d[key];
      const y = chartHeight - (val / maxLatency) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const createAreaPath = (key: 'panelLatency' | 'nodeNepalLatency' | 'nodeAsiaLatency' | 'avgLatency') => {
    if (!latencyData.length) return '';
    const points = latencyData.map((d, index) => {
      const x = (index / (latencyData.length - 1)) * chartWidth;
      const val = d[key];
      const y = chartHeight - (val / maxLatency) * chartHeight;
      return `${x},${y}`;
    });
    return `M 0,${chartHeight} L ${points.join(' L ')} L ${chartWidth},${chartHeight} Z`;
  };

  return (
    <section className="rounded-2xl glass-card p-6 sm:p-7 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] tracking-tight">
              Network Latency &amp; Response Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            24-hour response time monitoring for <strong className="text-amber-300">np.unityhosting.online</strong> and game nodes.
          </p>
        </div>

        {/* Metric Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveMetric('all')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMetric === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Lines
          </button>
          <button
            onClick={() => setActiveMetric('panel')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMetric === 'panel'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Panel (24ms)
          </button>
          <button
            onClick={() => setActiveMetric('nepal')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMetric === 'nepal'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nepal Node (14ms)
          </button>
          <button
            onClick={() => setActiveMetric('asia')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMetric === 'asia'
                ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Asia SG (38ms)
          </button>
        </div>
      </div>

      {/* Main Responsive SVG Chart */}
      <div className="relative bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 overflow-hidden">
        {/* Y Axis Guide labels */}
        <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between text-[10px] text-slate-500 font-mono pointer-events-none">
          <span>80ms</span>
          <span>40ms</span>
          <span>0ms</span>
        </div>

        {/* SVG Canvas */}
        <div className="ml-8 w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-44 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="nepalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#1e293b" strokeDasharray="3 3" />

            {/* Area Fills */}
            {(activeMetric === 'all' || activeMetric === 'panel') && (
              <path d={createAreaPath('panelLatency')} fill="url(#panelGradient)" />
            )}
            {(activeMetric === 'all' || activeMetric === 'nepal') && (
              <path d={createAreaPath('nodeNepalLatency')} fill="url(#nepalGradient)" />
            )}

            {/* Stroke Lines */}
            {(activeMetric === 'all' || activeMetric === 'panel') && (
              <path
                d={createPath('panelLatency')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
            {(activeMetric === 'all' || activeMetric === 'nepal') && (
              <path
                d={createPath('nodeNepalLatency')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
            {(activeMetric === 'all' || activeMetric === 'asia') && (
              <path
                d={createPath('nodeAsiaLatency')}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {/* Interactive Points on hover */}
            {latencyData.map((d, idx) => {
              const x = (idx / (latencyData.length - 1)) * chartWidth;
              return (
                <rect
                  key={idx}
                  x={x - 10}
                  y={0}
                  width="20"
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(d)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}
          </svg>

          {/* X Axis Time Labels */}
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
            <span>24h ago</span>
            <span>18h ago</span>
            <span>12h ago</span>
            <span>6h ago</span>
            <span className="text-cyan-400 font-bold">Now</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Panel np.unityhosting.online (~24ms)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Nepal Core Node (~14ms)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Asia SG Gateway (~38ms)
            </span>
          </div>

          <button
            onClick={onOpenPingTester}
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-xs cursor-pointer"
          >
            <span>Run browser live latency check</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Regional Ping Matrix Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Global Routing &amp; Edge Latency Matrix
          </h3>
          <span className="text-xs text-slate-400 font-mono">Tested from Anycast BGP Edges</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {regionalPings.map((r, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base">{r.flag}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      r.status === 'optimal'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : r.status === 'good'
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="font-semibold text-xs text-white mt-1.5 truncate">{r.city}</div>
                <div className="text-[10px] text-slate-400">{r.region}</div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Ping</span>
                <span className="font-mono font-bold text-xs text-emerald-400">{r.latency} ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
