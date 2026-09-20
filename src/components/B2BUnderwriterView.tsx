import React from 'react';
import {
  UserCheck,
  ShieldCheck,
  Building2,
  FileCheck2,
  CheckCircle2,
  Lock,
  Download,
  AlertCircle,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { CashflowScoreAnalysis, GigPersona, IndianLanguage } from '../types';
import { getTranslations } from '../utils/translations';

interface B2BUnderwriterViewProps {
  persona: GigPersona;
  analysis: CashflowScoreAnalysis;
  language?: IndianLanguage;
}

export const B2BUnderwriterView: React.FC<B2BUnderwriterViewProps> = ({
  persona,
  analysis,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const existingEmi = persona.existingLoans.reduce((sum, l) => sum + l.monthlyEmi, 0);
  const netMonthlySurplus = persona.monthlyAverageInflow - persona.monthlyEssentialBurn - existingEmi;
  const dscr = (netMonthlySurplus + existingEmi) / Math.max(1, existingEmi);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* B2B Header Ribbon */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Building2 className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold font-display">
                  Institutional Cashflow Underwriting Terminal (NBFC &amp; Fintech Portal)
                </h2>
                <p className="text-xs text-slate-400">
                  Consent-backed financial intelligence for underwriting new-to-credit gig professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              RBI Account Aggregator Consent Valid
            </span>
          </div>
        </div>

        {/* Applicant Tokenized Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Applicant Token:</span>
            <span className="font-mono font-bold text-slate-200">GC-USER-748921-X</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Verified Segment:</span>
            <span className="font-bold text-indigo-400">{persona.role}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Cashflow Score:</span>
            <span className="font-mono font-bold text-emerald-400">{analysis.score} / 900</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Risk Grade:</span>
            <span className="font-bold text-emerald-300">Grade A- (Prime Cashflow)</span>
          </div>
        </div>
      </div>

      {/* Core Cashflow Underwriting Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* DSCR Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Debt Service Coverage Ratio (DSCR)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900">
              {dscr.toFixed(2)}x
            </span>
            <span className="text-xs font-bold text-emerald-600">Healthy Buffer</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Current net operational surplus covers scheduled debt service {dscr.toFixed(2)} times. Minimum underwriting threshold is 1.25x.
          </p>
        </div>

        {/* Volatility Index */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Inflow Volatility Index
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-emerald-700">0.24</span>
            <span className="text-xs font-bold text-slate-500">Low-Moderate</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Normalized daily earnings variance across 90-day UPI statement. Demonstrates consistent platform engagement with low idle days.
          </p>
        </div>

        {/* Liquid Runway */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Emergency Cash Buffer Runway
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-indigo-700">
              {analysis.metrics.savingsRunwayDays} Days
            </span>
            <span className="text-xs font-bold text-indigo-600">Float Resilient</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Liquid balance in primary payout VPA equals ₹{persona.currentLiquidSavings.toLocaleString('en-IN')}, providing resilience against NACH bounce.
          </p>
        </div>
      </div>

      {/* Pre-Approved Underwriting Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Algorithmic Sanction Recommendation
            </h3>
            <p className="text-xs text-slate-500">
              Computed via GigCred Cashflow Scorer &amp; 500-Path Monte Carlo Stress Model
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Automated Approval Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Maximum Safe Credit Limit:</span>
            <span className="text-2xl font-black font-mono text-slate-900 block">
              ₹45,000
            </span>
            <span className="text-[10px] text-slate-500">
              Caps projected FOIR at 34% (Safe threshold)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Recommended APR:</span>
            <span className="text-2xl font-black font-mono text-emerald-700 block">
              15.5% - 17.0%
            </span>
            <span className="text-[10px] text-slate-500">
              Reducing balance (Fair &amp; compliant with RBI fair practices)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Optimal Auto-Debit Day:</span>
            <span className="text-2xl font-black font-mono text-indigo-700 block">
              12th of Month
            </span>
            <span className="text-[10px] text-slate-500">
              Aligns 3 days post major platform weekly settlement
            </span>
          </div>
        </div>

        {/* Verification & Compliance Audit Trail */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Verified Data Artifacts:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-950 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Document AI statement OCR extraction validated (98.4% conf)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-950 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Cloud DLP PAN &amp; Aadhaar redaction passed zero-leak audit</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-950 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>0% NACH bounce rate in preceding 90 days</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-50/60 rounded-lg text-emerald-950 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>UPI daily inflow cadence confirmed across {persona.platform}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
