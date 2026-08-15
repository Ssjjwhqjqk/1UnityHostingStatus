/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PanelSpotlight } from './components/PanelSpotlight';
import { ServicesList } from './components/ServicesList';
import { LatencyGraph } from './components/LatencyGraph';
import { IncidentHistory } from './components/IncidentHistory';
import { LivePingTester } from './components/LivePingTester';
import { SubscribeModal } from './components/SubscribeModal';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { Footer } from './components/Footer';
import { 
  initialServices, 
  initialIncidents, 
  generateLatencyTrend, 
  regionalPings 
} from './data/mockStatusData';
import { ServiceItem } from './types';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [latencyData, setLatencyData] = useState(generateLatencyTrend);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Modals
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isGitHubGuideOpen, setIsGitHubGuideOpen] = useState(false);
  const [isPingTesterOpen, setIsPingTesterOpen] = useState(false);

  const handleManualRefresh = useCallback(() => {
    setLastUpdated(new Date());
    setLatencyData(generateLatencyTrend());
  }, []);

  const panelService = services.find((s) => s.id === 'panel-primary') || services[0];

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Header */}
      <Header
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenGitHubGuide={() => setIsGitHubGuideOpen(true)}
        onOpenPingTester={() => setIsPingTesterOpen(true)}
        lastUpdated={lastUpdated}
        onManualRefresh={handleManualRefresh}
      />

      {/* Page Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Spotlight for primary panel np.unityhosting.online */}
        <PanelSpotlight
          panelService={panelService}
          onOpenPingTester={() => setIsPingTesterOpen(true)}
        />

        {/* Full Services Breakdown */}
        <ServicesList
          services={services}
          onOpenPingTester={() => setIsPingTesterOpen(true)}
        />

        {/* 24-Hour Latency & Regional Ping Matrix */}
        <LatencyGraph
          latencyData={latencyData}
          regionalPings={regionalPings}
          onOpenPingTester={() => setIsPingTesterOpen(true)}
        />

        {/* Incident History & Maintenance Logs */}
        <IncidentHistory incidents={initialIncidents} />
      </main>

      {/* Modals */}
      <LivePingTester
        isOpen={isPingTesterOpen}
        onClose={() => setIsPingTesterOpen(false)}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <GitHubDeployModal
        isOpen={isGitHubGuideOpen}
        onClose={() => setIsGitHubGuideOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenGitHubGuide={() => setIsGitHubGuideOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenPingTester={() => setIsPingTesterOpen(true)}
      />
    </div>
  );
}
