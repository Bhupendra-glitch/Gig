import React from 'react';
import {
  ShieldCheck,
  Globe2,
  FileText,
  UserCheck,
  Lock,
  Cpu,
} from 'lucide-react';
import { GigPersona, IndianLanguage } from '../types';
import { getTranslations, LANGUAGE_OPTIONS } from '../utils/translations';

interface NavbarProps {
  personas: GigPersona[];
  selectedPersona: GigPersona;
  onSelectPersona: (p: GigPersona) => void;
  selectedLanguage: IndianLanguage;
  onSelectLanguage: (lang: IndianLanguage) => void;
  activeTab: 'worker' | 'b2b';
  onTabChange: (tab: 'worker' | 'b2b') => void;
  onOpenUploadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  personas,
  selectedPersona,
  onSelectPersona,
  selectedLanguage,
  onSelectLanguage,
  activeTab,
  onTabChange,
  onOpenUploadModal,
}) => {
  const t = getTranslations(selectedLanguage);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-xs shadow-emerald-500/20">
              GC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">
                  Gig<span className="text-emerald-600">Cred</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                  Income Twin™
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Center Tabs: Worker Dashboard vs B2B Underwriter View */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onTabChange('worker')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'worker'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.workerHub}
            </button>
            <button
              onClick={() => onTabChange('b2b')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'b2b'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              {t.b2bCockpit}
            </button>
          </nav>

          {/* Right Controls: Persona Switcher, Language & DLP Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Persona Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-base">{selectedPersona.avatar}</span>
              <select
                value={selectedPersona.id}
                onChange={(e) => {
                  const found = personas.find((p) => p.id === e.target.value);
                  if (found) onSelectPersona(found);
                }}
                className="bg-transparent text-slate-800 font-semibold focus:outline-hidden cursor-pointer"
                title="Select Profile"
              >
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs ring-1 ring-emerald-500/30">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => onSelectLanguage(e.target.value as IndianLanguage)}
                className="bg-transparent text-slate-900 font-semibold focus:outline-hidden cursor-pointer"
                title="Select Vernacular Language"
              >
                {LANGUAGE_OPTIONS.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Statement Button */}
            <button
              onClick={onOpenUploadModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.uploadStatement}</span>
            </button>
          </div>
        </div>

        {/* Security & GCP Tech Ribbon */}
        <div className="py-1.5 px-1 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t.securityDocAI}
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Lock className="w-3 h-3 text-slate-400" />
              {t.securityKMS}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-indigo-700 font-medium">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              {t.securityXGBoost}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono">{t.monteCarloTag}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
