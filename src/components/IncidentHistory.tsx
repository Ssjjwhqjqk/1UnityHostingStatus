import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Wrench, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { IncidentItem } from '../types';

interface IncidentHistoryProps {
  incidents: IncidentItem[];
}

export const IncidentHistory: React.FC<IncidentHistoryProps> = ({ incidents }) => {
  const [filter, setFilter] = useState<'all' | 'maintenance' | 'resolved'>('all');

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'all') return true;
    if (filter === 'maintenance') return inc.impact === 'maintenance';
    if (filter === 'resolved') return inc.status === 'resolved' || inc.status === 'completed';
    return true;
  });

  return (
    <section className="rounded-2xl glass-card p-6 sm:p-7 border border-slate-800 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk'] tracking-tight">
              Incident &amp; Maintenance Logs
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Historical log of scheduled updates, network route adjustments, and hardware optimizations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Logs ({incidents.length})
          </button>
          <button
            onClick={() => setFilter('maintenance')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'maintenance'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'resolved'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-950/40 border border-slate-800 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">No active incidents</div>
            <p className="text-xs text-slate-400 mt-1">All Unity Hosting servers and panel are running 100% nominal.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4"
            >
              {/* Incident Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        incident.impact === 'maintenance'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {incident.impact}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {incident.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5 font-['Space_Grotesk']">
                    {incident.title}
                  </h3>
                </div>

                <div className="text-xs text-slate-400 font-mono self-start sm:self-auto">
                  {incident.createdAt}
                </div>
              </div>

              {/* Affected Services tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px]">Affected Systems:</span>
                {incident.affectedServices.map((svc, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono"
                  >
                    {svc}
                  </span>
                ))}
              </div>

              {/* Timeline Updates */}
              <div className="space-y-3 pl-2 border-l-2 border-slate-800 ml-1">
                {incident.updates.map((update, uIdx) => (
                  <div key={uIdx} className="relative pl-4 text-xs space-y-0.5">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-emerald-400" />

                    <div className="flex items-center gap-2">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400">
                        {update.status}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">&bull;</span>
                      <span className="text-slate-400 font-mono text-[10px]">{update.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xs">{update.message}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
