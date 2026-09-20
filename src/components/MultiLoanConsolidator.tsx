import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  TrendingDown,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Percent,
} from 'lucide-react';
import { ConsolidationScenario, GigPersona, IndianLanguage, LoanItem } from '../types';
import { calculateConsolidationPlan } from '../utils/financialCalculations';
import { getTranslations } from '../utils/translations';

interface MultiLoanConsolidatorProps {
  persona: GigPersona;
  loans: LoanItem[];
  onUpdateLoans: (loans: LoanItem[]) => void;
  onApplyConsolidationToTwin: (scenario: ConsolidationScenario) => void;
  language?: IndianLanguage;
}

export const MultiLoanConsolidator: React.FC<MultiLoanConsolidatorProps> = ({
  persona,
  loans,
  onUpdateLoans,
  onApplyConsolidationToTwin,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const [targetApr, setTargetApr] = useState<number>(15.5);
  const [targetTenure, setTargetTenure] = useState<number>(18);
  const [isAddingNewLoan, setIsAddingNewLoan] = useState<boolean>(false);

  // New loan form state
  const [newLoanName, setNewLoanName] = useState('');
  const [newLenderName, setNewLenderName] = useState('');
  const [newLoanType, setNewLoanType] = useState<LoanItem['lenderType']>('Micro Personal Loan');
  const [newPrincipal, setNewPrincipal] = useState(20000);
  const [newRate, setNewRate] = useState(24);
  const [newTenure, setNewTenure] = useState(6);
  const [newEmi, setNewEmi] = useState(3600);

  const consolidation = calculateConsolidationPlan(
    loans,
    persona.monthlyAverageInflow,
    targetApr,
    targetTenure
  );

  const handleRemoveLoan = (id: string) => {
    onUpdateLoans(loans.filter((l) => l.id !== id));
  };

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoanName) return;

    const added: LoanItem = {
      id: `loan-custom-${Date.now()}`,
      name: newLoanName,
      lenderName: newLenderName || 'Fintech Provider',
      lenderType: newLoanType,
      outstandingPrincipal: Number(newPrincipal),
      interestRateAnnual: Number(newRate),
      tenureMonthsRemaining: Number(newTenure),
      monthlyEmi: Number(newEmi),
      startDate: new Date().toISOString().split('T')[0],
      isHighRisk: Number(newRate) >= 35,
    };

    onUpdateLoans([...loans, added]);
    setIsAddingNewLoan(false);
    setNewLoanName('');
    setNewLenderName('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Multi-Loan Consolidation &amp; Credit Health Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Audit multiple concurrent debts, discover your true blended APR, and simulate single-loan restructuring.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAddingNewLoan(!isAddingNewLoan)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Existing Loan
        </button>
      </div>

      {/* Add Loan Inline Form */}
      {isAddingNewLoan && (
        <form
          onSubmit={handleAddLoan}
          className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-200"
        >
          <div className="text-xs font-bold text-slate-800">Add Existing Loan / Obligation:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Loan Purpose / Label</label>
              <input
                type="text"
                required
                placeholder="e.g. Phone EMI or Hand Loan"
                value={newLoanName}
                onChange={(e) => setNewLoanName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Lender / App Name</label>
              <input
                type="text"
                placeholder="e.g. KreditBee, Simpl, Friend"
                value={newLenderName}
                onChange={(e) => setNewLenderName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Debt Category</label>
              <select
                value={newLoanType}
                onChange={(e) => setNewLoanType(e.target.value as LoanItem['lenderType'])}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Fintech BNPL">Fintech BNPL</option>
                <option value="NBFC Bike Loan">NBFC Bike Loan</option>
                <option value="Credit Card EMI">Credit Card EMI</option>
                <option value="Informal/Instant App">Informal/Instant App</option>
                <option value="Micro Personal Loan">Micro Personal Loan</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Outstanding Principal (₹)</label>
              <input
                type="number"
                value={newPrincipal}
                onChange={(e) => setNewPrincipal(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Monthly EMI (₹)</label>
              <input
                type="number"
                value={newEmi}
                onChange={(e) => setNewEmi(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNewLoan(false)}
              className="px-3 py-1.5 text-xs text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              Save Loan
            </button>
          </div>
        </form>
      )}

      {/* Active Debt Obligations Table / Cards */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span>Active Fragmented Debts ({loans.length})</span>
          <span className="text-slate-400 font-normal">Auto-detected from bank statement NACH &amp; UPI debits</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className={`p-3.5 rounded-xl border relative transition-all ${
                loan.isHighRisk
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">{loan.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {loan.lenderName} &bull; {loan.lenderType}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveLoan(loan.id)}
                  title="Remove loan"
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Principal:</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹{loan.outstandingPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Monthly EMI:</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹{loan.monthlyEmi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Rate:</span>
                  <span
                    className={`font-mono font-bold ${
                      loan.interestRateAnnual >= 35 ? 'text-rose-600' : 'text-slate-700'
                    }`}
                  >
                    {loan.interestRateAnnual}% APR
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Remaining:</span>
                  <span className="font-mono text-slate-700 font-medium">
                    {loan.tenureMonthsRemaining} mos
                  </span>
                </div>
              </div>

              {loan.isHighRisk && (
                <div className="mt-2 text-[10px] text-rose-700 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  High predatory rate alert (&gt;35% APR)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Aggregated Current Status Summary */}
      <div className="bg-slate-900 text-white rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Total Debt Owed</span>
          <span className="text-base font-bold font-mono text-slate-100">
            ₹{consolidation.originalTotalDebt.toLocaleString('en-IN')}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Monthly Debt Outflow</span>
          <span className="text-base font-bold font-mono text-slate-100">
            ₹{consolidation.originalMonthlyEmi.toLocaleString('en-IN')}/mo
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Blended APR Burden</span>
          <span className="text-base font-bold font-mono text-amber-400">
            {consolidation.originalBlendedApr}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Current Debt FOIR</span>
          <span className="text-base font-bold font-mono text-rose-400">
            {Math.round((consolidation.originalMonthlyEmi / persona.monthlyAverageInflow) * 100)}%
          </span>
        </div>
      </div>

      {/* Consolidation Restructuring Simulator */}
      <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                Consolidated Single-Loan Restructuring Scenario
              </h4>
            </div>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Refinance {loans.length} scattered high-interest debts into one unified prime repayment facility.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onApplyConsolidationToTwin(consolidation)}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
          >
            Apply to Income Twin
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sliders for Target Restructuring */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Consolidation Rate:</span>
              <span className="font-bold text-emerald-800">{targetApr}% APR (Prime NBFC)</span>
            </div>
            <input
              type="range"
              min="12"
              max="24"
              step="0.5"
              value={targetApr}
              onChange={(e) => setTargetApr(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>12% Super-Prime</span>
              <span>18% Standard NBFC</span>
              <span>24% Ceiling</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Tenure:</span>
              <span className="font-bold text-emerald-800">{targetTenure} Months</span>
            </div>
            <input
              type="range"
              min="6"
              max="36"
              step="6"
              value={targetTenure}
              onChange={(e) => setTargetTenure(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>6 Months</span>
              <span>18 Months</span>
              <span>36 Months</span>
            </div>
          </div>
        </div>

        {/* Restructuring Impact Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
            <span className="text-[10px] text-slate-500 font-medium block">New Single EMI</span>
            <span className="text-lg font-black font-mono text-emerald-800">
              ₹{consolidation.newMonthlyEmi.toLocaleString('en-IN')}/mo
            </span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">
              Down from ₹{consolidation.originalMonthlyEmi.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
            <span className="text-[10px] text-slate-500 font-medium block">Monthly Cashflow Frees Up</span>
            <span className="text-lg font-black font-mono text-emerald-700">
              +₹{consolidation.monthlyEmiSavings.toLocaleString('en-IN')}/mo
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Available liquid buffer
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
            <span className="text-[10px] text-slate-500 font-medium block">Total Interest Saved</span>
            <span className="text-lg font-black font-mono text-indigo-700">
              ₹{consolidation.totalInterestSavings.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-indigo-600 block mt-0.5 font-bold">
              FOIR drops by {consolidation.foirDropPct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
