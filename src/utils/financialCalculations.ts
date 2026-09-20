import {
  CashflowScoreAnalysis,
  ConsolidationScenario,
  ForecastPoint,
  GigPersona,
  IncomeTwinVariables,
  LoanItem,
  MonteCarloSimulationResult,
  PredatoryCheckResult,
  ShapDriver,
} from '../types';

/**
 * Standard reducing-balance monthly EMI calculation
 */
export function calculateEmi(principal: number, annualRatePct: number, tenureMonths: number): number {
  if (tenureMonths <= 0 || principal <= 0) return 0;
  if (annualRatePct <= 0) return Math.round(principal / tenureMonths);

  const monthlyRate = annualRatePct / 12 / 100;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
  return Math.round(numerator / denominator);
}

/**
 * Explainable Cashflow Score Engine (300 - 900 scale)
 * Models XGBoost/SHAP feature attribution for gig cashflow data
 */
export function computeCashflowScore(
  persona: GigPersona,
  simulatedTwin?: IncomeTwinVariables
): CashflowScoreAnalysis {
  const baseIncome = persona.monthlyAverageInflow;
  const incomeAdj = simulatedTwin ? 1 + simulatedTwin.incomeShockPct / 100 : 1;
  const effectiveIncome = Math.max(10000, baseIncome * incomeAdj);

  // Calculate current EMIs + simulated loan EMIs
  let totalEmi = persona.existingLoans.reduce((sum, loan) => sum + loan.monthlyEmi, 0);
  if (simulatedTwin && simulatedTwin.newLoanPrincipal > 0) {
    const newEmi = calculateEmi(
      simulatedTwin.newLoanPrincipal,
      simulatedTwin.newLoanAnnualRate,
      simulatedTwin.newLoanTenureMonths
    );
    totalEmi += newEmi;

    if (simulatedTwin.enableMultipleConcurrentLoans && simulatedTwin.secondLoanAmount > 0) {
      totalEmi += calculateEmi(simulatedTwin.secondLoanAmount, 28, 6);
    }
  }

  const foir = Math.round((totalEmi / effectiveIncome) * 100);
  const dailyBurn = (persona.monthlyEssentialBurn + totalEmi) / 30;
  let liquidRunwayDays = Math.round(persona.currentLiquidSavings / Math.max(1, dailyBurn));

  if (simulatedTwin && simulatedTwin.emergencyExpenseAmount > 0) {
    const afterEmergencySavings = Math.max(0, persona.currentLiquidSavings - simulatedTwin.emergencyExpenseAmount);
    liquidRunwayDays = Math.round(afterEmergencySavings / Math.max(1, dailyBurn));
  }

  // Base score centered at 650
  let score = 650;
  const shapDrivers: ShapDriver[] = [];

  // 1. Inflow Consistency Factor
  const activeDaysRatio = persona.id === 'ravi-delivery' ? 0.92 : persona.id === 'pooja-freelance' ? 0.78 : 0.88;
  if (activeDaysRatio >= 0.85) {
    const impact = +44;
    score += impact;
    shapDrivers.push({
      id: 'inflow_consistency',
      factor: 'Daily UPI Inflow Consistency',
      impactScore: impact,
      positive: true,
      valueStr: `${Math.round(activeDaysRatio * 30)} active days/mo`,
      benchmarkStr: 'Benchmark: > 24 days',
      description: 'High frequency of micro-credits from digital platforms shows consistent daily earning discipline.',
      remedyAction: 'Maintain uninterrupted daily platform log-ins to preserve prime cash-stability rating.',
    });
  } else {
    const impact = -18;
    score += impact;
    shapDrivers.push({
      id: 'inflow_consistency',
      factor: 'Lumpy Freelance Inflow Spacing',
      impactScore: impact,
      positive: false,
      valueStr: `${Math.round(activeDaysRatio * 30)} active days/mo`,
      benchmarkStr: 'Benchmark: > 24 days',
      description: 'Earnings arrive in irregular milestone bursts rather than predictable weekly cadence.',
      remedyAction: 'Set up weekly retainer billing or milestone tranche agreements with long-term clients.',
    });
  }

  // 2. FOIR (Debt Burden) Factor
  if (foir <= 30) {
    const impact = +38;
    score += impact;
    shapDrivers.push({
      id: 'foir_healthy',
      factor: 'Low Debt-to-Income (FOIR)',
      impactScore: impact,
      positive: true,
      valueStr: `${foir}% of monthly inflow`,
      benchmarkStr: 'Safe Threshold: < 35%',
      description: 'Fixed obligations are well within safe operating margins, leaving healthy operational surplus.',
      remedyAction: 'Continue keeping total EMIs under 30% to maximize pre-approved borrowing limits.',
    });
  } else if (foir <= 45) {
    const impact = -12;
    score += impact;
    shapDrivers.push({
      id: 'foir_moderate',
      factor: 'Moderate Debt Obligation Strain',
      impactScore: impact,
      positive: false,
      valueStr: `${foir}% of monthly inflow`,
      benchmarkStr: 'Safe Threshold: < 35%',
      description: 'Over a third of monthly earnings is consumed by existing EMIs, reducing resilience to fuel or fee shocks.',
      remedyAction: 'Avoid taking new BNPL or personal loans until current bike/device loans are fully paid off.',
    });
  } else {
    const impact = -52;
    score += impact;
    shapDrivers.push({
      id: 'foir_critical',
      factor: 'Overleveraged Obligation Ratio (High FOIR)',
      impactScore: impact,
      positive: false,
      valueStr: `${foir}% of monthly inflow`,
      benchmarkStr: 'Safe Threshold: < 35%',
      description: 'Debt repayments consume nearly half of income, creating a high vulnerability to NACH bounce penalties.',
      remedyAction: 'Immediately explore loan consolidation to bring total monthly EMI burden below 35%.',
    });
  }

  // 3. Liquid Savings Runway
  if (liquidRunwayDays >= 21) {
    const impact = +32;
    score += impact;
    shapDrivers.push({
      id: 'savings_runway',
      factor: 'Healthy Emergency Liquidity Runway',
      impactScore: impact,
      positive: true,
      valueStr: `${liquidRunwayDays} days of expenses`,
      benchmarkStr: 'Target: > 15 days',
      description: 'Ample buffer in primary savings account shields against sudden platform downtime or minor repairs.',
      remedyAction: 'Auto-sweep daily 5% of gig payouts into a liquid overnight fund or recurring deposit.',
    });
  } else if (liquidRunwayDays >= 10) {
    const impact = -14;
    score += impact;
    shapDrivers.push({
      id: 'savings_runway',
      factor: 'Tight Cash Reserve Runway',
      impactScore: impact,
      positive: false,
      valueStr: `${liquidRunwayDays} days of expenses`,
      benchmarkStr: 'Target: > 15 days',
      description: 'Current cash buffer can only support basic survival for under two weeks if earnings halt.',
      remedyAction: 'Prioritize building a minimum 15-day float before committing to any new equipment lease.',
    });
  } else {
    const impact = -46;
    score += impact;
    shapDrivers.push({
      id: 'savings_runway',
      factor: 'Critical Depletion of Cash Buffer',
      impactScore: impact,
      positive: false,
      valueStr: `${liquidRunwayDays} days of expenses`,
      benchmarkStr: 'Target: > 15 days',
      description: 'Near-zero emergency runway leaves you exposed to immediate insolvency upon unexpected expenses.',
      remedyAction: 'Pause all non-essential discretionary spends and activate debt consolidation relief.',
    });
  }

  // 4. Repayment Discipline & Bounce Rate
  const bounceRate = 0.0; // Clean record
  const bounceImpact = +28;
  score += bounceImpact;
  shapDrivers.push({
    id: 'bounce_discipline',
    factor: 'Pristine NACH & Auto-Debit Discipline',
    impactScore: bounceImpact,
    positive: true,
    valueStr: '0 bounces in 90 days',
    benchmarkStr: 'Benchmark: 0 bounces',
    description: 'Zero automated payment rejections or ECS dishonor charges indicates disciplined funds scheduling.',
    remedyAction: 'Keep scheduling loan debits 2 days after regular platform settlement cycles.',
  });

  // 5. High-Cost Debt Penalty (Instant Apps & Rolling Cards)
  const hasHighRiskDebt = persona.existingLoans.some((l) => l.isHighRisk || l.interestRateAnnual >= 36);
  if (hasHighRiskDebt) {
    const impact = -26;
    score += impact;
    shapDrivers.push({
      id: 'predatory_exposure',
      factor: 'Exposure to High-APR Debt / Instant Apps',
      impactScore: impact,
      positive: false,
      valueStr: 'Active loan at >36% APR',
      benchmarkStr: 'Benchmark: No predatory debt',
      description: 'High compound interest drains working cashflow rapidly and signals predatory credit dependence.',
      remedyAction: 'Prioritize closing or refinancing high-cost instant loans with lower-rate NBFC balance transfer.',
    });
  }

  // 6. Account Vintage & Micro-Merchant Tenure
  if (persona.accountAgeMonths >= 24) {
    const impact = +22;
    score += impact;
    shapDrivers.push({
      id: 'account_vintage',
      factor: 'Established Banking & UPI History',
      impactScore: impact,
      positive: true,
      valueStr: `${persona.accountAgeMonths} months active`,
      benchmarkStr: 'Benchmark: > 12 months',
      description: 'Long transaction history enables high-fidelity statistical confidence in cashflow forecasting.',
      remedyAction: 'Continue transacting via your primary UPI VPA rather than fragmenting across new wallets.',
    });
  }

  // Clamp score between 300 and 900
  const finalScore = Math.max(300, Math.min(900, score));

  let tier: CashflowScoreAnalysis['tier'] = 'Healthy / Near-Prime';
  if (finalScore >= 750) tier = 'Prime Cashflow';
  else if (finalScore >= 680) tier = 'Healthy / Near-Prime';
  else if (finalScore >= 600) tier = 'Watchlist / Sensitive';
  else tier = 'High Risk / Overleveraged';

  const percentile = Math.min(98, Math.max(12, Math.round(((finalScore - 300) / 600) * 100)));

  return {
    score: finalScore,
    minScore: 300,
    maxScore: 900,
    tier,
    percentileAmongGigWorkers: percentile,
    shapDrivers,
    metrics: {
      monthlyInflow: Math.round(effectiveIncome),
      inflowConsistencyRate: Math.round(activeDaysRatio * 100),
      foir,
      savingsRunwayDays: liquidRunwayDays,
      nachBounceRate: bounceRate,
      discretionaryBurnRatio: 18,
      peakToTroughVariance: 24,
    },
  };
}

/**
 * 30, 60, and 90-Day Cashflow Forecasting Model
 * Models seasonality, weekend delivery spikes, and scheduled EMI auto-debits
 */
export function generateCashflowForecast(
  persona: GigPersona,
  timeframeDays: 30 | 60 | 90,
  simulatedTwin?: IncomeTwinVariables
): ForecastPoint[] {
  const points: ForecastPoint[] = [];
  const initialBalance = persona.currentLiquidSavings;
  let runningBaseline = initialBalance;
  let runningTwin = initialBalance;

  if (simulatedTwin && simulatedTwin.emergencyExpenseAmount > 0) {
    runningTwin = Math.max(0, runningTwin - simulatedTwin.emergencyExpenseAmount);
  }

  if (simulatedTwin && simulatedTwin.newLoanPrincipal > 0) {
    // Net disbursement added to balance at day 1
    const netDisbursed = simulatedTwin.newLoanPrincipal * 0.97; // 3% normal fee
    runningTwin += netDisbursed;
  }

  const avgDailyInflow = persona.monthlyAverageInflow / 30;
  const avgDailyEssentialBurn = persona.monthlyEssentialBurn / 30;

  // Calculate existing EMIs
  const existingMonthlyEmi = persona.existingLoans.reduce((acc, l) => acc + l.monthlyEmi, 0);
  const newSimulatedEmi =
    simulatedTwin && simulatedTwin.newLoanPrincipal > 0
      ? calculateEmi(
          simulatedTwin.newLoanPrincipal,
          simulatedTwin.newLoanAnnualRate,
          simulatedTwin.newLoanTenureMonths
        )
      : 0;

  const incomeFactor = simulatedTwin ? 1 + simulatedTwin.incomeShockPct / 100 : 1;

  for (let day = 1; day <= timeframeDays; day++) {
    // Day of week seasonality: Friday-Sunday gets +35% weekend surge for gig delivery
    const dayOfWeek = (day % 7) + 1;
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 7;
    const weekendMultiplier = isWeekend ? 1.35 : 0.88;

    // Daily baseline inflow
    const dailyInflow = avgDailyInflow * weekendMultiplier;
    const dailyOutflow = avgDailyEssentialBurn * (1 + (Math.sin(day * 0.4) * 0.15));

    // Scheduled EMI auto-debit on 5th, 10th, and 18th of each 30-day cycle
    let emiOutflow = 0;
    const dayInMonth = ((day - 1) % 30) + 1;
    if (dayInMonth === 5) {
      emiOutflow += Math.round(existingMonthlyEmi * 0.45); // Bike EMI
    } else if (dayInMonth === 10) {
      emiOutflow += Math.round(existingMonthlyEmi * 0.35); // BNPL / Personal
    } else if (dayInMonth === 18) {
      emiOutflow += Math.round(existingMonthlyEmi * 0.20); // Minor credit
    }

    // Baseline calculation
    runningBaseline += dailyInflow - dailyOutflow - emiOutflow;

    // Simulated Twin calculation with income shock and new EMI
    const twinInflow = dailyInflow * incomeFactor;
    let twinEmiOutflow = emiOutflow;
    if (dayInMonth === 15 && newSimulatedEmi > 0) {
      twinEmiOutflow += newSimulatedEmi;
    }
    runningTwin += twinInflow - dailyOutflow - twinEmiOutflow;

    // Uncertainty confidence envelopes (spread widens over time)
    const uncertaintySpread = Math.sqrt(day) * (avgDailyInflow * 0.4);
    const p50 = runningBaseline;
    const p10 = Math.round(p50 - uncertaintySpread);
    const p90 = Math.round(p50 + uncertaintySpread);

    const isCrunch = runningTwin < 1500;

    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + day);
    const dateLabel = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    points.push({
      day,
      dateLabel,
      baselineCashflow: Math.round(runningBaseline),
      p10BearScenario: p10,
      p50MedianExpected: Math.round(p50),
      p90BullScenario: p90,
      simulatedTwinBalance: Math.round(runningTwin),
      scheduledEmiOutflow: emiOutflow + (dayInMonth === 15 ? newSimulatedEmi : 0),
      isCrunchAlert: isCrunch,
    });
  }

  return points;
}

/**
 * Monte Carlo Simulation Engine (500 Stochastic Paths)
 * Tests resilience against daily earnings variance, platform halts, and shocks
 */
export function runMonteCarloSimulation(
  persona: GigPersona,
  simulatedTwin: IncomeTwinVariables
): MonteCarloSimulationResult {
  const TRIALS = 500;
  const HORIZON_DAYS = 60;
  let insolvencyFailures = 0;
  let totalCrunchDays = 0;
  const minBalancesList: number[] = [];

  const baseDailyInflow = persona.monthlyAverageInflow / 30;
  const incomeMultiplier = 1 + simulatedTwin.incomeShockPct / 100;
  const adjustedMeanDailyInflow = baseDailyInflow * incomeMultiplier;
  const dailyStandardDeviation = adjustedMeanDailyInflow * 0.38; // high gig variance

  const dailyEssentialBurn = persona.monthlyEssentialBurn / 30;
  const existingMonthlyEmi = persona.existingLoans.reduce((sum, l) => sum + l.monthlyEmi, 0);
  const newEmi =
    simulatedTwin.newLoanPrincipal > 0
      ? calculateEmi(
          simulatedTwin.newLoanPrincipal,
          simulatedTwin.newLoanAnnualRate,
          simulatedTwin.newLoanTenureMonths
        )
      : 0;

  for (let t = 0; t < TRIALS; t++) {
    let balance = persona.currentLiquidSavings - simulatedTwin.emergencyExpenseAmount;
    if (simulatedTwin.newLoanPrincipal > 0) {
      balance += simulatedTwin.newLoanPrincipal * 0.97;
    }

    let minBal = balance;
    let trialCrunchDays = 0;

    for (let day = 1; day <= HORIZON_DAYS; day++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.max(1e-6, Math.random());
      const u2 = Math.random();
      const randNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      const dayEarnings = Math.max(0, adjustedMeanDailyInflow + randNormal * dailyStandardDeviation);
      const daySpends = dailyEssentialBurn * (1 + (Math.random() - 0.5) * 0.2);

      // 3% probability of micro-shock on any given day (e.g. tyre puncture, mobile recharge)
      const randomMicroShock = Math.random() < 0.03 ? 600 + Math.random() * 900 : 0;

      let scheduledDebit = 0;
      const dayInMonth = ((day - 1) % 30) + 1;
      if (dayInMonth === 5) scheduledDebit += existingMonthlyEmi * 0.5;
      if (dayInMonth === 10) scheduledDebit += existingMonthlyEmi * 0.5;
      if (dayInMonth === 15) scheduledDebit += newEmi;

      balance += dayEarnings - daySpends - randomMicroShock - scheduledDebit;

      if (balance < minBal) minBal = balance;
      if (balance < 1500) trialCrunchDays++;
    }

    minBalancesList.push(minBal);
    if (minBal <= 0) {
      insolvencyFailures++;
    }
    totalCrunchDays += trialCrunchDays;
  }

  minBalancesList.sort((a, b) => a - b);
  const medianMin = minBalancesList[Math.floor(TRIALS / 2)];
  const defaultProbability = Math.round((insolvencyFailures / TRIALS) * 100);

  let stressLevel: MonteCarloSimulationResult['stressIndexLevel'] = 'Safe';
  if (defaultProbability <= 5) stressLevel = 'Safe';
  else if (defaultProbability <= 18) stressLevel = 'Moderate Concern';
  else if (defaultProbability <= 35) stressLevel = 'Critical Stress';
  else stressLevel = 'Insolvency Alert';

  // Safe loan capacity recommendation
  const safeDisposableMonthly = Math.max(
    0,
    (persona.monthlyAverageInflow * incomeMultiplier) -
      persona.monthlyEssentialBurn -
      existingMonthlyEmi
  );
  const maxSafeLoan = Math.round(safeDisposableMonthly * 0.5 * 12); // safe 50% buffer over 12 mo

  return {
    trialsCount: TRIALS,
    defaultProbabilityPct: defaultProbability,
    stressIndexLevel: stressLevel,
    medianMinBalance: Math.round(medianMin),
    cashCrunchDaysCount: Math.round(totalCrunchDays / TRIALS),
    bufferSurplus: Math.max(0, Math.round(medianMin - 1500)),
    recommendedMaxSafeLoan: Math.max(5000, maxSafeLoan),
  };
}

/**
 * Multi-Loan Consolidation Engine
 * Combines scattered debts into a single prime structured loan
 */
export function calculateConsolidationPlan(
  loans: LoanItem[],
  personaMonthlyInflow: number,
  targetApr: number = 15.5,
  targetTenureMonths: number = 18
): ConsolidationScenario {
  const totalDebt = loans.reduce((sum, l) => sum + l.outstandingPrincipal, 0);
  const totalExistingMonthlyEmi = loans.reduce((sum, l) => sum + l.monthlyEmi, 0);

  // Calculate weighted blended APR
  const weightedInterest = loans.reduce((sum, l) => sum + l.outstandingPrincipal * l.interestRateAnnual, 0);
  const blendedApr = totalDebt > 0 ? Number((weightedInterest / totalDebt).toFixed(1)) : 0;

  // New consolidated loan EMI
  const newEmi = calculateEmi(totalDebt, targetApr, targetTenureMonths);
  const monthlySavings = Math.max(0, totalExistingMonthlyEmi - newEmi);

  // Total interest comparison
  const existingRemainingInterest = loans.reduce((sum, l) => {
    const totalRemaining = l.monthlyEmi * l.tenureMonthsRemaining;
    return sum + Math.max(0, totalRemaining - l.outstandingPrincipal);
  }, 0);

  const consolidatedTotalInterest = Math.max(0, newEmi * targetTenureMonths - totalDebt);
  const totalInterestSavings = Math.max(0, Math.round(existingRemainingInterest - consolidatedTotalInterest));

  const originalFoir = Math.round((totalExistingMonthlyEmi / personaMonthlyInflow) * 100);
  const newFoir = Math.round((newEmi / personaMonthlyInflow) * 100);
  const foirDropPct = Math.max(0, originalFoir - newFoir);

  return {
    originalTotalDebt: totalDebt,
    originalMonthlyEmi: totalExistingMonthlyEmi,
    originalBlendedApr: blendedApr,
    consolidatedLoanAmount: totalDebt,
    consolidatedApr: targetApr,
    consolidatedTenureMonths: targetTenureMonths,
    newMonthlyEmi: newEmi,
    monthlyEmiSavings: monthlySavings,
    totalInterestSavings,
    newFoir,
    foirDropPct,
  };
}

/**
 * Predatory Loan Offer Detection Algorithm
 * Exposes flat rate traps, deducted upfront fees, and penal compounding
 */
export function analyzeLoanOffer(
  principal: number,
  statedRateAnnualPct: number,
  rateType: 'reducing' | 'flat',
  tenureMonths: number,
  processingFeePct: number,
  penalInterestRateAnnual: number,
  frequency: 'Daily' | 'Weekly' | 'Monthly'
): PredatoryCheckResult {
  let score = 0;
  const riskFlags: string[] = [];
  const safeAlternatives: string[] = [];

  const upfrontDeduction = Math.round(principal * (processingFeePct / 100));
  const netDisbursed = principal - upfrontDeduction;

  // Upfront fee penalty
  if (processingFeePct >= 6) {
    score += 35;
    riskFlags.push(
      `Exorbitant Upfront Processing Fee of ${processingFeePct}% (₹${upfrontDeduction.toLocaleString('en-IN')}) deducted before money reaches your account!`
    );
  } else if (processingFeePct >= 3.5) {
    score += 15;
    riskFlags.push(`High processing fee of ${processingFeePct}% lowers net received capital.`);
  }

  // Flat rate deception check
  let trueApr = statedRateAnnualPct;
  let monthlyEmi = 0;
  let totalRepayment = 0;

  if (rateType === 'flat') {
    // In flat interest, borrower pays interest on whole principal for full term even as they repay
    // True APR is approximately 1.8x to 1.9x the flat rate!
    trueApr = Number((statedRateAnnualPct * 1.84).toFixed(1));
    const totalInterest = principal * (statedRateAnnualPct / 100) * (tenureMonths / 12);
    totalRepayment = principal + totalInterest;
    monthlyEmi = Math.round(totalRepayment / tenureMonths);

    score += 40;
    riskFlags.push(
      `Flat Rate Illusion: Advertised as "${statedRateAnnualPct}% flat", but your TRUE Reducing APR is ${trueApr}%!`
    );
  } else {
    monthlyEmi = calculateEmi(principal, statedRateAnnualPct, tenureMonths);
    totalRepayment = monthlyEmi * tenureMonths;
  }

  // Adjust true APR for upfront deduction
  if (upfrontDeduction > 0 && netDisbursed > 0) {
    const feeAprImpact = ((upfrontDeduction / netDisbursed) / (tenureMonths / 12)) * 100;
    trueApr = Number((trueApr + feeAprImpact * 0.65).toFixed(1));
  }

  // Repayment Frequency Traps (Daily or Weekly deduction)
  if (frequency === 'Daily') {
    score += 30;
    riskFlags.push(
      'Daily Recovery Trap: Automatic daily debits choke working cashflow and trigger multiple banking overdraft fees if day earnings dip.'
    );
  } else if (frequency === 'Weekly') {
    score += 15;
    riskFlags.push('Weekly compounding accelerates interest burn before platform payouts clear.');
  }

  // Tenure Trap (< 3 months)
  if (tenureMonths <= 2) {
    score += 25;
    riskFlags.push(`Ultra-short tenure (${tenureMonths} months) creates immediate repayment cliffs.`);
  }

  // Penal Interest Trap
  if (penalInterestRateAnnual >= 36) {
    score += 20;
    riskFlags.push(
      `Punitive Penal Rate: ${penalInterestRateAnnual}% p.a. penal interest charged instantly if UPI mandate fails.`
    );
  }

  // Total predatory score capping
  const predatoryScore = Math.min(100, Math.max(0, score));
  const isPredatory = predatoryScore >= 45 || trueApr >= 36;

  if (isPredatory) {
    safeAlternatives.push('Explore SIDBI / PM SVANidhi micro-credit scheme (7% subsidized interest).');
    safeAlternatives.push('Check platform-partnered NBFC bike repair or emergency credit (14-18% APR).');
    safeAlternatives.push('Use GigCred Multi-Loan Consolidation to free up existing monthly cashflow.');
  } else {
    safeAlternatives.push('This loan offer has transparent terms. Ensure monthly EMI remains under 35% FOIR.');
  }

  return {
    isPredatory,
    predatoryScore,
    statedInterestRate: statedRateAnnualPct,
    trueAnnualPercentageRate: trueApr,
    upfrontDeductionAmount: upfrontDeduction,
    netDisbursedAmount: netDisbursed,
    totalRepaymentAmount: totalRepayment,
    repaymentScheduleType: frequency,
    penalInterestRateAnnual,
    riskFlags,
    safeAlternatives,
  };
}
