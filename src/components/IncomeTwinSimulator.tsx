import React from 'react';
import {
  Sparkles,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Zap,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import {
  GigPersona,
  IncomeTwinVariables,
  MonteCarloSimulationResult,
} from '../types';
import { calculateEmi } from '../utils/financialCalculations';

interface IncomeTwinSimulatorProps {
  persona: GigPersona;
  variables: IncomeTwinVariables;
  onUpdateVariables: (vars: IncomeTwinVariables) => void;
  monteCarloResult: MonteCarloSimulationResult;
  onReset: () => void;
}

export const IncomeTwinSimulator: React.FC<IncomeTwinSimulatorProps> = ({
  persona,
  variables,
  onUpdateVariables,
  monteCarloResult,
  onReset,
}) => {
  const currentTotalEmi = persona.existingLoans.reduce((sum, l) => sum + l.monthlyEmi, 0);
  const currentFoir = Math.round((currentTotalEmi / persona.monthlyAverageInflow) * 100);

  // Simulated metrics
  const newEmi =
    variables.newLoanPrincipal > 0
      ? calculateEmi(
          variables.newLoanPrincipal,
          variables.newLoanAnnualRate,
          variables.newLoanTenureMonths
        )
      : 0;

  const secondEmi =
    variables.enableMultipleConcurrentLoans && variables.secondLoanAmount > 0
      ? calculateEmi(variables.secondLoanAmount, 28, 6)
      : 0;

  const totalSimulatedEmi = currentTotalEmi + newEmi + secondEmi;

  const adjustedIncome = Math.round(
    persona.monthlyAverageInflow * (1 + variables.incomeShockPct / 100)
  );

  const simulatedFoir = Math.round((totalSimulatedEmi / Math.max(1, adjustedIncome)) * 100);

  const currentSurplus = persona.monthlyAverageInflow - persona.monthlyEssentialBurn - currentTotalEmi;
  const simulatedSurplus = adjustedIncome - persona.monthlyEssentialBurn - totalSimulatedEmi;

  const hasModifications =
    variables.newLoanPrincipal > 0 ||
    variables.incomeShockPct !== 0 ||
    variables.emergencyExpenseAmount > 0 ||
    variables.enableMultipleConcurrentLoans;

  const stressBadgeColors = {
    Safe: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Moderate Concern': 'bg-amber-100 text-amber-800 border-amber-300',
    'Critical Stress': 'bg-orange-100 text-orange-800 border-orange-300',
    'Insolvency Alert': 'bg-rose-100 text-rose-800 border-rose-300',
  }[monteCarloResult.stressIndexLevel];

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-200/90 p-5 sm:p-6 shadow-sm space-y-6 relative overflow-hidden">
      {/* Decorative Gradient Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-xl shadow-xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  The Income Twin™ Digital Simulation Sandbox
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Interactive Lab
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Simulate loans, income drops, and emergency expenses to see your future cashflow before borrowing.
              </p>
            </div>
          </div>
        </div>

        {hasModifications && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Baseline
          </button>
        )}
      </div>

      {/* Main Grid: Sandbox Sliders on Left, Monte Carlo & Comparison on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scenario Controls */}
        <div className="lg:col-span-6 space-y-5 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Scenario Control Levers
            </span>
            <span className="text-[11px] text-slate-500">Real-time Amortization &amp; FOIR</span>
          </div>

          {/* 1. New Loan Amount Slider */}
          <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Simulate New Loan Principal
              </label>
              <span className="text-sm font-mono font-bold text-indigo-700">
                ₹{variables.newLoanPrincipal.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={variables.newLoanPrincipal}
              onChange={(e) =>
                onUpdateVariables({
                  ...variables,
                  newLoanPrincipal: Number(e.target.value),
                })
              }
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-medium mr-1">Presets:</span>
              {[0, 20000, 50000, 75000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => onUpdateVariables({ ...variables, newLoanPrincipal: amt })}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    variables.newLoanPrincipal === amt
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {amt === 0 ? 'None' : `₹${amt / 1000}k`}
                </button>
              ))}
            </div>
          </div>

          {/* Loan Details: Tenure & Interest Rate */}
          {variables.newLoanPrincipal > 0 && (
            <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs animate-in fade-in duration-150">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Tenure:</span>
                  <span className="font-bold text-slate-900">{variables.newLoanTenureMonths} Mos</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  step="3"
                  value={variables.newLoanTenureMonths}
                  onChange={(e) =>
                    onUpdateVariables({
                      ...variables,
                      newLoanTenureMonths: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Annual APR:</span>
                  <span className="font-bold text-slate-900">{variables.newLoanAnnualRate}%</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="42"
                  step="2"
                  value={variables.newLoanAnnualRate}
                  onChange={(e) =>
                    onUpdateVariables({
                      ...variables,
                      newLoanAnnualRate: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Calculated New Monthly EMI:</span>
                <span className="font-mono text-indigo-700 font-bold">
                  +₹{newEmi.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </div>
          )}

          {/* 2. Income Shock Slider (-40% to +30%) */}
          <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Income Shock / Fluctuation
              </label>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                  variables.incomeShockPct < 0
                    ? 'bg-rose-100 text-rose-800'
                    : variables.incomeShockPct > 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {variables.incomeShockPct > 0 ? `+${variables.incomeShockPct}%` : `${variables.incomeShockPct}%`}
                {variables.incomeShockPct === -20 && ' (Monsoon Dip)'}
                {variables.incomeShockPct === -35 && ' (Platform Slump)'}
                {variables.incomeShockPct === +20 && ' (Diwali Surge)'}
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="30"
              step="5"
              value={variables.incomeShockPct}
              onChange={(e) =>
                onUpdateVariables({
                  ...variables,
                  incomeShockPct: Number(e.target.value),
                })
              }
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>-40% Extreme Dip</span>
              <span>0% Baseline</span>
              <span>+30% High Surge</span>
            </div>
          </div>

          {/* 3. Emergency Expense & Concurrent Loans Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Emergency Shock Button */}
            <button
              type="button"
              onClick={() =>
                onUpdateVariables({
                  ...variables,
                  emergencyExpenseAmount: variables.emergencyExpenseAmount > 0 ? 0 : 12000,
                })
              }
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                variables.emergencyExpenseAmount > 0
                  ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-semibold ring-2 ring-orange-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-orange-600" />
                  Emergency Expense
                </span>
                <span className="font-mono text-[11px]">₹12,000</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {variables.emergencyExpenseAmount > 0 ? 'Active: Bike Repair / Medical' : 'Test unexpected liquid shock'}
              </span>
            </button>

            {/* Multiple Concurrent Loans Toggle */}
            <button
              type="button"
              onClick={() =>
                onUpdateVariables({
                  ...variables,
                  enableMultipleConcurrentLoans: !variables.enableMultipleConcurrentLoans,
                  secondLoanAmount: !variables.enableMultipleConcurrentLoans ? 15000 : 0,
                })
              }
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                variables.enableMultipleConcurrentLoans
                  ? 'border-indigo-500 bg-indigo-50/80 text-indigo-950 font-semibold ring-2 ring-indigo-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                  Concurrent 2nd Loan
                </span>
                <span className="font-mono text-[11px]">+₹15k</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {variables.enableMultipleConcurrentLoans ? 'Active: Stacking 2nd loan' : 'Test debt-stacking trap'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Comparative Side-by-Side Matrix & Monte Carlo Stress Test */}
        <div className="lg:col-span-6 space-y-4">
          {/* Side-by-Side Comparison Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Twin Comparative Projection
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                {hasModifications ? 'Simulating Live Scenario' : 'Baseline Mode'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Baseline Column */}
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Baseline</span>
                <div>
                  <span className="text-slate-400 text-[11px] block">Monthly Inflow:</span>
                  <span className="font-mono font-bold text-slate-200">
                    ₹{persona.monthlyAverageInflow.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Total EMIs:</span>
                  <span className="font-mono font-bold text-slate-200">
                    ₹{currentTotalEmi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">FOIR:</span>
                  <span className="font-mono font-bold text-emerald-400">{currentFoir}%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Monthly Surplus:</span>
                  <span className="font-mono font-bold text-slate-200">
                    ₹{currentSurplus.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Simulated Twin Column */}
              <div className="bg-indigo-950/50 p-3 rounded-lg border border-indigo-800/60 space-y-2">
                <span className="text-[10px] font-bold text-indigo-300 uppercase block">
                  Simulated Twin
                </span>
                <div>
                  <span className="text-slate-400 text-[11px] block">Adjusted Inflow:</span>
                  <span className="font-mono font-bold text-indigo-200">
                    ₹{adjustedIncome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Simulated EMIs:</span>
                  <span className="font-mono font-bold text-indigo-200">
                    ₹{totalSimulatedEmi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Projected FOIR:</span>
                  <span
                    className={`font-mono font-bold ${
                      simulatedFoir <= 35
                        ? 'text-emerald-400'
                        : simulatedFoir <= 45
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {simulatedFoir}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Projected Surplus:</span>
                  <span
                    className={`font-mono font-bold ${
                      simulatedSurplus >= 2000 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    ₹{simulatedSurplus.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Monte Carlo 500-Trial Stochastic Analysis */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-800">
                  Monte Carlo Stochastic Risk Engine
                </span>
                <span className="text-[10px] text-slate-400 font-mono">(500 Trials / 60-Day Horizon)</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${stressBadgeColors}`}>
                {monteCarloResult.stressIndexLevel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Default / Insolvency</span>
                <span
                  className={`text-base font-black font-mono ${
                    monteCarloResult.defaultProbabilityPct <= 5
                      ? 'text-emerald-700'
                      : monteCarloResult.defaultProbabilityPct <= 18
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {monteCarloResult.defaultProbabilityPct}%
                </span>
              </div>

              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Min Median Balance</span>
                <span className="text-base font-black font-mono text-slate-800">
                  ₹{monteCarloResult.medianMinBalance.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Max Safe Loan Limit</span>
                <span className="text-base font-black font-mono text-indigo-700">
                  ₹{monteCarloResult.recommendedMaxSafeLoan.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Direct Verdict Box */}
            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                monteCarloResult.defaultProbabilityPct <= 10
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : monteCarloResult.defaultProbabilityPct <= 25
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              {monteCarloResult.defaultProbabilityPct <= 10 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block text-[13px]">
                  {monteCarloResult.defaultProbabilityPct <= 10
                    ? `Affordability Verdict: Safe to Manage ₹${variables.newLoanPrincipal.toLocaleString('en-IN')}`
                    : monteCarloResult.defaultProbabilityPct <= 25
                    ? `Affordability Verdict: Cautionary Stretch (₹${variables.newLoanPrincipal.toLocaleString('en-IN')})`
                    : `Affordability Verdict: High Risk of NACH Default!`}
                </span>
                <p className="text-[11px] mt-0.5">
                  {monteCarloResult.defaultProbabilityPct <= 10
                    ? `Your projected FOIR (${simulatedFoir}%) remains below 35% safe limit. Even with standard daily variance, liquid cash buffer does not breach insolvency.`
                    : monteCarloResult.defaultProbabilityPct <= 25
                    ? `This loan pushes FOIR to ${simulatedFoir}%. A 20% platform drop or minor fuel price hike would trigger tight liquidity near the 15th of the month.`
                    : `Simulated FOIR (${simulatedFoir}%) severely exhausts daily earnings. In 500 stochastic trials, cash drops to ₹0 in ${monteCarloResult.defaultProbabilityPct}% of paths.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
