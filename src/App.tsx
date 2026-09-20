import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CashflowScorecard } from './components/CashflowScorecard';
import { ForecastCharts } from './components/ForecastCharts';
import { IncomeTwinSimulator } from './components/IncomeTwinSimulator';
import { MultiLoanConsolidator } from './components/MultiLoanConsolidator';
import { PredatoryLoanDetector } from './components/PredatoryLoanDetector';
import { VernacularAssistant } from './components/VernacularAssistant';
import { B2BUnderwriterView } from './components/B2BUnderwriterView';
import { TransactionHistory } from './components/TransactionHistory';
import { StatementUploader } from './components/StatementUploader';
import { GIG_PERSONAS, SAMPLE_TRANSACTIONS } from './data/mockPersonas';
import {
  ConsolidationScenario,
  GigPersona,
  IncomeTwinVariables,
  IndianLanguage,
  LoanItem,
} from './types';
import {
  computeCashflowScore,
  generateCashflowForecast,
  runMonteCarloSimulation,
} from './utils/financialCalculations';
import {
  TrendingUp,
  Layers,
  ShieldAlert,
  Bot,
  Building2,
} from 'lucide-react';

const defaultTwinVariables: IncomeTwinVariables = {
  newLoanPrincipal: 0,
  newLoanTenureMonths: 6,
  newLoanAnnualRate: 24,
  incomeShockPct: 0,
  emergencyExpenseAmount: 0,
  extraCreditCardBill: 0,
  enableMultipleConcurrentLoans: false,
  secondLoanAmount: 0,
};

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<GigPersona>(GIG_PERSONAS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>('en');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'consolidate' | 'predatory' | 'assistant' | 'b2b'
  >('overview');
  const [timeframe, setTimeframe] = useState<30 | 60 | 90>(30);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [simulationVariables, setSimulationVariables] = useState<IncomeTwinVariables>(
    defaultTwinVariables
  );

  // Loans state (allows user to add/remove/consolidate)
  const [personaLoans, setPersonaLoans] = useState<Record<string, LoanItem[]>>({
    'ravi-delivery': GIG_PERSONAS[0].existingLoans,
    'pooja-freelance': GIG_PERSONAS[1].existingLoans,
    'arun-merchant': GIG_PERSONAS[2].existingLoans,
  });

  const currentLoans = personaLoans[selectedPersona.id] || selectedPersona.existingLoans;

  const handleUpdateLoans = (updated: LoanItem[]) => {
    setPersonaLoans((prev) => ({
      ...prev,
      [selectedPersona.id]: updated,
    }));
  };

  // Change persona handler
  const handleSelectPersona = (p: GigPersona) => {
    setSelectedPersona(p);
    setSimulationVariables(defaultTwinVariables);
  };

  // Has active simulation modifications
  const hasSimulatedChanges = useMemo(() => {
    return (
      simulationVariables.newLoanPrincipal > 0 ||
      simulationVariables.incomeShockPct !== 0 ||
      simulationVariables.emergencyExpenseAmount > 0 ||
      simulationVariables.extraCreditCardBill > 0 ||
      simulationVariables.enableMultipleConcurrentLoans
    );
  }, [simulationVariables]);

  // Dynamic calculations
  const cashflowAnalysis = useMemo(() => {
    return computeCashflowScore(selectedPersona, simulationVariables);
  }, [selectedPersona, simulationVariables]);

  const forecastPoints = useMemo(() => {
    return generateCashflowForecast(selectedPersona, timeframe, simulationVariables);
  }, [selectedPersona, timeframe, simulationVariables]);

  const monteCarloResult = useMemo(() => {
    return runMonteCarloSimulation(selectedPersona, simulationVariables);
  }, [selectedPersona, simulationVariables]);

  // Apply consolidation directly into the Income Twin simulation
  const handleApplyConsolidationToTwin = (scenario: ConsolidationScenario) => {
    setSimulationVariables({
      newLoanPrincipal: scenario.originalTotalDebt,
      newLoanTenureMonths: 18,
      newLoanAnnualRate: 15.5,
      incomeShockPct: 0,
      emergencyExpenseAmount: 0,
      extraCreditCardBill: 0,
      enableMultipleConcurrentLoans: false,
      secondLoanAmount: 0,
    });
    setActiveTab('overview');
  };

  const handleStatementProcessed = (_fileName: string) => {
    setIsUploadModalOpen(false);
  };

  const transactions = SAMPLE_TRANSACTIONS[selectedPersona.id] || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        personas={GIG_PERSONAS}
        selectedPersona={selectedPersona}
        onSelectPersona={handleSelectPersona}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        activeTab={activeTab === 'b2b' ? 'b2b' : 'worker'}
        onTabChange={(tab) => {
          if (tab === 'b2b') {
            setActiveTab('b2b');
          } else if (activeTab === 'b2b') {
            setActiveTab('overview');
          }
        }}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />

      {/* Secondary Main Feature Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Cashflow &amp; Income Twin</span>
              {hasSimulatedChanges && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('consolidate')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'consolidate'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Debt Consolidator</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                {currentLoans.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('predatory')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'predatory'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Predatory Loan Detector</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'assistant'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Vernacular AI Voice Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('b2b')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'b2b'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Underwriting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: OVERVIEW (Explainable Score, Forecast & Income Twin Sandbox) */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* 1. Explainable Cashflow Scorecard with SHAP Factor Drivers */}
            <CashflowScorecard
              analysis={cashflowAnalysis}
              persona={selectedPersona}
              isSimulated={hasSimulatedChanges}
            />

            {/* 2. Interactive Digital Simulation Sandbox: The Income Twin */}
            <IncomeTwinSimulator
              persona={selectedPersona}
              variables={simulationVariables}
              onUpdateVariables={setSimulationVariables}
              monteCarloResult={monteCarloResult}
              onReset={() => setSimulationVariables(defaultTwinVariables)}
            />

            {/* 3. Forward-Looking 30-, 60-, 90-Day Cash-Flow Forecast */}
            <ForecastCharts
              points={forecastPoints}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              hasSimulatedChanges={hasSimulatedChanges}
            />

            {/* 4. Extracted UPI and Bank Ledger */}
            <TransactionHistory
              transactions={transactions}
              statementFileName={selectedPersona.statementFileName}
            />
          </div>
        )}

        {/* TAB 2: MULTI-LOAN CONSOLIDATOR */}
        {activeTab === 'consolidate' && (
          <div className="animate-in fade-in duration-150">
            <MultiLoanConsolidator
              persona={selectedPersona}
              loans={currentLoans}
              onUpdateLoans={handleUpdateLoans}
              onApplyConsolidationToTwin={handleApplyConsolidationToTwin}
            />
          </div>
        )}

        {/* TAB 3: PREDATORY LOAN DETECTOR */}
        {activeTab === 'predatory' && (
          <div className="animate-in fade-in duration-150">
            <PredatoryLoanDetector />
          </div>
        )}

        {/* TAB 4: VERNACULAR AI ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="animate-in fade-in duration-150">
            <VernacularAssistant
              persona={selectedPersona}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              simulationVariables={simulationVariables}
              currentCashflowScore={cashflowAnalysis.score}
            />
          </div>
        )}

        {/* TAB 5: INSTITUTIONAL B2B UNDERWRITING VIEW */}
        {activeTab === 'b2b' && (
          <div className="animate-in fade-in duration-150">
            <B2BUnderwriterView
              persona={selectedPersona}
              analysis={cashflowAnalysis}
            />
          </div>
        )}
      </main>

      {/* Google Document AI & Cloud DLP Statement Modal */}
      <StatementUploader
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        activePersona={selectedPersona}
        onStatementProcessed={handleStatementProcessed}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">GigCred Financial Intelligence</span>
            <span>&bull;</span>
            <span>Powered by Google Document AI, Cloud DLP, and Gemini 3.8</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Consent-based &bull; Zero PII Retention &bull; Client-side &amp; KMS HSM Protected
          </div>
        </div>
      </footer>
    </div>
  );
}
