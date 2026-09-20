import { IndianLanguage } from '../types';

export interface Translations {
  // Navigation & Branding
  brandTagline: string;
  workerHub: string;
  b2bCockpit: string;
  uploadStatement: string;
  securityDocAI: string;
  securityKMS: string;
  securityXGBoost: string;
  monteCarloTag: string;

  // Tabs
  tabOverview: string;
  tabConsolidate: string;
  tabPredatory: string;
  tabAssistant: string;
  tabB2B: string;

  // Scorecard
  scoreTitle: string;
  scoreSubtitle: string;
  calculatedWithoutCibil: string;
  currentRating: string;
  scoreRange: string;
  simulatedScore: string;
  primeWorker: string;
  nearPrime: string;
  watchlist: string;
  highRisk: string;
  percentileRank: string;
  monthlyInflow: string;
  debtFOIR: string;
  liquidRunway: string;
  bounceRisk: string;
  days: string;
  zeroBounces: string;
  shapDriversTitle: string;
  shapDriversSubtitle: string;
  positiveFactor: string;
  riskFactor: string;
  targetBenchmark: string;
  actionToImprove: string;

  // Income Twin Simulator
  twinTitle: string;
  twinSubtitle: string;
  resetSim: string;
  simActiveBadge: string;
  newLoanPrincipal: string;
  loanTenure: string;
  months: string;
  annualInterestRate: string;
  incomeShock: string;
  incomeShockDesc: string;
  emergencyExpense: string;
  creditCardBill: string;
  enableSecondLoan: string;
  secondLoanPrincipal: string;
  monteCarloStressTitle: string;
  monteCarloStressSub: string;
  defaultProbability: string;
  insolvencyRisk: string;
  maxSafeBorrowing: string;
  lowRisk: string;
  moderateRisk: string;
  criticalRisk: string;

  // Forecast
  forecastTitle: string;
  forecastSubtitle: string;
  timeframe30: string;
  timeframe60: string;
  timeframe90: string;
  medianExpected: string;
  bearCase: string;
  bullCase: string;
  twinTrajectory: string;
  scheduledEmiDay: string;
  weekendPayout: string;
  cashCrunchAlert: string;

  // Consolidator
  consolidateTitle: string;
  consolidateSubtitle: string;
  activeDebts: string;
  addNewLoan: string;
  originalTotalOutflow: string;
  blendedRate: string;
  consolidationOffer: string;
  newMonthlyEmi: string;
  monthlySavings: string;
  applyToTwin: string;
  debtReductionNotice: string;

  // Predatory Detector
  predatoryTitle: string;
  predatorySubtitle: string;
  statedFlatRate: string;
  hiddenProcessingFee: string;
  computedTrueApr: string;
  threatLevel: string;
  warningSignals: string;
  safeAlternatives: string;
  checkLoanButton: string;

  // Vernacular Assistant
  assistantTitle: string;
  assistantSubtitle: string;
  welcomeGreeting: string;
  quickPromptsLabel: string;
  askPlaceholder: string;
  listeningNow: string;
  speakPrompt: string;
  sendPrompt: string;
  listenAudio: string;
  stopAudio: string;
  riskVerdict: string;
  keyReasoning: string;
  actionRoadmap: string;

  // Transactions & Statement
  transactionsTitle: string;
  transactionsSubtitle: string;
  searchTxnPlaceholder: string;
  allFilter: string;
  payoutsFilter: string;
  debitsFilter: string;
  emisFilter: string;
  dateCol: string;
  descCol: string;
  categoryCol: string;
  channelCol: string;
  amountCol: string;
  balanceCol: string;

  // Statement Uploader Modal
  uploadModalTitle: string;
  uploadModalSubtitle: string;
  dropFileNotice: string;
  ocrProcessingBadge: string;
  dlpRedactionNotice: string;
  closeBtn: string;
  processStatementBtn: string;

  // Institutional B2B
  b2bTitle: string;
  b2bSubtitle: string;
  dscrMetric: string;
  volatilityIndex: string;
  sanctionVerdict: string;
  sanctionApproved: string;
  sanctionConditional: string;
  sanctionRejected: string;

  // Footer
  footerPlatform: string;
  footerCompliance: string;
}

export const TRANSLATIONS: Record<IndianLanguage, Translations> = {
  en: {
    brandTagline: 'Explainable Cashflow Intelligence for Gig Workers & Freelancers',
    workerHub: 'Worker Financial Hub',
    b2bCockpit: 'B2B Lender Cockpit',
    uploadStatement: 'Upload Statement',
    securityDocAI: 'Google Document AI & DLP Active',
    securityKMS: 'KMS AES-256 HSM Redacted',
    securityXGBoost: 'XGBoost + SHAP Explainability Engine',
    monteCarloTag: '500 Monte Carlo Paths',

    tabOverview: 'Cashflow & Income Twin',
    tabConsolidate: 'Debt Consolidator',
    tabPredatory: 'Predatory Loan Detector',
    tabAssistant: 'Vernacular AI Voice Assistant',
    tabB2B: 'Institutional Underwriting',

    scoreTitle: 'Gig Cashflow Credit Health Score',
    scoreSubtitle: 'Alternative explainable underwriting based on verified cashflow dynamics',
    calculatedWithoutCibil: 'Calculated without CIBIL dependency using real-time UPI and platform ledger velocity.',
    currentRating: 'Current Rating',
    scoreRange: 'Score Range: 300 - 900',
    simulatedScore: 'Projected Simulated Score',
    primeWorker: 'Prime Cashflow Tier',
    nearPrime: 'Healthy / Near-Prime',
    watchlist: 'Watchlist / Sensitive',
    highRisk: 'High Risk / Overleveraged',
    percentileRank: 'Top percentile among gig workers in this category',
    monthlyInflow: 'Monthly Verified Inflow',
    debtFOIR: 'Debt FOIR (EMI Burden)',
    liquidRunway: 'Liquid Runway Buffer',
    bounceRisk: 'NACH / UPI Bounce Risk',
    days: 'Days',
    zeroBounces: '0 Bounces in 90 Days',
    shapDriversTitle: 'XGBoost SHAP Factor Drivers',
    shapDriversSubtitle: 'Exact algorithmic variables influencing this credit score',
    positiveFactor: 'Positive Factor',
    riskFactor: 'Risk Factor',
    targetBenchmark: 'Target Benchmark',
    actionToImprove: 'Action to Improve',

    twinTitle: 'The Income Twin™ Simulation Sandbox',
    twinSubtitle: 'Simulate financial shocks, new loans, or earnings drops before borrowing',
    resetSim: 'Reset Simulation',
    simActiveBadge: 'Active Simulation Running',
    newLoanPrincipal: 'New Loan Principal Amount',
    loanTenure: 'Loan Tenure',
    months: 'Months',
    annualInterestRate: 'Annual Interest Rate (APR %)',
    incomeShock: 'Income Shock / Earnings Volatility',
    incomeShockDesc: 'Simulate off-peak seasons, fuel spikes, or platform incentive changes',
    emergencyExpense: 'Emergency Liquid Shock (Medical/Repairs)',
    creditCardBill: 'Extra Credit Card / BNPL Bill',
    enableSecondLoan: 'Simulate Concurrent Second Loan',
    secondLoanPrincipal: 'Second Loan Principal',
    monteCarloStressTitle: 'Monte Carlo Stress Test (500 Stochastic Paths)',
    monteCarloStressSub: 'Simulating income variance and daily cash balance fluctuations',
    defaultProbability: 'Default Probability',
    insolvencyRisk: 'Insolvency Risk',
    maxSafeBorrowing: 'Max Safe Additional Borrowing',
    lowRisk: 'Safe / Low Stress',
    moderateRisk: 'Caution / Moderate Stress',
    criticalRisk: 'High Risk / Severe Stress',

    forecastTitle: 'Forward Cashflow & Liquidity Forecast',
    forecastSubtitle: 'Dynamic 30 to 90-day cash balance projections with volatility envelopes',
    timeframe30: '30-Day Outlook',
    timeframe60: '60-Day Outlook',
    timeframe90: '90-Day Outlook',
    medianExpected: 'Expected Median Inflow',
    bearCase: 'Bear-Case Slump (P10)',
    bullCase: 'Bull-Case Surge (P90)',
    twinTrajectory: 'Simulated Income Twin Trajectory',
    scheduledEmiDay: 'Scheduled EMI Auto-Debit',
    weekendPayout: 'Weekend Platform Payout',
    cashCrunchAlert: 'Projected Cash Crunch Alert',

    consolidateTitle: 'Multi-Debt Consolidation & Restructuring Simulator',
    consolidateSubtitle: 'Consolidate fragmented high-interest loans into a single prime structured EMI',
    activeDebts: 'Active Loan Portfolio',
    addNewLoan: 'Add Another Loan',
    originalTotalOutflow: 'Current Total Monthly EMI Outflow',
    blendedRate: 'Blended Average Interest Rate',
    consolidationOffer: 'Simulated Single Prime Consolidation Offer',
    newMonthlyEmi: 'New Single Monthly EMI',
    monthlySavings: 'Monthly Cashflow Freed',
    applyToTwin: 'Apply to Income Twin Simulation',
    debtReductionNotice: 'Restructuring replaces high-APR instant apps with a regulated NBFC loan.',

    predatoryTitle: 'Predatory & Illegal Loan App Detector',
    predatorySubtitle: 'Exposing hidden upfront processing cuts, inflated flat rates, and illegal APR traps',
    statedFlatRate: 'Stated Flat Interest Rate (% / month)',
    hiddenProcessingFee: 'Deducted Upfront Processing Fee (%)',
    computedTrueApr: 'Computed True Annual Percentage Rate (APR)',
    threatLevel: 'Predatory Threat Score',
    warningSignals: 'Identified Red Flags & Deceptive Terms',
    safeAlternatives: 'Regulated Safe Borrowing Alternatives',
    checkLoanButton: 'Analyze Loan Terms',

    assistantTitle: 'Vernacular AI Financial Assistant',
    assistantSubtitle: 'Ask in your native language via voice or text with instant mathematical guidance',
    welcomeGreeting: 'Hello! I am your GigCred AI Financial Mentor. Ask me anything in your preferred language about loan safety, EMI affordability, or your credit roadmap.',
    quickPromptsLabel: 'Quick Question Prompts',
    askPlaceholder: 'Ask in English or speak via microphone...',
    listeningNow: 'Listening to your voice...',
    speakPrompt: 'Speak to Assistant',
    sendPrompt: 'Send Question',
    listenAudio: 'Listen to Voice Advice',
    stopAudio: 'Stop Audio',
    riskVerdict: 'Safety Verdict',
    keyReasoning: 'Cashflow Reasoning',
    actionRoadmap: 'Credit Building Action',

    transactionsTitle: 'Verified UPI & Bank Inflow Ledger',
    transactionsSubtitle: 'Extracted and validated via Google Document AI with zero PII retention',
    searchTxnPlaceholder: 'Search transactions by description or channel...',
    allFilter: 'All Ledger Entries',
    payoutsFilter: 'Platform Payouts',
    debitsFilter: 'Expenses & Debits',
    emisFilter: 'EMI Auto-Debits',
    dateCol: 'Date',
    descCol: 'Description',
    categoryCol: 'Category',
    channelCol: 'Channel / VPA',
    amountCol: 'Amount (₹)',
    balanceCol: 'Balance After',

    uploadModalTitle: 'Upload Bank or UPI Statement',
    uploadModalSubtitle: 'Powered by Google Document AI OCR and Cloud DLP Redaction',
    dropFileNotice: 'Drag and drop your PDF bank statement or click to browse',
    ocrProcessingBadge: 'Document AI OCR Extractor Ready',
    dlpRedactionNotice: 'Aadhaar, PAN, and Account numbers will be redacted before analysis.',
    closeBtn: 'Cancel',
    processStatementBtn: 'Process Statement',

    b2bTitle: 'Institutional B2B Underwriter Cockpit',
    b2bSubtitle: 'Bank and NBFC institutional credit appraisal console with alternative cashflow scoring',
    dscrMetric: 'Debt Service Coverage Ratio (DSCR)',
    volatilityIndex: 'Daily Cashflow Volatility Index',
    sanctionVerdict: 'Algorithmic Underwriting Recommendation',
    sanctionApproved: 'Pre-Approved for Prime Credit',
    sanctionConditional: 'Conditional Sanction with Escrow',
    sanctionRejected: 'Decline / Overleveraged',

    footerPlatform: 'GigCred Financial Intelligence Platform',
    footerCompliance: 'Consent-based • Zero PII Retention • KMS HSM AES-256 Protected',
  },

  hi: {
    brandTagline: 'गिग वर्कर्स और फ्रीलांसरों के लिए व्याख्यात्मक कैशफ्लो क्रेडिट इंटेलिजेंस',
    workerHub: 'गिग वर्कर हब',
    b2bCockpit: 'B2B ऋणदाता कॉकपिट',
    uploadStatement: 'स्टेटमेंट अपलोड करें',
    securityDocAI: 'गूगल डॉक्यूमेंट AI और DLP सक्रिय',
    securityKMS: 'KMS AES-256 HSM सुरक्षित',
    securityXGBoost: 'XGBoost + SHAP स्पष्टीकरण इंजन',
    monteCarloTag: '500 मोंटे कार्लो पाथ',

    tabOverview: 'कैशफ्लो और इनकम ट्विन',
    tabConsolidate: 'ऋण समेकन (Consolidate)',
    tabPredatory: 'धोखाधड़ी लोन डिटेक्टर',
    tabAssistant: 'AI वॉइस असिस्टेंट',
    tabB2B: 'संस्थागत हामीदारी (B2B)',

    scoreTitle: 'गिग कैशफ्लो क्रेडिट हेल्थ स्कोर',
    scoreSubtitle: 'सत्यापित यूपीआई और प्लेटफॉर्म आय पर आधारित वैकल्पिक ऋण स्कोर',
    calculatedWithoutCibil: 'पारंपरिक CIBIL के बिना वास्तविक समय के UPI और प्लेटफॉर्म लेजर से गणना की गई।',
    currentRating: 'वर्तमान रेटिंग',
    scoreRange: 'स्कोर रेंज: 300 - 900',
    simulatedScore: 'अनुमानित सिम्युलेटेड स्कोर',
    primeWorker: 'प्राइम कैशफ्लो स्तर',
    nearPrime: 'स्वस्थ / नियर-प्राइम',
    watchlist: 'संवेदनशील / वॉचलिस्ट',
    highRisk: 'उच्च जोखिम / अधिक कर्ज',
    percentileRank: 'इस श्रेणी के गिग श्रमिकों में शीर्ष प्रतिशत',
    monthlyInflow: 'मासिक सत्यापित कमाई',
    debtFOIR: 'ऋण FOIR (EMI का भार)',
    liquidRunway: 'सुरक्षा बचत रनवे',
    bounceRisk: 'NACH / UPI बाउंस जोखिम',
    days: 'दिन',
    zeroBounces: '90 दिनों में 0 बाउंस',
    shapDriversTitle: 'XGBoost SHAP मुख्य कारक',
    shapDriversSubtitle: 'इस क्रेडिट स्कोर को प्रभावित करने वाले सटीक घटक',
    positiveFactor: 'सकारात्मक कारक',
    riskFactor: 'जोखिम कारक',
    targetBenchmark: 'लक्षित मानक',
    actionToImprove: 'सुधार के उपाय',

    twinTitle: 'इनकम ट्विन™ सिमुलेशन सैंडबॉक्स',
    twinSubtitle: 'कर्ज लेने से पहले आय में गिरावट या वित्तीय झटकों का परीक्षण करें',
    resetSim: 'रीसेट सिमुलेशन',
    simActiveBadge: 'सक्रिय सिमुलेशन चालू है',
    newLoanPrincipal: 'नए लोन की मूल राशि',
    loanTenure: 'लोन की अवधि',
    months: 'महीने',
    annualInterestRate: 'वार्षिक ब्याज दर (APR %)',
    incomeShock: 'आय में गिरावट / कमाई में अस्थिरता',
    incomeShockDesc: 'ऑफ-पीक सीजन, पेट्रोल खर्च में वृद्धि या कमाई में कमी का परीक्षण करें',
    emergencyExpense: 'आकस्मिक आपातकालीन खर्च (चिकित्सा/मरम्मत)',
    creditCardBill: 'क्रेडिट कार्ड / पे-लेटर बिल',
    enableSecondLoan: 'एक साथ दूसरा लोन जोड़ें',
    secondLoanPrincipal: 'दूसरे लोन की मूल राशि',
    monteCarloStressTitle: 'मोंटे कार्लो तनाव परीक्षण (500 सिमुलेशन)',
    monteCarloStressSub: 'दैनिक कमाई के उतार-चढ़ाव और नकदी शेष का तनाव परीक्षण',
    defaultProbability: 'डिफ़ॉल्ट होने की संभावना',
    insolvencyRisk: 'दिवालियापन जोखिम',
    maxSafeBorrowing: 'अधिकतम सुरक्षित अतिरिक्त कर्ज',
    lowRisk: 'सुरक्षित / कम तनाव',
    moderateRisk: 'सावधानी / मध्यम तनाव',
    criticalRisk: 'अत्यधिक जोखिम / गंभीर तनाव',

    forecastTitle: 'भविष्य का कैशफ्लो और तरलता पूर्वानुमान',
    forecastSubtitle: '30 से 90 दिनों का गतिशील नकदी प्रवाह पूर्वानुमान',
    timeframe30: '30 दिन का दृष्टिकोण',
    timeframe60: '60 दिन का दृष्टिकोण',
    timeframe90: '90 दिन का दृष्टिकोण',
    medianExpected: 'अपेक्षित सामान्य आय',
    bearCase: 'मंदी की स्थिति (P10)',
    bullCase: 'उच्च कमाई स्थिति (P90)',
    twinTrajectory: 'सिम्युलेटेड इनकम ट्विन प्रक्षेपवक्र',
    scheduledEmiDay: 'अनुसूचित EMI कटने का दिन',
    weekendPayout: 'सप्ताहांत प्लेटफॉर्म भुगतान',
    cashCrunchAlert: 'नकदी की कमी की चेतावनी',

    consolidateTitle: 'बहु-ऋण समेकन और पुनर्गठन सिम्युलेटर',
    consolidateSubtitle: 'कई महंगे कर्जों को एक कम ब्याज वाली सुरक्षित EMI में बदलें',
    activeDebts: 'वर्तमान सक्रिय ऋण',
    addNewLoan: 'अन्य लोन जोड़ें',
    originalTotalOutflow: 'वर्तमान कुल मासिक EMI भुगतान',
    blendedRate: 'औसत मिश्रित ब्याज दर',
    consolidationOffer: 'प्रस्तावित एकल समेकित ऋण प्रस्ताव',
    newMonthlyEmi: 'नई एकल मासिक EMI',
    monthlySavings: 'मासिक नकद बचत',
    applyToTwin: 'इनकम ट्विन सिमुलेशन में लागू करें',
    debtReductionNotice: 'यह पुनर्गठन महंगे इंस्टेंट ऐप्स को एक विनियमित NBFC ऋण से बदल देता है।',

    predatoryTitle: 'धोखाधड़ी और अवैध लोन ऐप डिटेक्टर',
    predatorySubtitle: 'छुपे हुए प्रोसेसिंग शुल्क, भ्रामक फ्लैट दरों और अवैध APR जाल को उजागर करें',
    statedFlatRate: 'दिखाई गई फ्लैट ब्याज दर (% / माह)',
    hiddenProcessingFee: 'काटी गई अग्रिम प्रोसेसिंग फीस (%)',
    computedTrueApr: 'वास्तविक वार्षिक प्रतिशत दर (True APR)',
    threatLevel: 'धोखाधड़ी खतरा स्कोर',
    warningSignals: 'पहचाने गए जोखिम संकेत और भ्रामक शर्तें',
    safeAlternatives: 'विनियमित सुरक्षित ऋण विकल्प',
    checkLoanButton: 'ऋण शर्तों का विश्लेषण करें',

    assistantTitle: 'स्थानीय भाषा AI वित्तीय सहायक',
    assistantSubtitle: 'अपनी मातृभाषा में बोलकर या लिखकर तुरंत वित्तीय मार्गदर्शन प्राप्त करें',
    welcomeGreeting: 'नमस्ते! मैं आपका GigCred AI वित्तीय मार्गदर्शक हूँ। आप अपनी भाषा में मुझसे नए लोन, EMI और अपने क्रेडिट सुधार के बारे में पूछ सकते हैं।',
    quickPromptsLabel: 'त्वरित प्रश्न सुझाव',
    askPlaceholder: 'हिन्दी में पूछें या माइक से बोलें...',
    listeningNow: 'आपकी आवाज़ सुनी जा रही है...',
    speakPrompt: 'सहायक से बोलें',
    sendPrompt: 'प्रश्न भेजें',
    listenAudio: 'आवाज़ में सुनें',
    stopAudio: 'ऑडियो रोकें',
    riskVerdict: 'सुरक्षा निर्णय',
    keyReasoning: 'कैशफ्लो विश्लेषण',
    actionRoadmap: 'क्रेडिट निर्माण कदम',

    transactionsTitle: 'सत्यापित यूपीआई और बैंक लेजर',
    transactionsSubtitle: 'गूगल डॉक्यूमेंट AI द्वारा निष्कर्षित और गोपनीय डेटा सुरक्षित',
    searchTxnPlaceholder: 'विवरण या चैनल से लेनदेन खोजें...',
    allFilter: 'सभी लेनदेन',
    payoutsFilter: 'प्लेटफॉर्म भुगतान',
    debitsFilter: 'खर्च और डेबिट',
    emisFilter: 'EMI कटौती',
    dateCol: 'तारीख',
    descCol: 'विवरण',
    categoryCol: 'श्रेणी',
    channelCol: 'माध्यम / VPA',
    amountCol: 'राशि (₹)',
    balanceCol: 'शेष राशि',

    uploadModalTitle: 'बैंक या यूपीआई स्टेटमेंट अपलोड करें',
    uploadModalSubtitle: 'गूगल डॉक्यूमेंट AI OCR और क्लाउड DLP द्वारा सुरक्षित',
    dropFileNotice: 'अपनी PDF बैंक स्टेटमेंट यहाँ खींचें या फाइल चुनें',
    ocrProcessingBadge: 'डॉक्यूमेंट AI OCR निष्कर्षण तैयार',
    dlpRedactionNotice: 'आधार, पैन और बैंक खाता नंबर स्वचालित रूप से हटा दिए जाएंगे।',
    closeBtn: 'रद्द करें',
    processStatementBtn: 'स्टेटमेंट प्रोसेस करें',

    b2bTitle: 'संस्थागत B2B ऋणदाता कॉकपिट',
    b2bSubtitle: 'बैंक और NBFC के लिए कैशफ्लो आधारित वैकल्पिक अंडरराइटिंग कंसोल',
    dscrMetric: 'कर्ज सेवा कवरेज अनुपात (DSCR)',
    volatilityIndex: 'दैनिक कैशफ्लो अस्थिरता सूचकांक',
    sanctionVerdict: 'एल्गोरिथम ऋण स्वीकृति अनुशंसा',
    sanctionApproved: 'प्राइम क्रेडिट के लिए पूर्व-स्वीकृत',
    sanctionConditional: 'एस्क्रो के साथ सशर्त स्वीकृति',
    sanctionRejected: 'अस्वीकृत / अत्यधिक कर्ज',

    footerPlatform: 'GigCred वित्तीय इंटेलिजेंस प्लेटफॉर्म',
    footerCompliance: 'सहमति-आधारित • शून्य व्यक्तिगत डेटा प्रतिधारण • KMS HSM सुरक्षित',
  },

  ta: {
    brandTagline: 'கிக் தொழிலாளர்களுக்கான பணப்புழக்க கடன் நுண்ணறிவு',
    workerHub: 'தொழிலாளர் நிதி மையம்',
    b2bCockpit: 'B2B கடன் வழங்குநர் காக்பிட்',
    uploadStatement: 'ஸ்டேட்மென்ட் பதிவேற்றவும்',
    securityDocAI: 'கூகிள் டாகுமெண்ட் AI & DLP செயலில்',
    securityKMS: 'KMS AES-256 HSM பாதுகாப்பானது',
    securityXGBoost: 'XGBoost + SHAP விளக்க இயந்திரம்',
    monteCarloTag: '500 மான்டே கார்லோ வழிகள்',

    tabOverview: 'பணப்புழக்கம் & வருமான இரட்டை',
    tabConsolidate: 'கடன் ஒருங்கிணைப்பு',
    tabPredatory: 'மோசடி கடன் கண்டறிதல்',
    tabAssistant: 'AI குரல் உதவியாளர்',
    tabB2B: 'நிறுவன மதிப்பீடு (B2B)',

    scoreTitle: 'கிக் பணப்புழக்க கடன் ஆரோக்கிய மதிப்பெண்',
    scoreSubtitle: 'சரிபார்க்கப்பட்ட UPI பணப்புழக்கத்தை அடிப்படையாகக் கொண்ட மாற்று கடன் மதிப்பெண்',
    calculatedWithoutCibil: 'வழக்கமான CIBIL இல்லாமல் நிகழ்நேர UPI மற்றும் வருமான அடிப்படையில் கணக்கிடப்பட்டது.',
    currentRating: 'தற்போதைய மதிப்பீடு',
    scoreRange: 'மதிப்பெண் வரம்பு: 300 - 900',
    simulatedScore: 'திட்டமிடப்பட்ட மதிப்பெண்',
    primeWorker: 'முதன்மை நிலை (Prime)',
    nearPrime: 'நலமான நிலை (Near-Prime)',
    watchlist: 'கண்காணிப்பு நிலை',
    highRisk: 'அதிக ஆபத்து / அதிக கடன்',
    percentileRank: 'கிக் தொழிலாளர்களில் சிறந்த சதவீதம்',
    monthlyInflow: 'மாதாந்திர சரிபார்க்கப்பட்ட வருமானம்',
    debtFOIR: 'கடன் FOIR (EMI சுமை)',
    liquidRunway: 'பாதுகாப்பு சேமிப்பு காலம்',
    bounceRisk: 'NACH / UPI பவுன்ஸ் அபாயம்',
    days: 'நாட்கள்',
    zeroBounces: '90 நாட்களில் 0 பவுன்ஸ்',
    shapDriversTitle: 'XGBoost SHAP முக்கிய காரணிகள்',
    shapDriversSubtitle: 'இந்த கடன் மதிப்பெண்ணை பாதிக்கும் முக்கிய மாறிகள்',
    positiveFactor: 'நேர்மறை காரணி',
    riskFactor: 'ஆபத்து காரணி',
    targetBenchmark: 'இலக்கு அளவு',
    actionToImprove: 'மேம்படுத்த நடவடிக்கை',

    twinTitle: 'வருமான இரட்டை™ (Income Twin) உருவகப்படுத்துதல்',
    twinSubtitle: 'கடன் வாங்குவதற்கு முன் நிதி நெருக்கடிகள் அல்லது வருமான வீழ்ச்சியை சோதிக்கவும்',
    resetSim: 'மீட்டமைக்கவும்',
    simActiveBadge: 'சோதனை செயலில் உள்ளது',
    newLoanPrincipal: 'புதிய கடன் அசல் தொகை',
    loanTenure: 'கடன் காலம்',
    months: 'மாதங்கள்',
    annualInterestRate: 'ஆண்டு வட்டி விகிதம் (APR %)',
    incomeShock: 'வருமான இழப்பு / ஏற்ற இறக்கம்',
    incomeShockDesc: 'மழைக்காலம், எரிபொருள் உயர்வு அல்லது வருமானக் குறைவை சோதிக்கவும்',
    emergencyExpense: 'அவசர செலவு (மருத்துவம்/பழுது)',
    creditCardBill: 'கூடுதல் கிரெடிட் கார்டு / BNPL பில்',
    enableSecondLoan: 'இரண்டாவது கடனை சேர்க்கவும்',
    secondLoanPrincipal: 'இரண்டாவது கடன் அசல்',
    monteCarloStressTitle: 'மான்டே கார்லோ அழுத்த சோதனை (500 வழிகள்)',
    monteCarloStressSub: 'தினசரி பணப்புழக்க ஏற்ற இறக்கங்களின் உருவகப்படுத்துதல்',
    defaultProbability: 'கடன் தவறும் வாய்ப்பு',
    insolvencyRisk: 'திவால் அபாயம்',
    maxSafeBorrowing: 'அதிகபட்ச பாதுகாப்பான கூடுதல் கடன்',
    lowRisk: 'பாதுகாப்பானது / குறைந்த அழுத்தம்',
    moderateRisk: 'எச்சரிக்கை / மிதமான அழுத்தம்',
    criticalRisk: 'அதிக ஆபத்து / கடுமையான அழுத்தம்',

    forecastTitle: 'எதிர்கால பணப்புழக்க முன்னறிவிப்பு',
    forecastSubtitle: '30 முதல் 90 நாட்கள் வரையிலான பணப்புழக்க கணிப்பு',
    timeframe30: '30 நாட்கள் பார்வை',
    timeframe60: '60 நாட்கள் பார்வை',
    timeframe90: '90 நாட்கள் பார்வை',
    medianExpected: 'எதிர்பார்க்கப்படும் சராசரி வருமானம்',
    bearCase: 'மந்தநிலை (P10)',
    bullCase: 'உயர் வருவாய் (P90)',
    twinTrajectory: 'வருமான இரட்டைப் பாதை',
    scheduledEmiDay: 'திட்டமிடப்பட்ட EMI பிடித்த நாள்',
    weekendPayout: 'வார இறுதி தள செலுத்துகை',
    cashCrunchAlert: 'பணத் தட்டுப்பாடு எச்சரிக்கை',

    consolidateTitle: 'பல கடன்கள் ஒருங்கிணைப்பு சிமுலேட்டர்',
    consolidateSubtitle: 'அதிக வட்டி கொண்ட பல கடன்களை ஒரே குறைந்த வட்டி EMI ஆக மாற்றவும்',
    activeDebts: 'செயலில் உள்ள கடன்கள்',
    addNewLoan: 'மற்றொரு கடன் சேர்க்க',
    originalTotalOutflow: 'தற்போதைய மொத்த மாதாந்திர EMI',
    blendedRate: 'சராசரி கலப்பு வட்டி விகிதம்',
    consolidationOffer: 'ஒற்றை ஒருங்கிணைந்த கடன் சலுகை',
    newMonthlyEmi: 'புதிய மாதாந்திர EMI',
    monthlySavings: 'மாதாந்திர பண சேமிப்பு',
    applyToTwin: 'வருமான இரட்டையில் சேர்க்கவும்',
    debtReductionNotice: 'இது ஆபத்தான இன்ஸ்டன்ட் ஆப்களை மாற்றி ஒழுங்குபடுத்தப்பட்ட NBFC கடனாக மாற்றுகிறது.',

    predatoryTitle: 'மோசடி & சட்டவிரோத கடன் பயன்பாடுகள் கண்டறிதல்',
    predatorySubtitle: 'மறைக்கப்பட்ட செயலாக்க கட்டணங்கள் மற்றும் ஏமாற்று வட்டி பொறிகளை வெளிப்படுத்துங்கள்',
    statedFlatRate: 'கூறப்பட்ட தட்டையான வட்டி விகிதம் (% / மாதம்)',
    hiddenProcessingFee: 'பிடித்தம் செய்யப்பட்ட கட்டணம் (%)',
    computedTrueApr: 'உண்மையான வருடாந்திர வட்டி விகிதம் (True APR)',
    threatLevel: 'மோசடி அச்சுறுத்தல் மதிப்பெண்',
    warningSignals: 'கண்டறியப்பட்ட ஆபத்து சமிக்ஞைகள்',
    safeAlternatives: 'பாதுகாப்பான கடன் மாற்றுகள்',
    checkLoanButton: 'கடன் விதிமுறைகளை பகுப்பாய்வு செய்க',

    assistantTitle: 'தமிழ் AI நிதி உதவியாளர்',
    assistantSubtitle: 'உங்கள் தாய்மொழியில் பேசி அல்லது தட்டச்சு செய்து உடனடி நிதி வழிகாட்டல் பெறுங்கள்',
    welcomeGreeting: 'வணக்கம்! நான் உங்கள் GigCred AI நிதி வழிகாட்டி. புதிய கடன் பாதுகாப்பு, EMI மேலாண்மை அல்லது கிரெடிட் மேம்பாடு பற்றி என்னிடம் தமிழில் கேட்கலாம்.',
    quickPromptsLabel: 'விரைவு கேள்வி பரிந்துரைகள்',
    askPlaceholder: 'தமிழில் கேட்கவும் அல்லது பேசவும்...',
    listeningNow: 'உங்கள் குரலைக் கேட்கிறது...',
    speakPrompt: 'உதவியாளரிடம் பேசுங்கள்',
    sendPrompt: 'கேள்வி அனுப்புக',
    listenAudio: 'குரலில் கேளுங்கள்',
    stopAudio: 'ஆடியோவை நிறுத்துங்கள்',
    riskVerdict: 'பாதுகாப்பு தீர்ப்பு',
    keyReasoning: 'பணப்புழக்க பகுப்பாய்வு',
    actionRoadmap: 'கடன் மேம்பாட்டு நடவடிக்கை',

    transactionsTitle: 'சரிபார்க்கப்பட்ட UPI & வங்கி பரிவர்த்தனை பட்டியல்',
    transactionsSubtitle: 'கூகிள் டாகுமெண்ட் AI மூலம் பாதுகாப்பாக பிரித்தெடுக்கப்பட்டது',
    searchTxnPlaceholder: 'பரிவர்த்தனைகளைத் தேடவும்...',
    allFilter: 'அனைத்து பரிவர்த்தனைகள்',
    payoutsFilter: 'தள வருமானங்கள்',
    debitsFilter: 'செலவுகள் & பற்று',
    emisFilter: 'EMI பிடித்தங்கள்',
    dateCol: 'தேதி',
    descCol: 'விளக்கம்',
    categoryCol: 'வகை',
    channelCol: 'சேனல் / VPA',
    amountCol: 'தொகை (₹)',
    balanceCol: 'மீதித் தொகை',

    uploadModalTitle: 'வங்கி அல்லது UPI ஸ்டேட்மென்ட் பதிவேற்றவும்',
    uploadModalSubtitle: 'கூகிள் டாகுமெண்ட் AI OCR மற்றும் கிளவுட் DLP மூலம் பாதுகாப்பானது',
    dropFileNotice: 'உங்கள் PDF வங்கி அறிக்கையை இங்கே இழுத்துப் போடுங்கள்',
    ocrProcessingBadge: 'டாகுமெண்ட் AI OCR தயார்',
    dlpRedactionNotice: 'ஆதார், பான் மற்றும் கணக்கு எண்கள் தானாகவே மறைக்கப்படும்.',
    closeBtn: 'ரத்து செய்',
    processStatementBtn: 'அறிக்கையை செயலாக்குங்கள்',

    b2bTitle: 'நிறுவன B2B கடன் வழங்குநர் காக்பிட்',
    b2bSubtitle: 'வங்கிகள் மற்றும் NBFC-களுக்கான மாற்று பணப்புழக்க மதிப்பீட்டு தளம்',
    dscrMetric: 'கடன் சேவை பாதுகாப்பு விகிதம் (DSCR)',
    volatilityIndex: 'தினசரி பணப்புழக்க ஏற்ற இறக்க குறியீடு',
    sanctionVerdict: 'கடன் அனுமதி பரிந்துரை',
    sanctionApproved: 'முன்-அனுமதிக்கப்பட்டது (Prime)',
    sanctionConditional: 'நிபந்தனை அனுமதி',
    sanctionRejected: 'நிராகரிப்பு / அதிக கடன்',

    footerPlatform: 'GigCred நிதி நுண்ணறிவு தளம்',
    footerCompliance: 'ஒப்புதல் அடிப்படையிலானது • தனிப்பட்ட தரவு சேமிக்கப்படாது • KMS HSM பாதுகாப்பானது',
  },

  te: {
    brandTagline: 'గిగ్ వర్కర్ల కోసం వివరణాత్మక క్యాష్‌ఫ్లో క్రెడిట్ ఇంటెలిజెన్స్',
    workerHub: 'వర్కర్ ఫైనాన్షియల్ హబ్',
    b2bCockpit: 'B2B లెండర్ కాక్‌పిట్',
    uploadStatement: 'స్టేట్‌మెంట్ అప్‌లోడ్ చేయండి',
    securityDocAI: 'గూగుల్ డాక్యుమెంట్ AI & DLP యాక్టివ్',
    securityKMS: 'KMS AES-256 HSM భద్రత',
    securityXGBoost: 'XGBoost + SHAP ఇంజిన్',
    monteCarloTag: '500 మోంటే కార్లో పాత్‌లు',

    tabOverview: 'క్యాష్‌ఫ్లో & ఇన్‌కమ్ ట్విన్',
    tabConsolidate: 'రుణాల ఏకీకరణ (Consolidate)',
    tabPredatory: 'మోసపూరిత రుణాల డిటెక్టర్',
    tabAssistant: 'AI వాయిస్ అసిస్టెంట్',
    tabB2B: 'సంస్థాగత అండర్‌రైటింగ్ (B2B)',

    scoreTitle: 'గిగ్ క్యాష్‌ఫ్లో క్రెడిట్ హెల్త్ స్కోర్',
    scoreSubtitle: 'ధృవీకరించబడిన UPI మరియు ప్లాట్‌ఫారమ్ నగదు ప్రవాహం ఆధారంగా ప్రత్యామ్నాయ స్కోర్',
    calculatedWithoutCibil: 'సాంప్రదాయ CIBIL అవసరం లేకుండా రియల్-టైమ్ UPI డేటాతో లెక్కించబడింది.',
    currentRating: 'ప్రస్తుత రేటింగ్',
    scoreRange: 'స్కోర్ పరిధి: 300 - 900',
    simulatedScore: 'అంచనా వేసిన స్కోర్',
    primeWorker: 'ప్రైమ్ క్యాష్‌ఫ్లో స్థాయి',
    nearPrime: 'ఆరోగ్యకరమైన / నియర్-ప్రైమ్',
    watchlist: 'సున్నితమైన / వాచ్‌లిస్ట్',
    highRisk: 'అధిక ప్రమాదం / అధిక రుణాలు',
    percentileRank: 'గిగ్ వర్కర్లలో అగ్రశ్రేణి శాతం',
    monthlyInflow: 'నెలవారీ ధృవీకరించిన ఆదాయం',
    debtFOIR: 'రుణాల FOIR (EMI భారం)',
    liquidRunway: 'సేవింగ్స్ రన్‌వే బఫర్',
    bounceRisk: 'NACH / UPI బౌన్స్ రిస్క్',
    days: 'రోజులు',
    zeroBounces: '90 రోజుల్లో 0 బౌన్స్‌లు',
    shapDriversTitle: 'XGBoost SHAP కీలక అంశాలు',
    shapDriversSubtitle: 'ఈ క్రెడిట్ స్కోర్‌ను ప్రభావితం చేసే ఖచ్చితమైన అంశాలు',
    positiveFactor: 'సానుకూల అంశం',
    riskFactor: 'ప్రమాద అంశం',
    targetBenchmark: 'లక్ష్య ప్రమాణం',
    actionToImprove: 'మెరుగుపరచడానికి చర్య',

    twinTitle: 'ఇన్‌కమ్ ట్విన్™ సిమ్యులేషన్ శాండ్‌బాక్స్',
    twinSubtitle: 'రుణం తీసుకునే ముందు ఆదాయం తగ్గడం లేదా ఆర్థిక షాక్‌లను పరీక్షించండి',
    resetSim: 'రీసెట్ చేయండి',
    simActiveBadge: 'సిమ్యులేషన్ నడుస్తోంది',
    newLoanPrincipal: 'కొత్త రుణ మొత్తం',
    loanTenure: 'రుణ కాలవ్యవధి',
    months: 'నెలలు',
    annualInterestRate: 'వార్షిక వడ్డీ రేటు (APR %)',
    incomeShock: 'ఆదాయంలో తగ్గుదల / హెచ్చుతగ్గులు',
    incomeShockDesc: 'ఆఫ్-సీజన్, పెట్రోల్ ఖర్చులు పెరగడం లేదా ప్లాట్‌ఫారమ్ ఆదాయాల మార్పులను అనుకరించండి',
    emergencyExpense: 'అత్యవసర ఖర్చు (వైద్యం/మరమ్మతులు)',
    creditCardBill: 'క్రెడిట్ కార్డ్ / పే-లేటర్ బిల్లు',
    enableSecondLoan: 'రెండు రుణాలను ఏకకాలంలో జోడించండి',
    secondLoanPrincipal: 'రెండవ రుణ మొత్తం',
    monteCarloStressTitle: 'మోంటే కార్లో స్ట్రెస్ టెస్ట్ (500 సిమ్యులేషన్లు)',
    monteCarloStressSub: 'రోజువారీ ఆదాయ హెచ్చుతగ్గుల ఆధారంగా ఒత్తిడి విశ్లేషణ',
    defaultProbability: 'డిఫాల్ట్ అయ్యే అవకాశం',
    insolvencyRisk: 'దివాలా ప్రమాదం',
    maxSafeBorrowing: 'గరిష్ట సురక్షిత అదనపు రుణం',
    lowRisk: 'సురక్షితం / తక్కువ ఒత్తిడి',
    moderateRisk: 'హెచ్చరిక / మధ్యస్థ ఒత్తిడి',
    criticalRisk: 'అధిక ప్రమాదం / తీవ్ర ఒత్తిడి',

    forecastTitle: 'భవిష్యత్ నగదు ప్రవాహ అంచనా',
    forecastSubtitle: '30 నుండి 90 రోజుల డైనమిక్ క్యాష్‌ఫ్లో ప్రొజెక్షన్',
    timeframe30: '30 రోజుల దృక్పథం',
    timeframe60: '60 రోజుల దృక్పథం',
    timeframe90: '90 రోజుల దృక్పథం',
    medianExpected: 'సాధారణ ఆశించిన ఆదాయం',
    bearCase: 'మందగమనం (P10)',
    bullCase: 'గరిష్ట ఆదాయం (P90)',
    twinTrajectory: 'సిమ్యులేటెడ్ ఆదాయ పథం',
    scheduledEmiDay: 'షెడ్యూల్ చేసిన EMI డెబిట్ రోజు',
    weekendPayout: 'వారాంతపు చెల్లింపు రోజు',
    cashCrunchAlert: 'నగదు కొరత హెచ్చరిక',

    consolidateTitle: 'బహుళ రుణాల ఏకీకరణ సిమ్యులేటర్',
    consolidateSubtitle: 'ఎక్కువ వడ్డీ ఉన్న రుణాలను ఒకే తక్కువ వడ్డీ EMI గా కలపండి',
    activeDebts: 'ప్రస్తుత రుణాలు',
    addNewLoan: 'మరొక రుణం జోడించండి',
    originalTotalOutflow: 'ప్రస్తుత మొత్తం నెలవారీ EMI',
    blendedRate: 'సగటు మిశ్రమ వడ్డీ రేటు',
    consolidationOffer: 'ప్రతిపాదిత సింగిల్ ప్రైమ్ లోన్ ఆఫర్',
    newMonthlyEmi: 'కొత్త నెలవారీ EMI',
    monthlySavings: 'నెలవారీ నగదు పొదుపు',
    applyToTwin: 'ఇన్‌కమ్ ట్విన్‌కు వర్తింపజేయండి',
    debtReductionNotice: 'ఈ మార్పు తక్షణ యాప్‌ల భారాన్ని తగ్గించి సురక్షిత NBFC రుణంగా మారుస్తుంది.',

    predatoryTitle: 'మోసపూరిత లోన్ యాప్‌ల డిటెక్టర్',
    predatorySubtitle: 'దాచిన ప్రాసెసింగ్ ఫీజులు, మోసపూరిత ఫ్లాట్ రేట్లను బహిర్గతం చేయండి',
    statedFlatRate: 'చెప్పిన ఫ్లాట్ వడ్డీ రేటు (% / నెల)',
    hiddenProcessingFee: 'ముందస్తుగా కట్ చేసిన ఫీజు (%)',
    computedTrueApr: 'నిజమైన వార్షిక వడ్డీ రేటు (True APR)',
    threatLevel: 'మోసపూరిత ముప్పు స్కోర్',
    warningSignals: 'గుర్తించబడిన ప్రమాద సూచనలు',
    safeAlternatives: 'సురక్షిత ప్రత్యామ్నాయ రుణాలు',
    checkLoanButton: 'రుణ నిబంధనలను విశ్లేషించండి',

    assistantTitle: 'తెలుగు AI ఫైనాన్షియల్ అసిస్టెంట్',
    assistantSubtitle: 'మీ మాతృభాషలో మాట్లాడటం లేదా రాయడం ద్వారా తక్షణ ఆర్థిక సలహా పొందండి',
    welcomeGreeting: 'నమస్కారం! నేను మీ GigCred AI ఫైనాన్షియల్ మెంటార్‌ని. లోన్ భద్రత, EMI నిర్వహణ లేదా క్రెడిట్ మెరుగుదల గురించి నాతో తెలుగులో మాట్లాడవచ్చు.',
    quickPromptsLabel: 'త్వరిత ప్రశ్న సూచనలు',
    askPlaceholder: 'తెలుగులో అడగండి లేదా మాట్లాడండి...',
    listeningNow: 'మీ వాయిస్ వినబడుతోంది...',
    speakPrompt: 'అసిస్టెంట్‌తో మాట్లాడండి',
    sendPrompt: 'ప్రశ్న పంపండి',
    listenAudio: 'వాయిస్‌లో వినండి',
    stopAudio: 'ఆడియో ఆపండి',
    riskVerdict: 'భద్రతా నిర్ణయం',
    keyReasoning: 'క్యాష్‌ఫ్లో కారణాలు',
    actionRoadmap: 'క్రెడిట్ బిల్డింగ్ చర్య',

    transactionsTitle: 'ధృవీకరించబడిన UPI & బ్యాంక్ ఖాతా లెడ్జర్',
    transactionsSubtitle: 'గూగుల్ డాక్యుమెంట్ AI తో సురక్షితంగా వెలికితీయబడింది',
    searchTxnPlaceholder: 'లావాదేవీలను శోధించండి...',
    allFilter: 'అన్ని లావాదేవీలు',
    payoutsFilter: 'ప్లాట్‌ఫారమ్ చెల్లింపులు',
    debitsFilter: 'ఖర్చులు & డెబిట్‌లు',
    emisFilter: 'EMI కట్‌లు',
    dateCol: 'తేదీ',
    descCol: 'వివరణ',
    categoryCol: 'వర్గం',
    channelCol: 'ఛానల్ / VPA',
    amountCol: 'మొత్తం (₹)',
    balanceCol: 'మిగిలిన బ్యాలెన్స్',

    uploadModalTitle: 'బ్యాంక్ లేదా UPI స్టేట్‌మెంట్ అప్‌లోడ్ చేయండి',
    uploadModalSubtitle: 'గూగుల్ డాక్యుమెంట్ AI OCR మరియు క్లౌడ్ DLP భద్రతతో',
    dropFileNotice: 'మీ PDF స్టేట్‌మెంట్‌ను ఇక్కడ డ్రాప్ చేయండి',
    ocrProcessingBadge: 'డాక్యుమెంట్ AI OCR సిద్ధంగా ఉంది',
    dlpRedactionNotice: 'ఆధార్, పాన్ మరియు ఖాతా నంబర్లు స్వయంచాలకంగా తొలగించబడతాయి.',
    closeBtn: 'రద్దు చేయండి',
    processStatementBtn: 'స్టేట్‌మెంట్ ప్రాసెస్ చేయండి',

    b2bTitle: 'సంస్థాగత B2B లెండర్ కాక్‌పిట్',
    b2bSubtitle: 'బ్యాంకులు మరియు NBFC ల కోసం నగదు ప్రవాహం ఆధారిత అండర్‌రైటింగ్',
    dscrMetric: 'రుణ సేవా కవరేజ్ నిష్పత్తి (DSCR)',
    volatilityIndex: 'రోజువారీ క్యాష్‌ఫ్లో అస్థిరత సూచిక',
    sanctionVerdict: 'రుణ మంజూరు సిఫార్సు',
    sanctionApproved: 'ముందస్తుగా ఆమోదించబడింది (Prime)',
    sanctionConditional: 'షరతులతో కూడిన ఆమోదం',
    sanctionRejected: 'తిరస్కరణ / అధిక రుణాలు',

    footerPlatform: 'GigCred ఫైనాన్షియల్ ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్',
    footerCompliance: 'సమ్మతి ఆధారిత • వ్యక్తిగత డేటా నిల్వ లేదు • KMS HSM భద్రత',
  },

  bn: {
    brandTagline: 'গিগ কর্মীদের জন্য ব্যাখ্যাযোগ্য ক্যাশফ্লো ক্রেডিট ইন্টেলিজেন্স',
    workerHub: 'ওয়ার্কার ফিনান্সিয়াল হাব',
    b2bCockpit: 'B2B ঋণদাতা ককপিট',
    uploadStatement: 'স্টেটমেন্ট আপলোড করুন',
    securityDocAI: 'গুগল ডকুমেন্ট AI এবং DLP সক্রিয়',
    securityKMS: 'KMS AES-256 HSM সুরক্ষিত',
    securityXGBoost: 'XGBoost + SHAP ব্যাখ্যা ইঞ্জিন',
    monteCarloTag: '৫০০ মন্টি কার্লো পথ',

    tabOverview: 'ক্যাশফ্লো এবং ইনকাম টুইন',
    tabConsolidate: 'ঋণ একত্রীকরণ (Consolidate)',
    tabPredatory: 'প্রতারণামূলক ঋণ সনাক্তকারী',
    tabAssistant: 'AI ভয়েস সহকারী',
    tabB2B: 'প্রাতিষ্ঠানিক মূল্যায়ন (B2B)',

    scoreTitle: 'গিগ ক্যাশফ্লো ক্রেডিট হেলথ স্কোর',
    scoreSubtitle: 'যাচাইকৃত UPI এবং প্ল্যাটফর্ম আয়ের ওপর ভিত্তি করে বিকল্প স্কোর',
    calculatedWithoutCibil: 'প্রথাগত CIBIL ছাড়া রিয়েল-টাইম UPI এবং প্ল্যাটফর্ম আয়ের মাধ্যমে গণনা করা।',
    currentRating: 'বর্তমান রেটিং',
    scoreRange: 'স্কোর সীমা: ৩০০ - ৯০০',
    simulatedScore: 'প্রত্যাশিত সিমুলেটেড স্কোর',
    primeWorker: 'প্রাইম ক্যাশফ্লো স্তর',
    nearPrime: 'স্বাস্থ্যকর / নিয়ার-প্রাইম',
    watchlist: 'সংবেদনশীল / নজরদারি',
    highRisk: 'উচ্চ ঝুঁকি / অতিরিক্ত ঋণ',
    percentileRank: 'গিগ কর্মীদের মধ্যে শীর্ষ শতাংশ',
    monthlyInflow: 'মাসিক যাচাইকৃত আয়',
    debtFOIR: 'ঋণ FOIR (EMI বোঝা)',
    liquidRunway: 'সঞ্চয় রানওয়ে বাফার',
    bounceRisk: 'NACH / UPI বাউন্স ঝুঁকি',
    days: 'দিন',
    zeroBounces: '৯০ দিনে ০ বাউন্স',
    shapDriversTitle: 'XGBoost SHAP মূল কারণসমূহ',
    shapDriversSubtitle: 'এই ক্রেডিট স্কোরকে প্রভাবিতকারী মূল উপাদান',
    positiveFactor: 'ইতিবাচক উপাদান',
    riskFactor: 'ঝুঁকি উপাদান',
    targetBenchmark: 'লক্ষ্য মানদণ্ড',
    actionToImprove: 'উন্নতির পদক্ষেপ',

    twinTitle: 'ইনকাম টুইন™ সিমুলেশন স্যান্ডবক্স',
    twinSubtitle: 'ঋণ নেওয়ার আগে আয় কমে যাওয়া বা আর্থিক ধাক্কার পরীক্ষা করুন',
    resetSim: 'রিসেট সিমুলেশন',
    simActiveBadge: 'সিমুলেশন চলছে',
    newLoanPrincipal: 'নতুন ঋণের মূল পরিমাণ',
    loanTenure: 'ঋণের মেয়াদ',
    months: 'মাস',
    annualInterestRate: 'বার্ষিক সুদের হার (APR %)',
    incomeShock: 'আয় হ্রাস / আয়ের ওঠানামা',
    incomeShockDesc: 'অফ-সিজন বা জ্বালানি খরচ বৃদ্ধি সিমুলেট করুন',
    emergencyExpense: 'জরুরি খরচ (চিকিৎসা/মেরামত)',
    creditCardBill: 'অতিরিক্ত ক্রেডিট কার্ড / পে-লেটার বিল',
    enableSecondLoan: 'একসাথে দ্বিতীয় ঋণ যোগ করুন',
    secondLoanPrincipal: 'দ্বিতীয় ঋণের মূল পরিমাণ',
    monteCarloStressTitle: 'মন্টি কার্লো স্ট্রেস টেস্ট (৫০০ সিমুলেশন)',
    monteCarloStressSub: 'দৈনিক আয়ের ওঠানামার ওপর স্ট্রেস টেস্ট',
    defaultProbability: 'খেলাপি হওয়ার সম্ভাবনা',
    insolvencyRisk: 'দেউলিয়া হওয়ার ঝুঁকি',
    maxSafeBorrowing: 'সর্বোচ্চ নিরাপদ অতিরিক্ত ঋণ',
    lowRisk: 'নিরাপদ / কম চাপ',
    moderateRisk: 'সতর্কতা / মাঝারি চাপ',
    criticalRisk: 'উচ্চ ঝুঁকি / তীব্র চাপ',

    forecastTitle: 'ভবিষ্যত ক্যাশফ্লো পূর্বাভাস',
    forecastSubtitle: '৩০ থেকে ৯০ দিনের গতিশীল ক্যাশফ্লো অভিক্ষেপ',
    timeframe30: '৩০ দিনের দৃষ্টিভঙ্গি',
    timeframe60: '৬০ দিনের দৃষ্টিভঙ্গি',
    timeframe90: '৯০ দিনের দৃষ্টিভঙ্গি',
    medianExpected: 'প্রত্যাশিত গড় আয়',
    bearCase: 'মন্দা পরিস্থিতি (P10)',
    bullCase: 'উচ্চ আয় পরিস্থিতি (P90)',
    twinTrajectory: 'সিমুলেটেড ইনকাম টুইন পথ',
    scheduledEmiDay: 'নির্ধারিত EMI কাটার দিন',
    weekendPayout: 'সাপ্তাহিক প্ল্যাটফর্ম পেমেন্ট',
    cashCrunchAlert: 'নগদ ঘাটতির সতর্কতা',

    consolidateTitle: 'একাধিক ঋণ একত্রীকরণ সিমুলেটর',
    consolidateSubtitle: 'উচ্চ সুদের একাধিক ঋণকে একটি কম সুদের EMI-তে রূপান্তর করুন',
    activeDebts: 'বর্তমান ঋণসমূহ',
    addNewLoan: 'আরেকটি ঋণ যোগ করুন',
    originalTotalOutflow: 'বর্তমান মোট মাসিক EMI',
    blendedRate: 'গড় মিশ্রিত সুদের হার',
    consolidationOffer: 'প্রস্তাবিত একক ঋণ অফার',
    newMonthlyEmi: 'নতুন একক মাসিক EMI',
    monthlySavings: 'মাসিক নগদ সঞ্চয়',
    applyToTwin: 'ইনকাম টুইনে প্রয়োগ করুন',
    debtReductionNotice: 'এটি বিপজ্জনক অ্যাপগুলির বোঝা কমিয়ে একটি নিয়ন্ত্রিত NBFC ঋণে রূপান্তরিত করে।',

    predatoryTitle: 'প্রতারণামূলক ঋণ অ্যাপ সনাক্তকারী',
    predatorySubtitle: 'লুকানো প্রসেসিং ফি এবং প্রতারণামূলক ফ্ল্যাট রেট উন্মোচন করুন',
    statedFlatRate: 'কথিত ফ্ল্যাট সুদের হার (% / মাস)',
    hiddenProcessingFee: 'কর্তন করা ফি (%)',
    computedTrueApr: 'প্রকৃত বার্ষিক সুদের হার (True APR)',
    threatLevel: 'প্রতারণার হুমকি স্কোর',
    warningSignals: 'চিহ্নিত বিপদের লক্ষণ',
    safeAlternatives: 'নিরাপদ নিয়ন্ত্রিত বিকল্প ঋণ',
    checkLoanButton: 'ঋণের শর্তাবলী বিশ্লেষণ করুন',

    assistantTitle: 'বাংলা AI আর্থিক সহকারী',
    assistantSubtitle: 'আপনার মাতৃভাষায় কথা বলে বা লিখে তাত্ক্ষণিক আর্থিক পরামর্শ নিন',
    welcomeGreeting: 'নমস্কার! আমি আপনার GigCred AI আর্থিক পরামর্শদাতা। নতুন ঋণ, EMI বা ক্রেডিট স্কোর উন্নতির বিষয়ে বাংলায় যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।',
    quickPromptsLabel: 'দ্রুত প্রশ্ন পরামর্শ',
    askPlaceholder: 'বাংলায় লিখুন বা কথা বলুন...',
    listeningNow: 'আপনার কথা শোনা হচ্ছে...',
    speakPrompt: 'সহকারীর সাথে কথা বলুন',
    sendPrompt: 'প্রশ্ন পাঠান',
    listenAudio: 'ভয়েসে শুনুন',
    stopAudio: 'অডিও বন্ধ করুন',
    riskVerdict: 'সুরক্ষা রায়',
    keyReasoning: 'ক্যাশফ্লো কারণসমূহ',
    actionRoadmap: 'ক্রেডিট তৈরির পদক্ষেপ',

    transactionsTitle: 'যাচাইকৃত UPI ও ব্যাংক খতিয়ান',
    transactionsSubtitle: 'গুগল ডকুমেন্ট AI দ্বারা নিরাপদে সংগৃহীত',
    searchTxnPlaceholder: 'লেনদেন অনুসন্ধান করুন...',
    allFilter: 'সকল লেনদেন',
    payoutsFilter: 'প্ল্যাটফর্ম পেমেন্ট',
    debitsFilter: 'খরচ এবং ডেবিট',
    emisFilter: 'EMI কর্তন',
    dateCol: 'তারিখ',
    descCol: 'বিবরণ',
    categoryCol: 'বিভাগ',
    channelCol: 'চ্যানেল / VPA',
    amountCol: 'পরিমাণ (₹)',
    balanceCol: 'অবশিষ্ট ব্যালেন্স',

    uploadModalTitle: 'ব্যাংক বা UPI স্টেটমেন্ট আপলোড করুন',
    uploadModalSubtitle: 'গুগল ডকুমেন্ট AI OCR এবং ক্লাউড DLP সুরক্ষার সাথে',
    dropFileNotice: 'আপনার PDF স্টেটমেন্ট এখানে ড্রপ করুন',
    ocrProcessingBadge: 'ডকুমেন্ট AI OCR প্রস্তুত',
    dlpRedactionNotice: 'আধার, প্যান এবং অ্যাকাউন্ট নম্বর স্বয়ংক্রিয়ভাবে মুছে ফেলা হবে।',
    closeBtn: 'বাতিল',
    processStatementBtn: 'স্টেটমেন্ট প্রসেস করুন',

    b2bTitle: 'প্রাতিষ্ঠানিক B2B লেন্ডার ককপিট',
    b2bSubtitle: 'ব্যাংক এবং NBFC-এর জন্য ক্যাশফ্লো ভিত্তিক বিকল্প আন্ডাররাইটিং',
    dscrMetric: 'ডেট সার্ভিস কভারেজ রেশিও (DSCR)',
    volatilityIndex: 'দৈনিক ক্যাশফ্লো অস্থিরতা সূচক',
    sanctionVerdict: 'ঋণ অনুমোদন সুপারিশ',
    sanctionApproved: 'প্রাক-অনুমোদিত (Prime)',
    sanctionConditional: 'শর্তযুক্ত অনুমোদন',
    sanctionRejected: 'প্রত্যাখ্যান / অতিরিক্ত ঋণ',

    footerPlatform: 'GigCred ফাইন্যান্সিয়াল ইন্টেলিজেন্স প্ল্যাটফর্ম',
    footerCompliance: 'সম্মতি-ভিত্তিক • শূন্য ব্যক্তিগত তথ্য সংরক্ষণ • KMS HSM সুরক্ষিত',
  },

  mr: {
    brandTagline: 'गिग कामगारांसाठी स्पष्ट कॅशफ्लो क्रेडिट इंटेलिजन्स',
    workerHub: 'कामगार आर्थिक केंद्र',
    b2bCockpit: 'B2B कर्जदार कॉकपिट',
    uploadStatement: 'स्टेटमेंट अपलोड करा',
    securityDocAI: 'गुगल डॉक्युमेंट AI आणि DLP सक्रिय',
    securityKMS: 'KMS AES-256 HSM सुरक्षित',
    securityXGBoost: 'XGBoost + SHAP स्पष्टीकरण इंजिन',
    monteCarloTag: '500 मॉन्टे कार्लो मार्ग',

    tabOverview: 'कॅशफ्लो आणि इन्कम ट्विन',
    tabConsolidate: 'कर्ज एकत्रीकरण (Consolidate)',
    tabPredatory: 'फसव्या कर्ज ॲप्स शोधक',
    tabAssistant: 'AI व्हॉइस असिस्टंट',
    tabB2B: 'संस्थात्मक हमीदारी (B2B)',

    scoreTitle: 'गिग कॅशफ्लो क्रेडिट हेल्थ स्कोअर',
    scoreSubtitle: 'सत्यापित UPI आणि उत्पन्नावर आधारित पर्यायी क्रेडिट स्कोअर',
    calculatedWithoutCibil: 'पारंपारिक CIBIL शिवाय थेट UPI आणि प्लॅटफॉर्म उत्पन्नावरून मोजलेले.',
    currentRating: 'सध्याचे रेटिंग',
    scoreRange: 'स्कोअर श्रेणी: 300 - 900',
    simulatedScore: 'अपेक्षित सिम्युलेटेड स्कोअर',
    primeWorker: 'प्राइम कॅशफ्लो श्रेणी',
    nearPrime: 'चांगले / निअर-प्राइम',
    watchlist: 'संवेदनशील / वॉचलिस्ट',
    highRisk: 'उच्च जोखीम / जास्त कर्ज',
    percentileRank: 'गिग कामगारांमध्ये अव्वल टक्केवारी',
    monthlyInflow: 'मासिक सत्यापित उत्पन्न',
    debtFOIR: 'कर्ज FOIR (EMI चा भार)',
    liquidRunway: 'बचत रनवे बफर',
    bounceRisk: 'NACH / UPI बाऊन्स धोका',
    days: 'दिवस',
    zeroBounces: '90 दिवसांत 0 बाऊन्स',
    shapDriversTitle: 'XGBoost SHAP मुख्य घटक',
    shapDriversSubtitle: 'या क्रेडिट स्कोअरवर परिणाम करणारे मुख्य घटक',
    positiveFactor: 'सकारात्मक घटक',
    riskFactor: 'जोखीम घटक',
    targetBenchmark: 'ध्येय मानक',
    actionToImprove: 'सुधारणेसाठी कृती',

    twinTitle: 'इन्कम ट्विन™ सिम्युलेशन सँडबॉक्स',
    twinSubtitle: 'कर्ज घेण्यापूर्वी उत्पन्नातील घट किंवा आर्थिक धक्क्यांची चाचणी घ्या',
    resetSim: 'सिम्युलेशन पूर्ववत करा',
    simActiveBadge: 'सिम्युलेशन सक्रिय आहे',
    newLoanPrincipal: 'नवीन कर्जाची मूळ रक्कम',
    loanTenure: 'कर्जाचा कालावधी',
    months: 'महिने',
    annualInterestRate: 'वार्षिक व्याजदर (APR %)',
    incomeShock: 'उत्पन्नातील घट / कमाईतील अस्थिरता',
    incomeShockDesc: 'कमी कमाईचा हंगाम, इंधन खर्च वाढणे किंवा घट सिम्युलेट करा',
    emergencyExpense: 'तातडीचा खर्च (वैद्यकीय/दुरुस्ती)',
    creditCardBill: 'अतिरिक्त क्रेडिट कार्ड / पे-लेटर बिल',
    enableSecondLoan: 'एकाच वेळी दुसरे कर्ज जोडा',
    secondLoanPrincipal: 'दुसऱ्या कर्जाची मूळ रक्कम',
    monteCarloStressTitle: 'मॉन्टे कार्लो ताण चाचणी (500 सिम्युलेशन्स)',
    monteCarloStressSub: 'दैनंदिन कमाईच्या चढ-उतारांवर आधारित ताण चाचणी',
    defaultProbability: 'कर्ज फेड न होण्याची शक्यता',
    insolvencyRisk: 'दिवाळखोरीचा धोका',
    maxSafeBorrowing: 'कमाल सुरक्षित अतिरिक्त कर्ज',
    lowRisk: 'सुरक्षित / कमी ताण',
    moderateRisk: 'सावधानता / मध्यम ताण',
    criticalRisk: 'उच्च जोखीम / गंभीर ताण',

    forecastTitle: 'भविष्यातील कॅशफ्लो अंदाज',
    forecastSubtitle: '30 ते 90 दिवसांचा गतिशील रोख प्रवाह अंदाज',
    timeframe30: '30 दिवसांचा दृष्टिकोन',
    timeframe60: '60 दिवसांचा दृष्टिकोन',
    timeframe90: '90 दिवसांचा दृष्टिकोन',
    medianExpected: 'अपेक्षित सरासरी उत्पन्न',
    bearCase: 'मंदीची स्थिती (P10)',
    bullCase: 'उच्च उत्पन्न स्थिती (P90)',
    twinTrajectory: 'सिम्युलेटेड इन्कम ट्विन मार्ग',
    scheduledEmiDay: 'नियोजित EMI कपातीचा दिवस',
    weekendPayout: 'आठवड्याच्या शेवटी मिळणारे मानधन',
    cashCrunchAlert: 'रोख रकमेच्या टंचाईचा इशारा',

    consolidateTitle: 'अनेक कर्जे एकत्रीकरण सिम्युलेटर',
    consolidateSubtitle: 'जास्त व्याजाची अनेक कर्जे एका कमी व्याजाच्या EMI मध्ये बदला',
    activeDebts: 'सध्याची सक्रिय कर्जे',
    addNewLoan: 'दुसरे कर्ज जोडा',
    originalTotalOutflow: 'सध्याचा एकूण मासिक EMI',
    blendedRate: 'सरासरी मिश्र व्याजदर',
    consolidationOffer: 'प्रस्तावित एकच कर्ज ऑफर',
    newMonthlyEmi: 'नवीन मासिक EMI',
    monthlySavings: 'मासिक रोख बचत',
    applyToTwin: 'इन्कम ट्विनमध्ये लागू करा',
    debtReductionNotice: 'हे धोकादायक इन्स्टंट ॲप्सना बदलून एका सुरक्षित NBFC कर्जात रूपांतरित करते.',

    predatoryTitle: 'फसव्या कर्ज ॲप्स शोधक',
    predatorySubtitle: 'लपलेले प्रोसेसिंग शुल्क आणि दिशाभूल करणारे व्याजदर उघड करा',
    statedFlatRate: 'सांगितलेला फ्लॅट व्याजदर (% / महिना)',
    hiddenProcessingFee: 'कपात केलेले शुल्क (%)',
    computedTrueApr: 'खरा वार्षिक व्याजदर (True APR)',
    threatLevel: 'फसवणूक धोका स्कोअर',
    warningSignals: 'ओळखलेली धोक्याची लक्षणे',
    safeAlternatives: 'सुरक्षित नियमन केलेले कर्ज पर्याय',
    checkLoanButton: 'कर्जाच्या अटी तपासा',

    assistantTitle: 'मराठी AI आर्थिक सल्लागार',
    assistantSubtitle: 'तुमच्या मातृभाषेत बोलून किंवा लिहून त्वरित आर्थिक मार्गदर्शन मिळवा',
    welcomeGreeting: 'नमस्कार! मी तुमचा GigCred AI आर्थिक मार्गदर्शक आहे. तुम्ही मराठीत नवीन कर्ज, EMI किंवा क्रेडिट स्कोअर सुधारण्याबाबत विचारू शकता.',
    quickPromptsLabel: 'जलद प्रश्न सूचना',
    askPlaceholder: 'मराठीत विचारा किंवा बोला...',
    listeningNow: 'तुमचा आवाज ऐकत आहे...',
    speakPrompt: 'असिस्टंटशी बोला',
    sendPrompt: 'प्रश्न पाठवा',
    listenAudio: 'आवाजात ऐका',
    stopAudio: 'ऑडिओ थांबवा',
    riskVerdict: 'सुरक्षा निर्णय',
    keyReasoning: 'कॅशफ्लो विश्लेषण',
    actionRoadmap: 'क्रेडिट सुधारणेचे पाऊल',

    transactionsTitle: 'सत्यापित UPI आणि बँक खाते लेजर',
    transactionsSubtitle: 'गुगल डॉक्युमेंट AI द्वारे सुरक्षितपणे काढलेले व्यवहार',
    searchTxnPlaceholder: 'व्यवहार शोधा...',
    allFilter: 'सर्व व्यवहार',
    payoutsFilter: 'प्लॅटफॉर्म कमाई',
    debitsFilter: 'खर्च आणि डेबिट',
    emisFilter: 'EMI कपात',
    dateCol: 'तारीख',
    descCol: 'तपशील',
    categoryCol: 'श्रेणी',
    channelCol: 'माध्यम / VPA',
    amountCol: 'रक्कम (₹)',
    balanceCol: 'शिल्लक रक्कम',

    uploadModalTitle: 'बँक किंवा UPI स्टेटमेंट अपलोड करा',
    uploadModalSubtitle: 'गुगल डॉक्युमेंट AI OCR आणि क्लाउड DLP द्वारे सुरक्षित',
    dropFileNotice: 'तुमचे PDF स्टेटमेंट येथे टाका किंवा फाइल निवडा',
    ocrProcessingBadge: 'डॉक्युमेंट AI OCR सज्ज',
    dlpRedactionNotice: 'आधार, पॅन आणि खाते क्रमांक आपोआप लपवले जातील.',
    closeBtn: 'रद्द करा',
    processStatementBtn: 'स्टेटमेंट प्रक्रिया करा',

    b2bTitle: 'संस्थात्मक B2B कर्जदार कॉकपिट',
    b2bSubtitle: 'बँका आणि NBFC साठी कॅशफ्लो आधारित पर्यायी मूल्यमापन',
    dscrMetric: 'कर्ज सेवा कव्हरेज प्रमाण (DSCR)',
    volatilityIndex: 'दैनिक कॅशफ्लो अस्थिरता निर्देशांक',
    sanctionVerdict: 'कर्ज मंजुरी शिफारस',
    sanctionApproved: 'पूर्व-मंजूर (Prime)',
    sanctionConditional: 'अटींसह मंजुरी',
    sanctionRejected: 'नाकारले / जास्त कर्ज',

    footerPlatform: 'GigCred फायनान्शियल इंटेलिजेंस प्लॅटफॉर्म',
    footerCompliance: 'संमती-आधारित • शून्य वैयक्तिक डेटा साठवणूक • KMS HSM सुरक्षित',
  },

  kn: {
    brandTagline: 'ಗಿಗ್ ಕೆಲಸಗಾರರಿಗಾಗಿ ವಿವರಣಾತ್ಮಕ ನಗದು ಹರಿವು ಕ್ರೆಡಿಟ್ ಬುದ್ಧಿವಂತಿಕೆ',
    workerHub: 'ಕೆಲಸಗಾರರ ಹಣಕಾಸು ಕೇಂದ್ರ',
    b2bCockpit: 'B2B ಸಾಲದಾತರ ಕಾಕ್‌ಪಿಟ್',
    uploadStatement: 'ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    securityDocAI: 'ಗೂಗಲ್ ಡಾಕ್ಯುಮೆಂಟ್ AI & DLP ಸಕ್ರಿಯ',
    securityKMS: 'KMS AES-256 HSM ಸುರಕ್ಷಿತ',
    securityXGBoost: 'XGBoost + SHAP ವಿವರಣೆ ಎಂಜಿನ್',
    monteCarloTag: '500 ಮಾಂಟೆ ಕಾರ್ಲೊ ಪಥಗಳು',

    tabOverview: 'ನಗದು ಹರಿವು & ಆದಾಯ ಅವಳಿ (Income Twin)',
    tabConsolidate: 'ಸಾಲಗಳ ಏಕೀಕರಣ (Consolidate)',
    tabPredatory: 'ವಂಚಕ ಸಾಲ ಪತ್ತೆಕಾರಕ',
    tabAssistant: 'AI ಧ್ವನಿ ಸಹಾಯಕ',
    tabB2B: 'ಸಂಸ್ಥಾಗತ ಮೌಲ್ಯಮಾಪನ (B2B)',

    scoreTitle: 'ಗಿಗ್ ಕ್ಯಾಶ್‌ಫ್ಲೋ ಕ್ರೆಡಿಟ್ ಹೆಲ್ತ್ ಸ್ಕೋರ್',
    scoreSubtitle: 'ದೃಢೀಕರಿಸಿದ UPI ಮತ್ತು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆದಾಯ ಆಧಾರಿತ ಪರ್ಯಾಯ ಸ್ಕೋರ್',
    calculatedWithoutCibil: 'ಸಾಂಪ್ರದಾಯಿಕ CIBIL ಇಲ್ಲದೆ ನೈಜ-ಸಮಯದ UPI ಮತ್ತು ಗಳಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ.',
    currentRating: 'ಪ್ರಸ್ತುತ ರೇಟಿಂಗ್',
    scoreRange: 'ಸ್ಕೋರ್ ಶ್ರೇಣಿ: 300 - 900',
    simulatedScore: 'ನಿರೀಕ್ಷಿತ ಸ್ಕೋರ್',
    primeWorker: 'ಪ್ರೈಮ್ ಹಂತ',
    nearPrime: 'ಆರೋಗ್ಯಕರ / ನಿಯರ್-ಪ್ರೈಮ್',
    watchlist: 'ಸೂಕ್ಷ್ಮ / ವಾಚ್‌ಲಿಸ್ಟ್',
    highRisk: 'ಹೆಚ್ಚಿನ ಅಪಾಯ / ಅತಿಯಾದ ಸಾಲ',
    percentileRank: 'ಗಿಗ್ ಕೆಲಸಗಾರರಲ್ಲಿ ಅಗ್ರ ಶೇಕಡಾವಾರು',
    monthlyInflow: 'ಮಾಸಿಕ ದೃಢೀಕರಿಸಿದ ಆದಾಯ',
    debtFOIR: 'ಸಾಲದ FOIR (EMI ಹೊರೆ)',
    liquidRunway: 'ಉಳಿತಾಯ ರನ್‌ವೇ ಬಫರ್',
    bounceRisk: 'NACH / UPI ಬೌನ್ಸ್ ಅಪಾಯ',
    days: 'ದಿನಗಳು',
    zeroBounces: '90 ದಿನಗಳಲ್ಲಿ 0 ಬೌನ್ಸ್',
    shapDriversTitle: 'XGBoost SHAP ಪ್ರಮುಖ ಅಂಶಗಳು',
    shapDriversSubtitle: 'ಈ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ನಿಖರ ಅಂಶಗಳು',
    positiveFactor: 'ಸಕಾರಾತ್ಮಕ ಅಂಶ',
    riskFactor: 'ಅಪಾಯಕಾರಿ ಅಂಶ',
    targetBenchmark: 'ಗುರಿ ಮಾನದಂಡ',
    actionToImprove: 'ಸುಧಾರಿಸಲು ಕ್ರಮ',

    twinTitle: 'ಆದಾಯ ಅವಳಿ™ (Income Twin) ಸಿಮ್ಯುಲೇಶನ್',
    twinSubtitle: 'ಸಾಲ ಪಡೆಯುವ ಮುನ್ನ ಆದಾಯ ಕುಸಿತ ಅಥವಾ ಆರ್ಥಿಕ ಆಘಾತಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ',
    resetSim: 'ರೀಸೆಟ್ ಮಾಡಿ',
    simActiveBadge: 'ಸಿಮ್ಯುಲೇಶನ್ ಚಾಲನೆಯಲ್ಲಿದೆ',
    newLoanPrincipal: 'ಹೊಸ ಸಾಲದ ಅಸಲು ಮೊತ್ತ',
    loanTenure: 'ಸಾಲದ ಅವಧಿ',
    months: 'ತಿಂಗಳುಗಳು',
    annualInterestRate: 'ವಾರ್ಷಿಕ ಬಡ್ಡಿದರ (APR %)',
    incomeShock: 'ಆದಾಯ ಕುಸಿತ / ಏರಿಳಿತ',
    incomeShockDesc: 'ಆಫ್-ಸೀಸನ್ ಅಥವಾ ಇಂಧನ ವೆಚ್ಚ ಹೆಚ್ಚಳವನ್ನು ಪರೀಕ್ಷಿಸಿ',
    emergencyExpense: 'ತುರ್ತು ವೆಚ್ಚ (ವೈದ್ಯಕೀಯ/ದುರಸ್ತಿ)',
    creditCardBill: 'ಹೆಚ್ಚುವರಿ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ / ಪೇ-ಲೇಟರ್ ಬಿಲ್',
    enableSecondLoan: 'ಏಕಕಾಲದಲ್ಲಿ ಎರಡನೇ ಸಾಲ ಸೇರಿಸಿ',
    secondLoanPrincipal: 'ಎರಡನೇ ಸಾಲದ ಅಸಲು ಮೊತ್ತ',
    monteCarloStressTitle: 'ಮಾಂಟೆ ಕಾರ್ಲೊ ಒತ್ತಡ ಪರೀಕ್ಷೆ (500 ಪಥಗಳು)',
    monteCarloStressSub: 'ದೈನಂದಿನ ಗಳಿಕೆಯ ಏರಿಳಿತಗಳ ಒತ್ತಡ ಪರೀಕ್ಷೆ',
    defaultProbability: 'ಸಾಲ ಮರುಪಾವತಿ ತಪ್ಪುವ ಸಾಧ್ಯತೆ',
    insolvencyRisk: 'ದಿವಾಳಿತನದ ಅಪಾಯ',
    maxSafeBorrowing: 'ಗರಿಷ್ಠ ಸುರಕ್ಷಿತ ಹೆಚ್ಚುವರಿ ಸಾಲ',
    lowRisk: 'ಸುರಕ್ಷಿತ / ಕಡಿಮೆ ಒತ್ತಡ',
    moderateRisk: 'ಎಚ್ಚರಿಕೆ / ಮಧ್ಯಮ ಒತ್ತಡ',
    criticalRisk: 'ಹೆಚ್ಚಿನ ಅಪಾಯ / ತೀವ್ರ ಒತ್ತಡ',

    forecastTitle: 'ಭವಿಷ್ಯದ ನಗದು ಹರಿವಿನ ಮುನ್ಸೂಚನೆ',
    forecastSubtitle: '30 ರಿಂದ 90 ದಿನಗಳ ಕ್ರಿಯಾತ್ಮಕ ನಗದು ಹರಿವಿನ ಅಂದಾಜು',
    timeframe30: '30 ದಿನಗಳ ನೋಟ',
    timeframe60: '60 ದಿನಗಳ ನೋಟ',
    timeframe90: '90 ದಿನಗಳ ನೋಟ',
    medianExpected: 'ನಿರೀಕ್ಷಿತ ಸರಾಸರಿ ಆದಾಯ',
    bearCase: 'ಮಂದಗತಿ (P10)',
    bullCase: 'ಹೆಚ್ಚಿನ ಆದಾಯ (P90)',
    twinTrajectory: 'ಆದಾಯ ಅವಳಿ ಪಥ',
    scheduledEmiDay: 'ನಿಗದಿತ EMI ಕಡಿತದ ದಿನ',
    weekendPayout: 'ವಾರಾಂತ್ಯದ ಪಾವತಿ ದಿನ',
    cashCrunchAlert: 'ಹಣದ ಕೊರತೆಯ ಎಚ್ಚರಿಕೆ',

    consolidateTitle: 'ಬಹು ಸಾಲಗಳ ಏಕೀಕರಣ ಸಿಮ್ಯುಲೇಟರ್',
    consolidateSubtitle: 'ಹೆಚ್ಚು ಬಡ್ಡಿಯ ಸಾಲಗಳನ್ನು ಒಂದೇ ಕಡಿಮೆ ಬಡ್ಡಿಯ EMI ಆಗಿ ಪರಿವರ್ತಿಸಿ',
    activeDebts: 'ಪ್ರಸ್ತುತ ಸಾಲಗಳು',
    addNewLoan: 'ಮತ್ತೊಂದು ಸಾಲ ಸೇರಿಸಿ',
    originalTotalOutflow: 'ಪ್ರಸ್ತುತ ಒಟ್ಟು ಮಾಸಿಕ EMI',
    blendedRate: 'ಸರಾಸರಿ ಮಿಶ್ರ ಬಡ್ಡಿದರ',
    consolidationOffer: 'ಪ್ರಸ್ತಾವಿತ ಏಕೈಕ ಸಾಲದ ಆಫರ್',
    newMonthlyEmi: 'ಹೊಸ ಮಾಸಿಕ EMI',
    monthlySavings: 'ಮಾಸಿಕ ನಗದು ಉಳಿತಾಯ',
    applyToTwin: 'ಆದಾಯ ಅವಳಿಗೆ ಅನ್ವಯಿಸಿ',
    debtReductionNotice: 'ಇದು ಅಪಾಯಕಾರಿ ಆ್ಯಪ್‌ಗಳ ಸಾಲವನ್ನು ಸುರಕ್ಷಿತ NBFC ಸಾಲವಾಗಿ ಬದಲಾಯಿಸುತ್ತದೆ.',

    predatoryTitle: 'ವಂಚಕ ಸಾಲ ಆ್ಯಪ್‌ಗಳ ಪತ್ತೆಕಾರಕ',
    predatorySubtitle: 'ಹಿಡನ್ ಪ್ರೊಸೆಸಿಂಗ್ ಶುಲ್ಕಗಳು ಮತ್ತು ಮೋಸದ ಫ್ಲಾಟ್ ದರಗಳನ್ನು ಬಯಲು ಮಾಡಿ',
    statedFlatRate: 'ಹೇಳಲಾದ ಫ್ಲಾಟ್ ಬಡ್ಡಿದರ (% / ತಿಂಗಳು)',
    hiddenProcessingFee: 'ಕಡಿತಗೊಳಿಸಲಾದ ಶುಲ್ಕ (%)',
    computedTrueApr: 'ನಿಜವಾದ ವಾರ್ಷಿಕ ಬಡ್ಡಿದರ (True APR)',
    threatLevel: 'ವಂಚನೆ ಅಪಾಯದ ಸ್ಕೋರ್',
    warningSignals: 'ಗುರುತಿಸಲಾದ ಅಪಾಯದ ಲಕ್ಷಣಗಳು',
    safeAlternatives: 'ಸುರಕ್ಷಿತ ನಿಯಂತ್ರಿತ ಸಾಲಗಳು',
    checkLoanButton: 'ಸಾಲದ ಷರತ್ತುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',

    assistantTitle: 'ಕನ್ನಡ AI ಹಣಕಾಸು ಸಹಾಯಕ',
    assistantSubtitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡುವ ಅಥವಾ ಬರೆಯುವ ಮೂಲಕ ತ್ವರಿತ ಆರ್ಥಿಕ ಸಲಹೆ ಪಡೆಯಿರಿ',
    welcomeGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ GigCred AI ಹಣಕಾಸು ಮಾರ್ಗದರ್ಶಿ. ಹೊಸ ಸಾಲ, EMI ಅಥವಾ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಣೆ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲಿ ನನ್ನನ್ನು ಕೇಳಬಹುದು.',
    quickPromptsLabel: 'ತ್ವರಿತ ಪ್ರಶ್ನೆ ಸಲಹೆಗಳು',
    askPlaceholder: 'ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ ಅಥವಾ ಮಾತನಾಡಿ...',
    listeningNow: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸಲಾಗುತ್ತಿದೆ...',
    speakPrompt: 'ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    sendPrompt: 'ಪ್ರಶ್ನೆ ಕಳುಹಿಸಿ',
    listenAudio: 'ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ',
    stopAudio: 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ',
    riskVerdict: 'ಸುರಕ್ಷತೆಯ ತೀರ್ಪು',
    keyReasoning: 'ನಗದು ಹರಿವಿನ ಕಾರಣಗಳು',
    actionRoadmap: 'ಕ್ರೆಡಿಟ್ ಸುಧಾರಣೆಯ ಹೆಜ್ಜೆ',

    transactionsTitle: 'ದೃಢೀಕರಿಸಿದ UPI ಮತ್ತು ಬ್ಯಾಂಕ್ ಲೆಡ್ಜರ್',
    transactionsSubtitle: 'ಗೂಗಲ್ ಡಾಕ್ಯುಮೆಂಟ್ AI ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಹೊರತೆಗೆಯಲಾಗಿದೆ',
    searchTxnPlaceholder: 'ವಹಿವಾಟುಗಳನ್ನು ಹುಡುಕಿ...',
    allFilter: 'ಎಲ್ಲಾ ವಹಿವಾಟುಗಳು',
    payoutsFilter: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಗಳಿಕೆ',
    debitsFilter: 'ವೆಚ್ಚಗಳು & ಡೆಬಿಟ್‌ಗಳು',
    emisFilter: 'EMI ಕಡಿತಗಳು',
    dateCol: 'ದಿನಾಂಕ',
    descCol: 'ವಿವರಣೆ',
    categoryCol: 'ವರ್ಗ',
    channelCol: 'ಚಾನಲ್ / VPA',
    amountCol: 'ಮೊತ್ತ (₹)',
    balanceCol: 'ಉಳಿದ ಬಾಕಿ',

    uploadModalTitle: 'ಬ್ಯಾಂಕ್ ಅಥವಾ UPI ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadModalSubtitle: 'ಗೂಗಲ್ ಡಾಕ್ಯುಮೆಂಟ್ AI OCR ಮತ್ತು ಕ್ಲೌಡ್ DLP ಸುರಕ್ಷತೆಯೊಂದಿಗೆ',
    dropFileNotice: 'ನಿಮ್ಮ PDF ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಇಲ್ಲಿ ಎಳೆಯಿರಿ',
    ocrProcessingBadge: 'ಡಾಕ್ಯುಮೆಂಟ್ AI OCR ಸಿದ್ಧವಾಗಿದೆ',
    dlpRedactionNotice: 'ಆಧಾರ್, ಪ್ಯಾನ್ ಮತ್ತು ಖಾತೆ ಸಂಖ್ಯೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರೆಮಾಡಲಾಗುತ್ತದೆ.',
    closeBtn: 'ರದ್ದುಮಾಡಿ',
    processStatementBtn: 'ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ',

    b2bTitle: 'ಸಂಸ್ಥಾಗತ B2B ಸಾಲದಾತರ ಕಾಕ್‌ಪಿಟ್',
    b2bSubtitle: 'ಬ್ಯಾಂಕುಗಳು ಮತ್ತು NBFC ಗಳಿಗೆ ಪರ್ಯಾಯ ನಗದು ಹರಿವು ಮೌಲ್ಯಮಾಪನ',
    dscrMetric: 'ಸಾಲ ಸೇವಾ ವ್ಯಾಪ್ತಿಯ ಅನುಪಾತ (DSCR)',
    volatilityIndex: 'ದೈನಂದಿನ ನಗದು ಹರಿವು ಅಸ್ಥಿರತೆ ಸೂಚ್ಯಂಕ',
    sanctionVerdict: 'ಸಾಲ ಅನುಮೋದನೆ ಶಿಫಾರಸು',
    sanctionApproved: 'ಪೂರ್ವ-ಅನುಮೋದಿತ (Prime)',
    sanctionConditional: 'ಷರತ್ತುಬದ್ಧ ಅನುಮೋದನೆ',
    sanctionRejected: 'ತಿರಸ್ಕೃತ / ಅತಿಯಾದ ಸಾಲ',

    footerPlatform: 'GigCred ಫೈನಾನ್ಷಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
    footerCompliance: 'ಸಮ್ಮತಿ ಆಧಾರಿತ • ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂಗ್ರಹವಿಲ್ಲ • KMS HSM ಸುರಕ್ಷಿತ',
  },
};

export const LANGUAGE_OPTIONS: { code: IndianLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

export function getTranslations(lang: IndianLanguage): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
