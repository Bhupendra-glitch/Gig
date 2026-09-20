import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[GigCred Server] Warning: GEMINI_API_KEY is not configured.');
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'GigCred Financial Intelligence Platform',
    timestamp: new Date().toISOString(),
  });
});

// Vernacular AI Financial Assistant Endpoint
app.post('/api/gemini/assistant', async (req: Request, res: Response) => {
  try {
    const { question, language = 'en', profileData, simulationState } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const ai = getGenAI();

    // Context preparation for prompt
    const languageNames: Record<string, string> = {
      en: 'English (simple, conversational Indian financial English)',
      hi: 'Hindi (हिन्दी - Devnagari script, polite, conversational and accessible)',
      ta: 'Tamil (தமிழ் - accessible colloquial Tamil financial guidance)',
      te: 'Telugu (తెలుగు - clear and encouraging)',
      bn: 'Bengali (বাংলা - clear and culturally relatable)',
      mr: 'Marathi (मराठी - practical and encouraging)',
      kn: 'Kannada (ಕನ್ನಡ - simple, everyday spoken style)',
    };

    const targetLang = languageNames[language] || 'English';

    const prompt = `
You are GigCred's vernacular AI financial mentor and credit counselor for Indian gig workers, delivery fleet riders, micro-merchants, and freelancers.
Your goal is to answer the user's financial question with clear, empathetic, practical, and mathematically grounded advice.
Do NOT use intimidating Wall Street jargon. Instead, explain terms simply (e.g. explain FOIR as "the share of your monthly earnings eaten by loans").

User Profile & Current Financial Health:
- Name / Persona: ${profileData?.name || 'Gig Worker / Micro-Merchant'}
- Gig Segment: ${profileData?.segment || 'Delivery Partner / Freelancer'}
- Monthly Inflow: ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'}
- Cashflow Score: ${profileData?.score || 685} / 900
- Liquid Savings Runway: ${profileData?.runwayDays || 18} days
- Current FOIR (Loan EMI to Income): ${profileData?.foir || '34'}%
- Total Existing Monthly EMIs: ₹${profileData?.totalEmi?.toLocaleString('en-IN') || '10,800'}
- Active Loans: ${profileData?.activeLoansSummary || '1 Bike Loan (₹4,200/mo), 1 BNPL (₹2,100/mo), 1 Informal/Personal (₹4,500/mo)'}

Interactive Simulation / Income Twin Context:
- Simulated Action: ${simulationState?.actionDescription || 'Evaluating ₹20,000 emergency loan at 24% APR'}
- Projected Simulated FOIR: ${simulationState?.projectedFoir || '42'}%
- Monte Carlo Insolvency / Default Risk: ${simulationState?.defaultRisk || 'Low-Medium (14%)'}
- Projected 60-Day Cashflow Buffer: ₹${simulationState?.projectedBuffer?.toLocaleString('en-IN') || '4,200'}

User Question: "${question}"

Respond strictly in ${targetLang}.
Format your response as structured JSON with the following schema:
{
  "summary": "Direct, empathetic answer in 2-3 sentences answering their exact question clearly.",
  "riskVerdict": "Safe" | "Caution" | "High Risk",
  "keyReasoning": [
    "First concrete reason based on cashflow/EMI calculations",
    "Second concrete reason regarding income seasonality or volatility"
  ],
  "creditBuildingAction": "One high-impact, practical step they can take this week to improve their credit health and protect their cash buffer.",
  "vernacularAudioText": "A natural, warm 2-sentence conversational voice script in ${targetLang} suitable for Text-to-Speech playback."
}
`;

    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not yet populated
      const fallbacks: Record<string, any> = {
        en: {
          summary: `Based on your monthly cashflow of ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'}, taking this loan increases your debt obligations to 42% of your income. It is within cautious reach if weekend surges remain consistent.`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'Monthly EMI burden rises from ₹10,800 to ₹13,400, shrinking your liquid runway to 12 days.',
            'Potential risk of micro-bounce during mid-month fuel-cost spikes or unexpected vehicle maintenance.'
          ],
          creditBuildingAction: 'Maintain at least ₹3,000 minimum rolling balance in your primary payout VPA to establish alternate credit stability.',
          vernacularAudioText: 'You can manage this loan with caution, but watch your fuel and weekend platform payouts closely.'
        },
        hi: {
          summary: `आपके वर्तमान ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} मासिक प्रवाह के आधार पर, यह ऋण आपकी कुल EMI को 42% FOIR तक ले जाएगा। यह सीमा के करीब है, इसलिए संभलकर निर्णय लें।`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'आपकी मासिक EMI ₹10,800 से बढ़कर ₹13,400 हो जाएगी, जिससे आपातकालीन बचत केवल 12 दिन की बचेगी।',
            'महीने के अंत में पेट्रोल खर्च या मरम्मत बढ़ने पर UPI में बाउंस का खतरा बढ़ सकता है।'
          ],
          creditBuildingAction: 'अपने प्राथमिक UPI खाते में कम से कम ₹3,000 का बफर बनाए रखें और BNPL का समय से पहले भुगतान करें।',
          vernacularAudioText: 'यह लोन लिया जा सकता है लेकिन आपकी बचत पर थोड़ा दबाव आएगा। हमने आपके लिए सुरक्षित योजना तैयार की है।'
        },
        ta: {
          summary: `உங்கள் மாதாந்திர வருமானமான ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} அடிப்படையில், இந்த கடன் உங்கள் EMI சுமையை 42% ஆக உயர்த்தும். கவனமாக முடிவெடுக்கவும்.`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'மாதாந்திர EMI ₹10,800 இலிருந்து ₹13,400 ஆக உயர்ந்து, உங்கள் சேமிப்பு காலத்தை 12 நாட்களாகக் குறைக்கும்.',
            'எரிபொருள் செலவு அல்லது எதிர்பாராத பழுது ஏற்படும் போது UPI பவுன்ஸ் அபாயம் உள்ளது.'
          ],
          creditBuildingAction: 'உங்கள் முதன்மை UPI கணக்கில் குறைந்தது ₹3,000 இருப்பை பராமரிக்கவும்.',
          vernacularAudioText: 'இந்த கடனை எச்சரிக்கையுடன் நிர்வகிக்கலாம். வார இறுதி வருமானத்தை தொடர்ந்து கண்காணிக்கவும்.'
        },
        te: {
          summary: `మీ ప్రస్తుత నెలవారీ ఆదాయం ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} ఆధారంగా, ఈ రుణం మీ EMI భారాన్ని 42% కి పెంచుతుంది. జాగ్రత్తగా నిర్ణయం తీసుకోండి.`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'నెలవారీ EMI ₹10,800 నుండి ₹13,400 కి పెరుగుతుంది, దీని వలన మీ సేవింగ్స్ 12 రోజులకు మాత్రమే సరిపోతాయి.',
            'పెట్రోల్ ఖర్చులు లేదా వాహన మరమ్మతులు పెరిగినప్పుడు చెల్లింపులు తప్పే ప్రమాదం ఉంది.'
          ],
          creditBuildingAction: 'మీ ప్రైమరీ UPI ఖాతాలో కనీసం ₹3,000 బ్యాలెన్స్ ఉంచడం ద్వారా క్రెడిట్ స్కోర్ పెంచుకోండి.',
          vernacularAudioText: 'ఈ లోన్ తీసుకోవచ్చు కానీ జాగ్రత్త అవసరం. మీ వారాంతపు ప్లాట్‌ఫారమ్ చెల్లింపులను గమనించండి.'
        },
        bn: {
          summary: `আপনার মাসিক ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} উপার্জনের ওপর ভিত্তি করে, এই ঋণ আপনার EMI বোঝা ৪২% পর্যন্ত বাড়িয়ে দেবে। সাবধানে সিদ্ধান্ত নিন।`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'মাসিক EMI ₹১০,৮০০ থেকে বেড়ে ₹১৩,৪০০ হবে, যার ফলে সঞ্চয় মাত্র ১২ দিনের থাকবে।',
            'মাসের শেষে পেট্রোল খরচ বা জরুরি মেরামতের সময় UPI বাউন্সের ঝুঁকি বাড়তে পারে।'
          ],
          creditBuildingAction: 'আপনার প্রাথমিক UPI অ্যাকাউন্টে কমপক্ষে ₹৩,০০০ ব্যালেন্স বজায় রাখুন।',
          vernacularAudioText: 'এই ঋণটি নেওয়া যেতে পারে তবে আপনার সঞ্চয়ের ওপর চাপ আসবে। সাবধানে ব্যয় করুন।'
        },
        mr: {
          summary: `तुमच्या मासिक ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} उत्पन्नाच्या आधारे, हे कर्ज तुमची EMI 42% FOIR पर्यंत वाढवेल. विचारपूर्वक निर्णय घ्या.`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'तुमची मासिक EMI ₹10,800 वरून ₹13,400 होईल, ज्यामुळे बचत केवळ 12 दिवसांची उरेल.',
            'इंधन खर्च किंवा अनपेक्षित दुरुस्ती उद्भवल्यास खात्यात बाऊन्स होण्याचा धोका वाढू शकतो.'
          ],
          creditBuildingAction: 'तुमच्या मुख्य UPI खात्यात किमान ₹3,000 चा राखीव निधी ठेवा.',
          vernacularAudioText: 'हे कर्ज काळजीपूर्वक फेडता येईल, परंतु तुमच्या इंधन आणि वीकेंड कमाईवर लक्ष ठेवा.'
        },
        kn: {
          summary: `ನಿಮ್ಮ ಮಾಸಿಕ ₹${profileData?.monthlyInflow?.toLocaleString('en-IN') || '32,000'} ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ, ಈ ಸಾಲವು ನಿಮ್ಮ EMI ಹೊರೆಯನ್ನು 42% ಗೆ ಹೆಚ್ಚಿಸುತ್ತದೆ. ಎಚ್ಚರಿಕೆಯಿಂದ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಿ.`,
          riskVerdict: 'Caution',
          keyReasoning: [
            'ಮಾಸಿಕ EMI ₹10,800 ರಿಂದ ₹13,400 ಕ್ಕೆ ಏರಿಕೆಯಾಗುತ್ತದೆ, ಉಳಿತಾಯವು 12 ದಿನಗಳಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗುತ್ತದೆ.',
            'ಇಂಧನ ವೆಚ್ಚ ಹೆಚ್ಚಳ ಅಥವಾ ತುರ್ತು ದುರಸ್ತಿ ಸಂದರ್ಭದಲ್ಲಿ UPI ಬೌನ್ಸ್ ಆಗುವ ಅಪಾಯವಿದೆ.'
          ],
          creditBuildingAction: 'ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ UPI ಖಾತೆಯಲ್ಲಿ ಕನಿಷ್ಠ ₹3,000 ಕಾಯ್ದಿರಿಸಿದ ಮೊತ್ತವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.',
          vernacularAudioText: 'ಈ ಸಾಲವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ನಿಭಾಯಿಸಬಹುದು. ವಾರಾಂತ್ಯದ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಗಳಿಕೆಯನ್ನು ಗಮನಿಸುತ್ತಿರಿ.'
        }
      };

      const fallback = fallbacks[language] || fallbacks.en;
      return res.json(fallback);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const responseText = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = {
        summary: responseText,
        riskVerdict: 'Caution',
        keyReasoning: ['Analysis based on your current cashflow profile.'],
        creditBuildingAction: 'Keep your EMI to income ratio under 40%.',
        vernacularAudioText: responseText.slice(0, 150),
      };
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('[GigCred Server] Assistant Error:', error);
    return res.status(500).json({
      error: 'Failed to generate financial advice.',
      message: error.message || 'Internal server error',
    });
  }
});

// Document AI Statement Parsing Simulation & DLP Masking
app.post('/api/document-ai/parse', async (req: Request, res: Response) => {
  try {
    const { fileName, personaId } = req.body;
    
    // Simulate Document AI parsing latency and DLP tokenization
    res.json({
      success: true,
      documentAiMetadata: {
        parser: 'Google Cloud Document AI (Bank & UPI Statement Specializer v2.1)',
        documentId: `doc_ai_${Date.now()}`,
        pagesProcessed: 3,
        ocrConfidence: 0.984,
        extractionTimeMs: 420,
      },
      dlpProtection: {
        status: 'Active',
        kmsEncryption: 'AES-256 Cloud KMS HSM Key Ring (asia-south1)',
        redactions: [
          { field: 'Aadhaar ID', maskedValue: 'XXXX-XXXX-8921', dlpRule: 'INDIA_AADHAAR_INDIVIDUAL' },
          { field: 'PAN Number', maskedValue: 'XXXXXX481K', dlpRule: 'INDIA_PAN_NUMBER' },
          { field: 'Primary Account No', maskedValue: 'XXXXXXXX7839', dlpRule: 'BANK_ACCOUNT_NUMBER' },
          { field: 'Phone Number', maskedValue: '+91 XXXXX 49210', dlpRule: 'PHONE_NUMBER' },
        ],
      },
      parsedSummary: {
        detectedBanks: ['HDFC Bank UPI', 'Paytm Payments Bank VPA'],
        statementPeriod: 'Last 90 Days',
        totalInflowsCount: 142,
        totalOutflowsCount: 388,
        inflowConsistencyScore: 0.88,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize Vite in dev or static in prod
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GigCred] Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('[GigCred Server] Fatal startup error:', err);
});
