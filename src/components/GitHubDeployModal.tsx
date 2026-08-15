import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const gitCommands = `# 1. Initialize git repository
git init
git add .
git commit -m "feat: Unity Hosting 99.8% Uptime Status Page"

# 2. Add your GitHub repository URL
git remote add origin https://github.com/YOUR_USERNAME/unity-hosting-status.git
git branch -M main
git push -u origin main`;

  const githubActionWorkflow = `name: Deploy Status Page to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Static App
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-slate-700 p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Deploy to GitHub &amp; GitHub Pages
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  100% FREE HOSTING
                </span>
              </div>
              <p className="text-xs text-slate-400">
                This status page is a production-ready static SPA designed for GitHub Pages or custom domains.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent border border-amber-500/30 text-xs text-slate-300 space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Zero-Maintenance Architecture
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Your status page contains built-in 90-day SLA calculations (<strong>99.8% Uptime</strong>) for <code className="text-amber-300 font-mono">np.unityhosting.online</code>, live browser latency tests, and incident records without requiring any paid server backend.
          </p>
        </div>

        {/* Step 1: Git Push */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Step 1: Push code to your GitHub repository
            </span>
            <button
              onClick={() => copyToClipboard(gitCommands, 'git')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedSection === 'git' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Commands!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Git Commands</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed">
            {gitCommands}
          </pre>
        </div>

        {/* Step 2: GitHub Action Workflow */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-400" />
              Step 2: Add GitHub Pages Workflow (<code className="text-slate-300 font-mono">.github/workflows/deploy.yml</code>)
            </span>
            <button
              onClick={() => copyToClipboard(githubActionWorkflow, 'action')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedSection === 'action' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Workflow!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy YAML</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-40 overflow-y-auto whitespace-pre leading-relaxed">
            {githubActionWorkflow}
          </pre>
        </div>

        {/* Step 3: Custom Domain Tip */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Step 3: Connect Custom Domain (e.g. <code className="text-cyan-300 font-mono">status.unityhosting.online</code>)
          </div>
          <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
            <li>In GitHub: Go to <strong>Repository Settings &rarr; Pages &rarr; Custom domain</strong>.</li>
            <li>Enter <code className="text-slate-200 font-mono">status.unityhosting.online</code> and click Save.</li>
            <li>In your DNS (Cloudflare / Namecheap): Add a <code className="text-amber-300 font-mono">CNAME</code> record pointing <code className="text-slate-200 font-mono">status</code> to <code className="text-slate-200 font-mono">YOUR_USERNAME.github.io</code>.</li>
            <li>Check <strong>Enforce HTTPS</strong> in GitHub Pages settings.</li>
          </ul>
        </div>

        {/* Footer Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
};
