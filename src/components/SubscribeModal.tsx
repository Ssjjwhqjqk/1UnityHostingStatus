import React, { useState } from 'react';
import { X, Bell, Mail, Bot, Check, ShieldCheck, Send } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'discord' | 'email' | 'browser'>('discord');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const handleTestWebhook = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl glass-card border border-amber-500/40 p-6 sm:p-7 shadow-2xl shadow-amber-950/40 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Subscribe to Status Updates
              </h3>
              <p className="text-xs text-slate-400">Get notified during scheduled maintenance or incidents.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('discord')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'discord'
                ? 'bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Discord</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>

          <button
            onClick={() => setActiveTab('browser')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'browser'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Browser</span>
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'discord' && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Discord Channel Webhook URL
              </label>
              <input
                type="url"
                required
                placeholder="https://discord.com/api/webhooks/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Paste your server&apos;s channel webhook URL to receive instant embeds for server alerts.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={!webhookUrl}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                {testSent ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                <span>{testSent ? 'Test Ping Sent!' : 'Send Test Embed'}</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {submitted ? <Check className="w-4 h-4" /> : null}
                <span>{submitted ? 'Subscribed!' : 'Save Webhook'}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'email' && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Zero spam. You will only receive critical incident notifications and resolved reports.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer"
            >
              {submitted ? 'Confirmation Sent!' : 'Subscribe via Email'}
            </button>
          </form>
        )}

        {activeTab === 'browser' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <Bell className="w-8 h-8 text-cyan-400 mx-auto" />
              <div className="font-bold text-white">Browser Push Notifications</div>
              <p className="text-slate-400 text-[11px]">
                Receive instant desktop and mobile notifications directly in your browser when node status changes.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(true);
                setTimeout(() => {
                  setSubmitted(false);
                  onClose();
                }, 1500);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              {submitted ? 'Notifications Enabled!' : 'Enable Browser Push Alerts'}
            </button>
          </div>
        )}

        <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-2 border-t border-slate-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted webhook delivery with SLA verification.</span>
        </div>
      </div>
    </div>
  );
};
