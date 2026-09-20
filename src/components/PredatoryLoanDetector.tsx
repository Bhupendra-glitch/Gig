import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Info,
  DollarSign,
  Percent,
  FileSearch,
  ExternalLink,
} from 'lucide-react';
import { analyzeLoanOffer } from '../utils/financialCalculations';
import { IndianLanguage, PredatoryCheckResult } from '../types';
import { getTranslations } from '../utils/translations';

interface PredatoryLoanDetectorProps {
  language?: IndianLanguage;
}

export const PredatoryLoanDetector: React.FC<PredatoryLoanDetectorProps> = ({
  language = 'en',
}) => {
  const t = getTranslations(language);
  const [principal, setPrincipal] = useState<number>(25000);
  const [statedRate, setStatedRate] = useState<number>(24);
  const [rateType, setRateType] = useState<'flat' | 'reducing'>('flat');
  const [tenure, setTenure] = useState<number>(6);
  const [processingFee, setProcessingFee] = useState<number>(8);
  const [penalRate, setPenalRate] = useState<number>(36);
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const analysis: PredatoryCheckResult = analyzeLoanOffer(
    principal,
    statedRate,
    rateType,
    tenure,
    processingFee,
    penalRate,
    frequency
  );

  const applyPreset = (
    p: number,
    r: number,
    type: 'flat' | 'reducing',
    t: number,
    fee: number,
    penal: number,
    freq: 'Daily' | 'Weekly' | 'Monthly'
  ) => {
    setPrincipal(p);
    setStatedRate(r);
    setRateType(type);
    setTenure(t);
    setProcessingFee(fee);
    setPenalRate(penal);
    setFrequency(freq);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-800 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t.predatoryTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.predatorySubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Preset quick test badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Quick Test:</span>
          <button
            type="button"
            onClick={() => applyPreset(20000, 36, 'flat', 3, 10, 48, 'Daily')}
            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-semibold border border-rose-200 text-[11px] transition-colors"
          >
            Instant Cash App (Trap)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(30000, 22, 'flat', 6, 6, 36, 'Weekly')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold border border-amber-200 text-[11px] transition-colors"
          >
            Subprime BNPL
          </button>
          <button
            type="button"
            onClick={() => applyPreset(40000, 15, 'reducing', 12, 2, 24, 'Monthly')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold border border-emerald-200 text-[11px] transition-colors"
          >
            Regulated NBFC Loan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Loan Offer Input Form */}
        <div className="lg:col-span-6 space-y-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileSearch className="w-4 h-4 text-slate-600" />
            Enter Proposed Loan Offer Parameters
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Offered Principal (₹)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Math.max(1000, Number(e.target.value)))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Advertised Interest Rate (%)
              </label>
              <input
                type="number"
                value={statedRate}
                onChange={(e) => setStatedRate(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Interest Calculation Type
              </label>
              <select
                value={rateType}
                onChange={(e) => setRateType(e.target.value as 'flat' | 'reducing')}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              >
                <option value="flat">Flat Interest (Hidden Trap)</option>
                <option value="reducing">Reducing Balance (Standard)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Tenure (Months)
              </label>
              <input
                type="number"
                min="1"
                max="36"
                value={tenure}
                onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Upfront Processing Fee (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={processingFee}
                onChange={(e) => setProcessingFee(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Repayment Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'Daily' | 'Weekly' | 'Monthly')}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              >
                <option value="Daily">Daily Auto-Debit (Aggressive)</option>
                <option value="Weekly">Weekly Recovery</option>
                <option value="Monthly">Monthly Structured NACH</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side: Transparent Borrowing Cost Breakdown & Predatory Meter */}
        <div className="lg:col-span-6 space-y-4">
          {/* Predatory Threat Meter */}
          <div
            className={`p-4 rounded-xl border space-y-3 ${
              analysis.isPredatory
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                {analysis.isPredatory ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                {analysis.isPredatory ? 'PREDATORY LOAN WARNING' : 'TRANSPARENT REGULATED PRODUCT'}
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                  analysis.isPredatory ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                }`}
              >
                Risk Score: {analysis.predatoryScore} / 100
              </span>
            </div>

            {/* True APR Comparison Box */}
            <div className="bg-white/90 p-3 rounded-lg border border-slate-200/80 grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Advertised Rate</span>
                <span className="text-base font-bold font-mono text-slate-700">
                  {analysis.statedInterestRate}% {rateType === 'flat' ? '(Flat)' : '(Reducing)'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-rose-600 font-bold block">ACTUAL TRUE APR</span>
                <span className="text-xl font-black font-mono text-rose-600">
                  {analysis.trueAnnualPercentageRate}% APR
                </span>
              </div>
            </div>

            {/* Upfront deduction & net cash delivered */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white/60 p-2 rounded-lg">
              <div>
                <span className="text-slate-500 text-[10px] block">Upfront Deducted:</span>
                <span className="font-bold text-rose-700">
                  -₹{analysis.upfrontDeductionAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Cash Reaching Account:</span>
                <span className="font-bold text-slate-900">
                  ₹{analysis.netDisbursedAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Early Warning Flags List */}
          {analysis.riskFlags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Personalized Early-Warning Flags ({analysis.riskFlags.length}):
              </span>
              <div className="space-y-1">
                {analysis.riskFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-rose-50/70 border border-rose-200/80 text-[11px] text-rose-900 flex items-start gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safe Alternatives */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-800 block">Recommended Safe Alternatives:</span>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              {analysis.safeAlternatives.map((alt, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{alt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
