export type IndianLanguage = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'kn';

export interface GigPersona {
  id: string;
  name: string;
  role: string;
  platform: string; // e.g., 'Zomato & Swiggy Delivery', 'Urban Company Partner', 'Kirana UPI Merchant'
  city: string;
  avatar: string;
  monthlyAverageInflow: number;
  monthlyEssentialBurn: number;
  totalMonthlyEmis: number;
  currentLiquidSavings: number;
  accountAgeMonths: number;
  transactionsCount: number;
  initialCashflowScore: number;
  existingLoans: LoanItem[];
  statementFileName: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category:
    | 'platform_payout'
    | 'customer_upi'
    | 'fuel'
    | 'emi_auto_debit'
    | 'bnpl_repayment'
    | 'rent'
    | 'groceries'
    | 'discretionary'
    | 'cash_withdrawal';
  amount: number;
  type: 'credit' | 'debit';
  channel: 'UPI / PhonePe' | 'GooglePay QR' | 'IMPS / NACH' | 'Bank Transfer';
  balanceAfter: number;
}

export interface ShapDriver {
  id: string;
  factor: string;
  impactScore: number; // positive adds, negative subtracts
  positive: boolean;
  valueStr: string;
  benchmarkStr: string;
  description: string;
  remedyAction: string;
}

export interface CashflowScoreAnalysis {
  score: number;
  minScore: number;
  maxScore: number;
  tier: 'Prime Cashflow' | 'Healthy / Near-Prime' | 'Watchlist / Sensitive' | 'High Risk / Overleveraged';
  percentileAmongGigWorkers: number;
  shapDrivers: ShapDriver[];
  metrics: {
    monthlyInflow: number;
    inflowConsistencyRate: number; // % of days with active earnings
    foir: number; // Fixed Obligation to Income Ratio %
    savingsRunwayDays: number;
    nachBounceRate: number; // % bounces in last 90 days (ideally 0%)
    discretionaryBurnRatio: number; // % of income on non-essentials
    peakToTroughVariance: number;
  };
}

export interface ForecastPoint {
  day: number;
  dateLabel: string;
  baselineCashflow: number;
  p10BearScenario: number; // 10th percentile (bad monsoon / sickness / slump)
  p50MedianExpected: number; // expected trend
  p90BullScenario: number; // festive surge / high tips
  simulatedTwinBalance: number; // user sandbox scenario
  scheduledEmiOutflow: number;
  isCrunchAlert: boolean;
}

export interface LoanItem {
  id: string;
  name: string;
  lenderType: 'Fintech BNPL' | 'NBFC Bike Loan' | 'Credit Card EMI' | 'Informal/Instant App' | 'Micro Personal Loan';
  lenderName: string;
  outstandingPrincipal: number;
  interestRateAnnual: number;
  tenureMonthsRemaining: number;
  monthlyEmi: number;
  startDate: string;
  isHighRisk: boolean;
}

export interface ConsolidationScenario {
  originalTotalDebt: number;
  originalMonthlyEmi: number;
  originalBlendedApr: number;
  consolidatedLoanAmount: number;
  consolidatedApr: number;
  consolidatedTenureMonths: number;
  newMonthlyEmi: number;
  monthlyEmiSavings: number;
  totalInterestSavings: number;
  newFoir: number;
  foirDropPct: number;
}

export interface PredatoryCheckResult {
  isPredatory: boolean;
  predatoryScore: number; // 0-100 (higher = predatory)
  statedInterestRate: number;
  trueAnnualPercentageRate: number;
  upfrontDeductionAmount: number;
  netDisbursedAmount: number;
  totalRepaymentAmount: number;
  repaymentScheduleType: 'Daily' | 'Weekly' | 'Monthly';
  penalInterestRateAnnual: number;
  riskFlags: string[];
  safeAlternatives: string[];
}

export interface IncomeTwinVariables {
  newLoanPrincipal: number;
  newLoanTenureMonths: number;
  newLoanAnnualRate: number;
  incomeShockPct: number; // -50% to +30%
  emergencyExpenseAmount: number;
  extraCreditCardBill: number;
  enableMultipleConcurrentLoans: boolean;
  secondLoanAmount: number;
}

export interface MonteCarloSimulationResult {
  trialsCount: number;
  defaultProbabilityPct: number;
  stressIndexLevel: 'Safe' | 'Moderate Concern' | 'Critical Stress' | 'Insolvency Alert';
  medianMinBalance: number;
  cashCrunchDaysCount: number;
  bufferSurplus: number;
  recommendedMaxSafeLoan: number;
}

export interface VernacularAssistantResponse {
  summary: string;
  riskVerdict: 'Safe' | 'Caution' | 'High Risk';
  keyReasoning: string[];
  creditBuildingAction: string;
  vernacularAudioText: string;
}
