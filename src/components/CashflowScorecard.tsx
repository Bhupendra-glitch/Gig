import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CashflowScoreAnalysis, GigPersona } from '../types';

interface CashflowScorecardProps {
  analysis: CashflowScoreAnalysis;
  persona: GigPersona;
  isSimulated?: boolean;
}

export const CashflowScorecard: React.FC<CashflowScorecardProps> = ({
  analysis,
  persona,
  isSimulated = false,
}) => {
  const { score, tier, percentileAmongGigWorkers, shapDrivers, metrics } = analysis;

  // Normalized score percentage for gauge arc (300 to 900)
  const scorePct = Math.min(100, Math.max(0, ((score - 300) / 600) * 100));

  const tierColors = {
    'Prime Cashflow': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      ring: 'ring-emerald-500',
      fill: '#059669',
    },
    'Healthy / Near-Prime': {
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-200',
      ring: 'ring-teal-500',
      fill: '#0d9488',
    },
    'Watchlist / Sensitive': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      ring: 'ring-amber-500',
      fill: '#d97706',
    },
    'High Risk / Overleveraged': {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-200',
      ring: 'ring-rose-500',
      fill: '#e11d48',
    },
  }[tier];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Background soft accent */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        {/* Left Column: Score Gauge & Tier */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          {/* Circular SVG Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeDasharray="314.159"
                strokeDashoffset="0"
              />
              {/* Foreground progress arc */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                stroke={tierColors.fill}
                strokeWidth="10"
                strokeDasharray="314.159"
                strokeDashoffset={314.159 - (314.159 * scorePct) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Cashflow Score
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900">
                {score}
              </span>
              <span className="text-[11px] font-medium text-slate-500">out of 900</span>
            </div>
          </div>

          {/* Tier, Description & Percentile */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${tierColors.bg} ${tierColors.text} ${tierColors.border}`}
              >
                {tier}
              </span>
              {isSimulated && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse">
                  Simulated Scenario
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900 font-display">
              {persona.name} &bull; {persona.role}
            </h2>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Calculated via UPI inflows, bank account turnover, and debt service coverage rather than static credit bureau files.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <TrendingUp className="w-3.5 h-3.5" />
                Top {percentileAmongGigWorkers}%
              </span>
              <span className="text-slate-300">&bull;</span>
              <span>Peer Group: Indian Gig Economy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Financial Vital Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {/* Monthly Inflow */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium block">Monthly Inflow</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              ₹{metrics.monthlyInflow.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">
              {metrics.inflowConsistencyRate}% active days
            </span>
          </div>

          {/* Current FOIR */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium block">Current FOIR</span>
            <span
              className={`text-base font-bold font-mono ${
                metrics.foir <= 35 ? 'text-emerald-700' : metrics.foir <= 45 ? 'text-amber-700' : 'text-rose-700'
              }`}
            >
              {metrics.foir}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Safe ceiling: &lt;35%
            </span>
          </div>

          {/* Savings Runway */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium block">Liquid Runway</span>
            <span
              className={`text-base font-bold font-mono ${
                metrics.savingsRunwayDays >= 15 ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {metrics.savingsRunwayDays} Days
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              ₹{persona.currentLiquidSavings.toLocaleString('en-IN')} cash float
            </span>
          </div>

          {/* Repayment Bounce */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium block">NACH Bounces</span>
            <span className="text-base font-bold text-emerald-700 font-mono">0.0%</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">
              Pristine Auto-Debit
            </span>
          </div>
        </div>
      </div>

      {/* SHAP-Style Explainability Waterfall (Why is the score high or low?) */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Explainable AI: SHAP Factor Attribution Drivers
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Base Model Score: <span className="font-mono font-bold">650</span> &plusmn; SHAP Contributions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shapDrivers.map((driver) => (
            <div
              key={driver.id}
              className={`p-3 rounded-xl border transition-all ${
                driver.positive
                  ? 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50/80'
                  : 'bg-rose-50/40 border-rose-200/80 hover:bg-rose-50/80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    {driver.positive ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-900">{driver.factor}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{driver.description}</p>
                </div>

                {/* Impact Badge */}
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold shrink-0 ${
                    driver.positive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {driver.impactScore > 0 ? `+${driver.impactScore}` : driver.impactScore} pts
                </span>
              </div>

              {/* Benchmark and Remedial Action */}
              <div className="mt-2 pt-2 border-t border-slate-200/40 flex flex-wrap items-center justify-between gap-1 text-[10px]">
                <span className="font-medium text-slate-500">{driver.benchmarkStr}</span>
                <span className="text-emerald-800 font-semibold">{driver.remedyAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
