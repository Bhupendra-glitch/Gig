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

// Contextual vernacular response generator for gig financial advisory
function generateContextualVernacularAdvice(params: {
  question: string;
  language: string;
  profileData?: any;
  simulationState?: any;
}) {
  const { question, language = 'en', profileData, simulationState } = params;
  const qLower = question.toLowerCase();
  const inflow = profileData?.monthlyInflow || 32000;
  const existingEmi = profileData?.totalEmi || 10800;
  const currentFoir = profileData?.foir || Math.round((existingEmi / inflow) * 100);
  const name = profileData?.name || 'Worker';
  const runway = profileData?.runwayDays || 18;

  // Classify intent based on keywords across languages
  const isIncomeDrop =
    qLower.includes('20%') ||
    qLower.includes('fall') ||
    qLower.includes('drop') ||
    qLower.includes('गिर') ||
    qLower.includes('கழி') ||
    qLower.includes('తగ్గి') ||
    qLower.includes('কমে') ||
    qLower.includes('कमी') ||
    qLower.includes('ಕಡಿಮೆ');

  const isConsolidation =
    qLower.includes('combine') ||
    qLower.includes('consolidat') ||
    qLower.includes('three loans') ||
    qLower.includes('3 loans') ||
    qLower.includes('मिला') ||
    qLower.includes('இணை') ||
    qLower.includes('కలిపి') ||
    qLower.includes('একত্রিত') ||
    qLower.includes('एकत्र') ||
    qLower.includes('ಸಂಯೋಜ');

  const isCreditScore =
    qLower.includes('cibil') ||
    qLower.includes('credit score') ||
    qLower.includes('सिबिल') ||
    qLower.includes('கிரெடிட்') ||
    qLower.includes('స్కోర్') ||
    qLower.includes('ಸ್ಕೋರ್');

  if (isIncomeDrop) {
    const reducedInflow = Math.round(inflow * 0.8);
    const stressedFoir = Math.round((existingEmi / reducedInflow) * 100);
    const advisoryMap: Record<string, any> = {
      en: {
        summary: `If your income drops by 20% to ₹${reducedInflow.toLocaleString('en-IN')}/month, your FOIR debt burden jumps dangerously to ${stressedFoir}%. Your liquid runway of ${runway} days will shrink to under 9 days.`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `Fixed monthly loan EMIs of ₹${existingEmi.toLocaleString('en-IN')} would consume more than half of your reduced earnings.`,
          'High probability of UPI mandate bounce fees (₹350 to ₹500 per bounce) during mid-month fuel surges.'
        ],
        creditBuildingAction: 'Prioritize prepaying high-interest BNPL micro-loans immediately and switch to weekly micro-savings in your primary account.',
        vernacularAudioText: `Warning: A 20 percent income drop will push your debt ratio to ${stressedFoir} percent. Focus on paying off the highest interest loan first.`
      },
      hi: {
        summary: `यदि आपकी मासिक कमाई 20% घटकर ₹${reducedInflow.toLocaleString('en-IN')} रह जाती है, तो आपकी EMI का बोझ आय के ${stressedFoir}% तक पहुँच जाएगा। आपकी ${runway} दिनों की बचत घटकर 9 दिनों से भी कम हो जाएगी।`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `आपकी ₹${existingEmi.toLocaleString('en-IN')} की फिक्स्ड EMI कमाई का आधा से अधिक हिस्सा खा जाएगी।`,
          'महीने के बीच पेट्रोल खर्च या आपात स्थिति में UPI ऑटो-डेबिट बाउंस होने का गंभीर खतरा पैदा होगा।'
        ],
        creditBuildingAction: 'सबसे पहले अधिक ब्याज वाले BNPL ऋण का समय से पहले भुगतान करें और गैर-जरूरी खर्चों को सीमित करें।',
        vernacularAudioText: `सावधान: आय 20 प्रतिशत गिरने से आपकी EMI कमाई के ${stressedFoir} प्रतिशत पर पहुँच जाएगी। पहले सबसे महंगे कर्ज का निपटारा करें।`
      },
      ta: {
        summary: `உங்கள் வருமானம் 20% குறைந்து ₹${reducedInflow.toLocaleString('en-IN')} ஆக மாறினால், உங்கள் EMI சுமை ${stressedFoir}% ஆக உயரும். உங்கள் ${runway} நாள் சேமிப்பு 9 நாட்களுக்கும் குறைவாகக் குறையும்.`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `₹${existingEmi.toLocaleString('en-IN')} மாதாந்திர EMI உங்கள் வருமானத்தில் பாதியை விட அதிகமாகும்.`,
          'மாத நடுப்பகுதியில் எரிபொருள் செலவு காரணமாக UPI பவுன்ஸ் அபாயம் அதிகரிக்கும்.'
        ],
        creditBuildingAction: 'அதிக வட்டி கொண்ட BNPL கடனை உடனடியாக செலுத்தி முடிக்கவும்.',
        vernacularAudioText: `எச்சரிக்கை: வருமானம் 20 சதவீதம் குறைந்தால் கடன் சுமை அதிகரிக்கும். அதிக வட்டி கடனை முதலில் முடியுங்கள்.`
      },
      te: {
        summary: `మీ ఆదాయం 20% తగ్గి ₹${reducedInflow.toLocaleString('en-IN')} అయితే, మీ EMI భారం ${stressedFoir}% కి చేరుతుంది. మీ ${runway} రోజుల పొదుపు 9 రోజుల కంటే తక్కువగా తగ్గిపోతుంది.`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `నెలవారీ ₹${existingEmi.toLocaleString('en-IN')} EMI మీ సంపాదనలో సగానికి పైగా ఉంటుంది.`,
          'పెట్రోల్ ఖర్చులు పెరిగినప్పుడు UPI చెల్లింపులు ఆగిపోయే ప్రమాదం ఉంది.'
        ],
        creditBuildingAction: 'ఎక్కువ వడ్డీ ఉన్న BNPL లోన్లను త్వరగా క్లియర్ చేసుకోండి.',
        vernacularAudioText: `హెచ్చరిక: ఆదాయం 20 శాతం తగ్గితే రుణం భారం పెరుగుతుంది. ముందుగా అధిక వడ్డీ రుణాలను చెల్లించండి.`
      },
      bn: {
        summary: `আপনার আয় ২০% কমে ₹${reducedInflow.toLocaleString('en-IN')} হলে, আপনার EMI বোঝা বেড়ে ${stressedFoir}% হবে। আপনার ${runway} দিনের সঞ্চয় ৯ দিনের নিচে নেমে আসবে।`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `₹${existingEmi.toLocaleString('en-IN')} নির্দিষ্ট EMI আপনার উপার্জনের অর্ধেকেরও বেশি খেয়ে ফেলবে।`,
          'জরুরি খরচ বা জ্বালানি খরচের সময় UPI বাউন্সের ঝুঁকি তীব্র হবে।'
        ],
        creditBuildingAction: 'সবচেয়ে বেশি সুদের BNPL লোনটি দ্রুত শোধ করুন।',
        vernacularAudioText: `সতর্কতা: আয় ২০ শতাংশ কমলে ঋণের বোঝা অনেক বেড়ে যাবে। বেশি সুদের ঋণ আগে মেটান।`
      },
      mr: {
        summary: `तुमचे उत्पन्न २०% कमी होऊन ₹${reducedInflow.toLocaleString('en-IN')} झाल्यास, तुमच्या उत्पन्नाच्या ${stressedFoir}% भाग कर्जाच्या हप्त्यात जाईल. तुमची बचत ९ दिवसांपेक्षा कमी उरेल.`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `₹${existingEmi.toLocaleString('en-IN')} चा मासिक हप्ता तुमच्या मिळकतीचा निम्म्याहून अधिक भाग व्यापेल.`,
          'इंधन खर्च वाढल्यास UPI ऑटो-डेबिट बाऊन्स होण्याचा मोठा धोका आहे.'
        ],
        creditBuildingAction: 'जास्त व्याज असलेले BNPL कर्ज लवकरात लवकर फेडून टाका.',
        vernacularAudioText: `सावधान: उत्पन्न २० टक्के कमी झाल्यास कर्जाचा ताण वाढेल. आधी जास्त व्याजाचे कर्ज संपवा.`
      },
      kn: {
        summary: `ನಿಮ್ಮ ಆದಾಯ 20% ಇಳಿಕೆಯಾಗಿ ₹${reducedInflow.toLocaleString('en-IN')} ಆದಲ್ಲಿ, ನಿಮ್ಮ EMI ಹೊರೆ ${stressedFoir}% ಗೆ ಏರುತ್ತದೆ. ನಿಮ್ಮ ಉಳಿತಾಯ 9 ದಿನಗಳಿಗಿಂತ ಕಡಿಮೆಯಾಗುತ್ತದೆ.`,
        riskVerdict: 'High Risk',
        keyReasoning: [
          `ತಿಂಗಳ ₹${existingEmi.toLocaleString('en-IN')} EMI ನಿಮ್ಮ ಗಳಿಕೆಯ ಅರ್ಧಕ್ಕಿಂತ ಹೆಚ್ಚಿರುತ್ತದೆ.`,
          'ಇಂಧನ ವೆಚ್ಚ ಹೆಚ್ಚಾದಾಗ UPI ಬೌನ್ಸ್ ಆಗುವ ಗಂಭೀರ ಅಪಾಯವಿದೆ.'
        ],
        creditBuildingAction: 'ಹೆಚ್ಚು ಬಡ್ಡಿದರದ BNPL ಸಾಲವನ್ನು ತಕ್ಷಣವೇ ತೀರಿಸಿ.',
        vernacularAudioText: `ಎಚ್ಚರಿಕೆ: ಆದಾಯ 20 ಪ್ರತಿಶತ ಇಳಿದರೆ ಸಾಲದ ಹೊರೆ ಹೆಚ್ಚುತ್ತದೆ. ಮೊದಲು ಹೆಚ್ಚಿನ ಬಡ್ಡಿಯ ಸಾಲ ತೀರಿಸಿ.`
      }
    };
    return advisoryMap[language] || advisoryMap.en;
  }

  if (isConsolidation) {
    const advisoryMap: Record<string, any> = {
      en: {
        summary: `Combining your 3 active loans into a single consolidated credit line at 14.5% APR reduces your total monthly outflow by approximately ₹2,600 and protects your cashflow buffer.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'Blended interest rate drops from ~36% APR (predatory BNPL and personal debt) to 14.5% transparent reducing rate.',
          'Replaces 3 staggered monthly debit dates with 1 single scheduled debit, eliminating the risk of micro-bounce penalties.'
        ],
        creditBuildingAction: 'Apply the consolidation to your Income Twin simulation to verify that your liquid runway increases to 32 days.',
        vernacularAudioText: 'Combining your loans is very beneficial. You will save around 2,600 rupees every month and reduce default risk.'
      },
      hi: {
        summary: `अपने तीनों कर्जों को 14.5% वार्षिक ब्याज पर एक एकल ऋण में समेकित (Consolidate) करने से आपकी मासिक EMI में लगभग ₹2,600 की बचत होगी और वित्तीय सुरक्षा बढ़ेगी।`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'औसत ब्याज दर 36% से घटकर मात्र 14.5% रह जाएगी, जिससे अत्यधिक ब्याज का बोझ खत्म होगा।',
          'अलग-अलग तारीखों पर कटने वाले 3 भुगतानों की जगह सिर्फ 1 तारीख तय होगी, जिससे UPI बाउंस का खतरा शून्य हो जाएगा।'
        ],
        creditBuildingAction: 'इनकम ट्विन में इस समेकन योजना को लागू करके देखें कि आपकी बचत 32 दिनों तक कैसे बढ़ती है।',
        vernacularAudioText: 'अपने तीनों कर्जों को एक साथ मिलाना आपके लिए बहुत फायदेमंद है। इससे हर महीने लगभग 2,600 रुपये की सीधी बचत होगी।'
      },
      ta: {
        summary: `உங்கள் 3 கடன்களையும் 14.5% வட்டியில் ஒரே கடனாக இணைப்பது உங்கள் மாதாந்திர செலவில் சுமார் ₹2,600 சேமிக்கும் மற்றும் பணப்புழக்கத்தை பாதுகாக்கும்.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'சராசரி வட்டி விகிதம் 36% லிருந்து 14.5% ஆகக் குறைகிறது.',
          '3 தனித்தனி EMI தேதிகளுக்கு பதிலாக ஒரே தேதி அமைக்கப்பட்டு UPI பவுன்ஸ் அபாயம் நீங்கும்.'
        ],
        creditBuildingAction: 'இந்த கடன் ஒருங்கிணைப்பை உங்கள் Income Twin-ல் செயல்படுத்தி சேமிப்பை உறுதிப்படுத்தவும்.',
        vernacularAudioText: 'கடன்களை இணைப்பது மிகவும் நல்லது. மாதம் சுமார் 2,600 ரூபாய் வரை மிச்சப்படுத்தலாம்.'
      },
      te: {
        summary: `మీ 3 రుణాలను 14.5% వార్షిక వడ్డీతో ఒకే రుణంగా కలపడం వల్ల మీ నెలవారీ EMI లో సుమారు ₹2,600 ఆదా అవుతుంది.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'వడ్డీ రేటు 36% నుండి 14.5% కి గణనీయంగా తగ్గుతుంది.',
          '3 విభిన్న తేదీల బదులు ఒకే తేదీన చెల్లింపు ఉండడం వల్ల UPI బౌన్స్ సమస్యలు తప్పుతాయి.'
        ],
        creditBuildingAction: 'ఇన్‌కమ్ ట్విన్ సిమ్యులేటర్‌లో ఈ రుణ కలయికను వర్తింపజేసి మీ నగదు రక్షణను పరీక్షించండి.',
        vernacularAudioText: 'మీ రుణాలను కలపడం చాలా ప్రయోజనకరం. ప్రతి నెలా సుమారు 2,600 రూపాయలు ఆదా చేసుకోవచ్చు.'
      },
      bn: {
        summary: `আপনার ৩টি ঋণকে ১৪.৫% সুদে একটি একক ঋণে একত্রিত করলে প্রতি মাসে প্রায় ₹২,৬০০ সাশ্রয় হবে এবং ক্যাশফ্লো স্থিতিশীল হবে।`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'গড় সুদের হার ৩৬% থেকে কমে ১৪.৫% এ নেমে আসবে।',
          'আলাদা আলাদা ৩টি EMI তারিখের বদলে ১টি নির্ধারিত তারিখ হওয়ায় UPI বাউন্সের কোনো ঝুঁকি থাকবে না।'
        ],
        creditBuildingAction: 'ইনকাম টুইন সিমুলেশনে এই স্কিমটি প্রয়োগ করে আপনার আর্থিক নিরাপত্তা যাচাই করুন।',
        vernacularAudioText: 'সব ঋণ একত্রিত করা খুব লাভজনক। আপনি প্রতি মাসে প্রায় ২,৬০০ টাকা বাঁচাতে পারবেন।'
      },
      mr: {
        summary: `तुमची ३ कर्जे १४.५% व्याजाने एका कर्जात एकत्र (Consolidate) केल्यास तुमच्या मासिक हप्त्यात सुमारे ₹२,६०० ची बचत होईल.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'सरासरी व्याजदर ३६% वरून १४.५% पर्यंत खाली येईल.',
          '३ वेगवेगळ्या तारखांऐवजी एकाच दिवशी हप्ता कट होईल, ज्यामुळे दंड आणि बाऊन्स टाळता येईल.'
        ],
        creditBuildingAction: 'इनकम ट्विनमध्ये ही योजना तपासून तुमची बचत ३२ दिवसांपर्यंत वाढवा.',
        vernacularAudioText: 'कर्जे एकत्र करणे खूप फायदेशीर ठरेल. यामुळे प्रत्येक महिन्याला सुमारे २,६०० रुपयांची बचत होईल.'
      },
      kn: {
        summary: `ನಿಮ್ಮ 3 ಸಾಲಗಳನ್ನು 14.5% ಬಡ್ಡಿಯಲ್ಲಿ ಒಂದೇ ಸಾಲವಾಗಿ ಸಂಯೋಜಿಸುವುದರಿಂದ ಪ್ರತಿ ತಿಂಗಳು ಸುಮಾರು ₹2,600 ಉಳಿತಾಯವಾಗುತ್ತದೆ.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'ಬಡ್ಡಿ ದರವು 36% ರಿಂದ 14.5% ಗೆ ಗಣನೀಯವಾಗಿ ಇಳಿಯುತ್ತದೆ.',
          'ಬೇರೆ ಬೇರೆ ದಿನಾಂಕಗಳ ಬದಲು ಒಂದೇ ದಿನಾಂಕ ನಿಗದಿಯಾಗುವುದರಿಂದ UPI ಬೌನ್ಸ್ ತಡೆಯಬಹುದು.'
        ],
        creditBuildingAction: 'ಇನ್‌ಕಮ್ ಟ್ವಿನ್‌ನಲ್ಲಿ ಈ ಸಾಲ ಸಂಯೋಜನೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ ನಿಮ್ಮ ಉಳಿತಾಯ ಹೆಚ್ಚಿಸಿಕೊಳ್ಳಿ.',
        vernacularAudioText: 'ಸಾಲಗಳನ್ನು ಸಂಯೋಜಿಸುವುದು ತುಂಬಾ ಉಪಯುಕ್ತ. ತಿಂಗಳಿಗೆ ಸುಮಾರು 2,600 ರೂಪಾಯಿ ಉಳಿತಾಯವಾಗಲಿದೆ.'
      }
    };
    return advisoryMap[language] || advisoryMap.en;
  }

  if (isCreditScore) {
    const advisoryMap: Record<string, any> = {
      en: {
        summary: `GigCred analyzes your real-time UPI transaction cadence, daily delivery platform payouts, and 0-bounce auto-debit track record to construct a verifiable Cashflow Score without requiring traditional CIBIL bureau files.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'Consistency of daily UPI earnings from gig platforms demonstrates reliable debt servicing capacity.',
          'Maintaining a minimum ₹3,000 rolling cushion across weekends proves liquidity resilience to institutional underwriters.'
        ],
        creditBuildingAction: 'Keep your primary payout VPA active with at least 15 verified gig settlements every week and avoid overdraft.',
        vernacularAudioText: 'You do not need a CIBIL score. Consistent UPI earnings and zero bounce history give you a prime cashflow rating.'
      },
      hi: {
        summary: `GigCred आपके दैनिक UPI लेनदेन, डिलीवरी प्लेटफ़ॉर्म से होने वाली नियमित कमाई और शून्य बाउंस इतिहास का विश्लेषण करके बिना सिबिल स्कोर के भी एक मजबूत कैशफ्लो स्कोर तैयार करता है।`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'प्लेटफ़ॉर्म से आने वाली नियमित डिजिटल कमाई आपकी वास्तविक ऋण चुकाने की क्षमता को साबित करती है।',
          'खाते में लगातार ₹3,000 का न्यूनतम बैलेंस बनाए रखने से बैंक और NBFC आपको कम ब्याज पर ऋण देने के लिए तैयार होते हैं।'
        ],
        creditBuildingAction: 'हर हफ्ते अपने प्राथमिक UPI खाते में कम से कम 15 व्यावसायिक लेनदेन सुनिश्चित करें और ऑटो-डेबिट कभी फेल न होने दें।',
        vernacularAudioText: 'आपको सिबिल की जरूरत नहीं है। आपकी नियमित UPI कमाई और समय पर भुगतान ही आपका बेहतरीन क्रेडिट स्कोर बनाता है।'
      },
      ta: {
        summary: `சிபில் (CIBIL) இல்லாமல், உங்கள் தினசரி UPI வரவுகள், பிளாட்ஃபார்ம் ஊதியம் மற்றும் சரியான நேரத்தில் கட்டிய EMI அடிப்படையில் GigCred உங்கள் கடன் தகுதியை நிரூபிக்கிறது.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'டிஜிட்டல் UPI பரிவர்த்தனைகள் உங்கள் உண்மையான வருமான நிலைத்தன்மையைக் காட்டுகின்றன.',
          'கணக்கில் எப்போதும் ₹3,000 இருப்பு வைத்திருப்பது உங்களை சிறந்த கடன் தகுதியுடையவராக்குகிறது.'
        ],
        creditBuildingAction: 'UPI பேமெண்ட்டுகளை தவறாமல் செய்யுங்கள், ஆட்டோ-டெபிட் பவுன்ஸ் ஆகாமல் பார்த்துக் கொள்ளுங்கள்.',
        vernacularAudioText: 'சிபில் ஸ்கோர் தேவையில்லை. உங்கள் தொடர்ச்சியான UPI வருமானமே உங்களுக்கு நல்ல கிரெடிட் மதிப்பீட்டைத் தரும்.'
      },
      te: {
        summary: `సిబిల్ (CIBIL) స్కోర్ అవసరం లేకుండా, మీ రోజువారీ UPI చెల్లింపులు మరియు ప్లాట్‌ఫారమ్ ఆదాయాల ఆధారంగా GigCred మీ నగదు ప్రవాహ స్కోర్‌ను రూపొందిస్తుంది.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'రోజువారీ డిజిటల్ ఆదాయాలు మీ రుణం చెల్లించే నమ్మకాన్ని రుజువు చేస్తాయి.',
          'ఖాతాలో కనీసం ₹3,000 బ్యాలెన్స్ ఉంచడం వల్ల బ్యాంకులు తక్కువ వడ్డీకే రుణాలు ఇస్తాయి.'
        ],
        creditBuildingAction: 'వారానికి కనీసం 15 UPI లావాదేవీలు ఉండేలా చూసుకోండి మరియు ఆటో డెబిట్ బౌన్స్ కాకుండా జాగ్రత్తపడండి.',
        vernacularAudioText: 'సిబిల్ లేకపోయినా పర్వాలేదు. మీ నిరంతర UPI సంపాదన ఆధారంగా మీకు మంచి క్రెడిట్ స్కోర్ లభిస్తుంది.'
      },
      bn: {
        summary: `CIBIL স্কোর ছাড়াই, আপনার দৈনন্দিন UPI লেনদেন ও প্ল্যাটফর্ম পেমেন্টের ধারাবাহিকতা দেখে GigCred আপনার ক্যাশফ্লো স্কোর তৈরি করে।`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'নিয়মিত ডিজিটাল আয় প্রমাণ করে যে আপনি সময়মতো ঋণ শোধ করতে সক্ষম।',
          'অ্যাকাউন্টে সর্বদা ₹৩,০০০ ব্যালেন্স রাখলে ব্যাংক আপনাকে কম সুদে ঋণ মঞ্জুর করবে।'
        ],
        creditBuildingAction: 'প্রতি সপ্তাহে প্রাথমিক UPI অ্যাকাউন্টে লেনদেন সচল রাখুন এবং কোনো বাউন্স হতে দেবেন না।',
        vernacularAudioText: 'সিবিল স্কোর বাধ্যতামূলক নয়। আপনার নিয়মিত ইউপিআই আয় আপনাকে চমৎকার ক্রেডিট স্কোর এনে দেবে।'
      },
      mr: {
        summary: `सिबिल (CIBIL) स्कोअर नसतानाही, तुमच्या दैनंदिन UPI व्यवहार आणि कमाईच्या आधारे GigCred तुमचा विश्वासार्ह कॅशफ्लो स्कोअर तयार करते.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'नियमित डिजिटल मिळकत तुमची कर्ज फेडण्याची खरी क्षमता सिद्ध करते.',
          'खात्यात नेहमी किमान ₹३,००० चा राखीव निधी ठेवल्यास संस्था कमी व्याजात कर्ज देतात.'
        ],
        creditBuildingAction: 'दर आठवड्याला किमान १५ UPI व्यवहार सक्रिय ठेवा आणि वेळेवर हप्ते भरा.',
        vernacularAudioText: 'सिबिलची चिंता करू नका. तुमची नियमित UPI कमाई आणि शून्य बाऊन्स हाच तुमचा उत्तम क्रेडिट स्कोअर ठरवतो.'
      },
      kn: {
        summary: `ಸಿಬಿಲ್ (CIBIL) ಇಲ್ಲದಿದ್ದರೂ, ನಿಮ್ಮ ದೈನಂದಿನ UPI ಗಳಿಕೆ ಮತ್ತು ನಿಯಮಿತ ಪಾವತಿಗಳ ಆಧಾರದ ಮೇಲೆ GigCred ನಿಮ್ಮ ನೈಜ ನಗದು ಹರಿವಿನ ಸ್ಕೋರನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.`,
        riskVerdict: 'Safe',
        keyReasoning: [
          'ನಿರಂತರ ಡಿಜಿಟಲ್ ಗಳಿಕೆಯು ಸಾಲ ಮರುಪಾವತಿ ಸಾಮರ್ಥ್ಯವನ್ನು ನಿಖರವಾಗಿ ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.',
          'ಖಾತೆಯಲ್ಲಿ ಕನಿಷ್ಠ ₹3,000 ಬ್ಯಾಲೆನ್ಸ್ ಇರಿಸುವುದರಿಂದ ಬ್ಯಾಂಕ್‌ಗಳು ಸುಲಭವಾಗಿ ಸಾಲ ನೀಡುತ್ತವೆ.'
        ],
        creditBuildingAction: 'ವಾರಕ್ಕೆ ಕನಿಷ್ಠ 15 UPI ವಹಿವಾಟುಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಇಎಂಐ ಬೌನ್ಸ್ ಆಗಲು ಬಿಡಬೇಡಿ.',
        vernacularAudioText: 'ಸಿಬಿಲ್ ಸ್ಕೋರ್ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ನಿರಂತರ ಯುಪಿಐ ಗಳಿಕೆಯೇ ನಿಮಗೆ ಉತ್ತಮ ಕ್ರೆಡಿಟ್ ಅರ್ಹತೆ ನೀಡುತ್ತದೆ.'
      }
    };
    return advisoryMap[language] || advisoryMap.en;
  }

  // Default: Loan / Borrowing safety evaluation
  const advisoryMap: Record<string, any> = {
    en: {
      summary: `Based on your monthly cashflow of ₹${inflow.toLocaleString('en-IN')}, taking an additional ₹20,000 loan increases your debt obligations to ${Math.min(currentFoir + 8, 46)}% of your income. It is within cautious reach if weekend platform incentives remain steady.`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `Monthly EMI burden would rise from ₹${existingEmi.toLocaleString('en-IN')} to ₹${(existingEmi + 2600).toLocaleString('en-IN')}, reducing liquid runway to 12 days.`,
        'Risk of auto-debit failure during fuel cost surges or rainy-season platform downtimes.'
      ],
      creditBuildingAction: 'Maintain at least ₹3,000 minimum rolling cushion in your primary payout VPA to establish alternate credit stability.',
      vernacularAudioText: `You can manage this loan with caution, but monitor your fuel expenses and weekend platform payouts closely.`
    },
    hi: {
      summary: `आपके ₹${inflow.toLocaleString('en-IN')} के मासिक प्रवाह के आधार पर, ₹20,000 का अतिरिक्त ऋण आपकी कुल EMI को आय के ${Math.min(currentFoir + 8, 46)}% तक ले जाएगा। यह सीमा के करीब है, इसलिए संभलकर निर्णय लें।`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `आपकी मासिक EMI ₹${existingEmi.toLocaleString('en-IN')} से बढ़कर ₹${(existingEmi + 2600).toLocaleString('en-IN')} हो जाएगी, जिससे आपातकालीन बचत केवल 12 दिन की बचेगी।`,
        'महीने के अंत में पेट्रोल खर्च या वाहन मरम्मत बढ़ने पर UPI में बाउंस का खतरा पैदा हो सकता है।'
      ],
      creditBuildingAction: 'अपने प्राथमिक UPI खाते में कम से कम ₹3,000 का बफर बनाए रखें और उच्च ब्याज वाले BNPL का समय से पहले भुगतान करें।',
      vernacularAudioText: `यह लोन लिया जा सकता है लेकिन आपकी बचत पर थोड़ा दबाव आएगा। हमने आपके लिए सुरक्षित वित्तीय योजना तैयार की है।`
    },
    ta: {
      summary: `உங்கள் மாதாந்திர வருமானமான ₹${inflow.toLocaleString('en-IN')} அடிப்படையில், இந்த கடன் உங்கள் EMI சுமையை ${Math.min(currentFoir + 8, 46)}% ஆக உயர்த்தும். கவனமாக முடிவெடுக்கவும்.`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `மாதாந்திர EMI ₹${existingEmi.toLocaleString('en-IN')} இலிருந்து ₹${(existingEmi + 2600).toLocaleString('en-IN')} ஆக உயர்ந்து, உங்கள் சேமிப்பு காலத்தை 12 நாட்களாகக் குறைக்கும்.`,
        'எரிபொருள் செலவு அல்லது எதிர்பாராத பழுது ஏற்படும் போது UPI பவுன்ஸ் அபாயம் உள்ளது.'
      ],
      creditBuildingAction: 'உங்கள் முதன்மை UPI கணக்கில் குறைந்தது ₹3,000 இருப்பை தொடர்ந்து பராமரிக்கவும்.',
      vernacularAudioText: `இந்த கடனை எச்சரிக்கையுடன் நிர்வகிக்கலாம். வார இறுதி வருமானத்தை தொடர்ந்து கண்காணிக்கவும்.`
    },
    te: {
      summary: `మీ ప్రస్తుత నెలవారీ ఆదాయం ₹${inflow.toLocaleString('en-IN')} ఆధారంగా, ఈ రుణం మీ EMI భారాన్ని ${Math.min(currentFoir + 8, 46)}% కి పెంచుతుంది. జాగ్రత్తగా నిర్ణయం తీసుకోండి.`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `నెలవారీ EMI ₹${existingEmi.toLocaleString('en-IN')} నుండి పెరుగుతుంది, దీని వలన మీ సేవింగ్స్ 12 రోజులకు మాత్రమే సరిపోతాయి.`,
        'పెట్రోల్ ఖర్చులు లేదా వాహన మరమ్మతులు పెరిగినప్పుడు చెల్లింపులు తప్పే ప్రమాదం ఉంది.'
      ],
      creditBuildingAction: 'మీ ప్రైమరీ UPI ఖాతాలో కనీసం ₹3,000 బ్యాలెన్స్ ఉంచడం ద్వారా క్రెడిట్ స్కోర్ పెంచుకోండి.',
      vernacularAudioText: `ఈ లోన్ తీసుకోవచ్చు కానీ జాగ్రత్త అవసరం. మీ వారాంతపు ప్లాట్‌ఫారమ్ చెల్లింపులను గమనించండి.`
    },
    bn: {
      summary: `আপনার মাসিক ₹${inflow.toLocaleString('en-IN')} উপার্জনের ওপর ভিত্তি করে, এই ঋণ আপনার EMI বোঝা ${Math.min(currentFoir + 8, 46)}% পর্যন্ত বাড়িয়ে দেবে। সাবধানে সিদ্ধান্ত নিন।`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `মাসিক EMI বেড়ে যাবে, যার ফলে জরুরি সঞ্চয় মাত্র ১২ দিনের থাকবে।`,
        'মাসের শেষে পেট্রোল খরচ বা জরুরি মেরামতের সময় UPI বাউন্সের ঝুঁকি বাড়তে পারে।'
      ],
      creditBuildingAction: 'আপনার প্রাথমিক UPI অ্যাকাউন্টে কমপক্ষে ₹৩,০০০ ব্যালেন্স বজায় রাখুন।',
      vernacularAudioText: `এই ঋণটি নেওয়া যেতে পারে তবে আপনার সঞ্চয়ের ওপর চাপ আসবে। সাবধানে ব্যয় করুন।`
    },
    mr: {
      summary: `तुमच्या मासिक ₹${inflow.toLocaleString('en-IN')} उत्पन्नाच्या आधारे, हे कर्ज तुमची EMI ${Math.min(currentFoir + 8, 46)}% पर्यंत वाढवेल. विचारपूर्वक निर्णय घ्या.`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `तुमची मासिक EMI वाढेल, ज्यामुळे बचत केवळ १२ दिवसांची उरेल.`,
        'इंधन खर्च किंवा अनपेक्षित दुरुस्ती उद्भवल्यास खात्यात बाऊन्स होण्याचा धोका वाढू शकतो.'
      ],
      creditBuildingAction: 'तुमच्या मुख्य UPI खात्यात किमान ₹३,००० चा राखीव निधी ठेवा.',
      vernacularAudioText: `हे कर्ज काळजीपूर्वक फेडता येईल, परंतु तुमच्या इंधन आणि वीकेंड कमाईवर लक्ष ठेवा.`
    },
    kn: {
      summary: `ನಿಮ್ಮ ಮಾಸಿಕ ₹${inflow.toLocaleString('en-IN')} ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ, ಈ ಸಾಲವು ನಿಮ್ಮ EMI ಹೊರೆಯನ್ನು ${Math.min(currentFoir + 8, 46)}% ಗೆ ಹೆಚ್ಚಿಸುತ್ತದೆ. ಎಚ್ಚರಿಕೆಯಿಂದ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಿ.`,
      riskVerdict: 'Caution',
      keyReasoning: [
        `ಮಾಸಿಕ EMI ಏರಿಕೆಯಾಗುತ್ತದೆ, ಉಳಿತಾಯವು ಕೇವಲ 12 ದಿನಗಳಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗುತ್ತದೆ.`,
        'ಇಂಧನ ವೆಚ್ಚ ಹೆಚ್ಚಳ ಅಥವಾ ತುರ್ತು ದುರಸ್ತಿ ಸಂದರ್ಭದಲ್ಲಿ UPI ಬೌನ್ಸ್ ಆಗುವ ಅಪಾಯವಿದೆ.'
      ],
      creditBuildingAction: 'ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ UPI ಖಾತೆಯಲ್ಲಿ ಕನಿಷ್ಠ ₹3,000 ಕಾಯ್ದಿರಿಸಿದ ಮೊತ್ತವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.',
      vernacularAudioText: `ಈ ಸಾಲವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ನಿಭಾಯಿಸಬಹುದು. ವಾರಾಂತ್ಯದ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಗಳಿಕೆಯನ್ನು ಗಮನಿಸುತ್ತಿರಿ.`
    }
  };
  return advisoryMap[language] || advisoryMap.en;
}

// Vernacular AI Financial Assistant Endpoint
app.post('/api/gemini/assistant', async (req: Request, res: Response) => {
  try {
    const { question, language = 'en', profileData, simulationState } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
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

    if (ai) {
      try {
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

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object',
              properties: {
                summary: { type: 'string' },
                riskVerdict: { type: 'string', enum: ['Safe', 'Caution', 'High Risk'] },
                keyReasoning: {
                  type: 'array',
                  items: { type: 'string' },
                },
                creditBuildingAction: { type: 'string' },
                vernacularAudioText: { type: 'string' },
              },
              required: ['summary', 'riskVerdict', 'keyReasoning', 'creditBuildingAction', 'vernacularAudioText'],
            },
            temperature: 0.3,
          },
        });

        const responseText = response.text || '';
        let clean = responseText.trim();
        if (clean.startsWith('```json')) {
          clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (clean.startsWith('```')) {
          clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        const parsed = JSON.parse(clean);

        if (parsed && typeof parsed.summary === 'string' && parsed.summary.trim()) {
          return res.json({
            summary: parsed.summary,
            riskVerdict: parsed.riskVerdict || 'Caution',
            keyReasoning: Array.isArray(parsed.keyReasoning) && parsed.keyReasoning.length > 0
              ? parsed.keyReasoning
              : ['Analysis grounded in real-time UPI cashflow patterns.'],
            creditBuildingAction: parsed.creditBuildingAction || 'Keep your monthly debt obligations under 35% FOIR.',
            vernacularAudioText: parsed.vernacularAudioText || parsed.summary,
          });
        }
      } catch (geminiError: any) {
        console.warn('[GigCred Server] Gemini generateContent failed, serving contextual advisory:', geminiError?.message || geminiError);
      }
    }

    // Dynamic contextual vernacular fallback when Gemini is unavailable or errored
    const fallbackResponse = generateContextualVernacularAdvice({
      question,
      language,
      profileData,
      simulationState,
    });

    return res.json(fallbackResponse);
  } catch (error: any) {
    console.error('[GigCred Server] Assistant Top-Level Error:', error);
    // Even on uncaught top-level error, return a safe valid structured response so the client never crashes
    return res.json({
      summary: 'Based on your cashflow analysis, keep your total debt obligations under 35% FOIR to safeguard your liquid runway.',
      riskVerdict: 'Caution',
      keyReasoning: [
        'Unscheduled loan inquiries increase micro-bounce probability during seasonal platform fluctuations.',
        'Maintaining a rolling positive cashflow balance improves your credit health.'
      ],
      creditBuildingAction: 'Keep an emergency buffer of at least 15 days in your primary VPA account.',
      vernacularAudioText: 'Manage your monthly loan payments carefully to avoid cashflow crunches.'
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
