import React, { useState, useEffect } from 'react';
import { MapPin, Leaf, Sun, Droplets } from 'lucide-react';

const Ai = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [formData, setFormData] = useState({
    season: '',
    state: '',
    district: '',
    fieldSize: '',
    fieldUnit: 'acres',
    soilType: '',
    waterSource: '',
    seedVariety: '',
    fertilizerPreference: '',
    cropType: '',
    previousCrop: '',
    farmingExperience: '',
    budget: '',
    laborAvailability: ''
  });

  const translations = {
    english: {
      title: "AI Farming Assistant",
      subtitle: "Get personalized farming recommendations based on your location and requirements",
      season: "Season",
      state: "State",
      district: "District",
      fieldSize: "Field Size",
      soilType: "Soil Type",
      waterSource: "Water Source",
      seedVariety: "Seed Variety",
      fertilizerPreference: "Fertilizer Preference",
      cropType: "Preferred Crop Type",
      previousCrop: "Previous Season Crop",
      farmingExperience: "Farming Experience",
      budget: "Budget Range (₹)",
      laborAvailability: "Labor Availability",
      getRecommendations: "Get AI Recommendations",
      gettingRecommendations: "Getting Recommendations...",
      aiRecommendations: "AI Farming Recommendations",
      locationDetected: "Location detected",
      selectSeason: "Select Season",
      selectState: "Select State",
      selectDistrict: "Select District",
      enterSize: "Enter size",
      selectSoilType: "Select Soil Type",
      selectWaterSource: "Select Water Source",
      enterSeedVariety: "Enter seed variety name",
      selectPreference: "Select Preference",
      selectCropType: "Select Crop Type",
      enterPreviousCrop: "Enter previous crop name",
      selectExperience: "Select Experience Level",
      selectBudget: "Select Budget Range",
      selectLabor: "Select Labor Availability",
      fillAllFields: "Please fill in all required fields",
      allowLocation: "Please allow location access for accurate recommendations",
      errorMessage: "Failed to get AI recommendations. Please try again.",
      farmingTips: "Smart Farming Tips"
    },
    hindi: {
      title: "AI कृषि सहायक",
      subtitle: "अपने स्थान और आवश्यकताओं के आधार पर व्यक्तिगत कृषि सिफारिशें प्राप्त करें",
      season: "मौसम",
      state: "राज्य",
      district: "जिला",
      fieldSize: "खेत का आकार",
      soilType: "मिट्टी का प्रकार",
      waterSource: "पानी का स्रोत",
      seedVariety: "बीज की किस्म",
      fertilizerPreference: "उर्वरक प्राथमिकता",
      cropType: "पसंदीदा फसल प्रकार",
      previousCrop: "पिछली मौसम की फसल",
      farmingExperience: "कृषि अनुभव",
      budget: "बजट सीमा (₹)",
      laborAvailability: "मजदूर की उपलब्धता",
      getRecommendations: "AI सिफारिशें प्राप्त करें",
      gettingRecommendations: "सिफारिशें प्राप्त कर रहे हैं...",
      aiRecommendations: "AI कृषि सिफारिशें",
      locationDetected: "स्थान का पता लगाया गया",
      selectSeason: "मौसम चुनें",
      selectState: "राज्य चुनें",
      selectDistrict: "जिला चुनें",
      enterSize: "आकार दर्ज करें",
      selectSoilType: "मिट्टी का प्रकार चुनें",
      selectWaterSource: "पानी का स्रोत चुनें",
      enterSeedVariety: "बीज की किस्म का नाम दर्ज करें",
      selectPreference: "प्राथमिकता चुनें",
      selectCropType: "फसल प्रकार चुनें",
      enterPreviousCrop: "पिछली फसल का नाम दर्ज करें",
      selectExperience: "अनुभव स्तर चुनें",
      selectBudget: "बजट सीमा चुनें",
      selectLabor: "मजदूर की उपलब्धता चुनें",
      fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
      allowLocation: "सटीक सिफारिशों के लिए कृपया स्थान पहुंच की अनुमति दें",
      errorMessage: "AI सिफारिशें प्राप्त करने में विफल। कृपया पुनः प्रयास करें।",
      farmingTips: "स्मार्ट खेती टिप्स"
    },
    punjabi: {
      title: "AI ਖੇਤੀ ਸਹਾਇਕ",
      subtitle: "ਆਪਣੇ ਸਥਾਨ ਅਤੇ ਲੋੜਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਨਿੱਜੀ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
      season: "ਮੌਸਮ",
      state: "ਰਾਜ",
      district: "ਜ਼ਿਲਾ",
      fieldSize: "ਖੇਤ ਦਾ ਆਕਾਰ",
      soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
      waterSource: "ਪਾਣੀ ਦਾ ਸਰੋਤ",
      seedVariety: "ਬੀਜ ਦੀ ਕਿਸਮ",
      fertilizerPreference: "ਖਾਦ ਦੀ ਤਰਜੀਹ",
      cropType: "ਪਸੰਦੀਦਾ ਫਸਲ ਕਿਸਮ",
      previousCrop: "ਪਿਛਲੀ ਮੌਸਮ ਦੀ ਫਸਲ",
      farmingExperience: "ਖੇਤੀ ਦਾ ਤਜਰਬਾ",
      budget: "ਬਜਟ ਸੀਮਾ (₹)",
      laborAvailability: "ਮਜ਼ਦੂਰ ਦੀ ਉਪਲਬਧਤਾ",
      getRecommendations: "AI ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
      gettingRecommendations: "ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰ ਰਹੇ ਹਾਂ...",
      aiRecommendations: "AI ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ",
      locationDetected: "ਸਥਾਨ ਦਾ ਪਤਾ ਲਗਾਇਆ ਗਿਆ",
      selectSeason: "ਮੌਸਮ ਚੁਣੋ",
      selectState: "ਰਾਜ ਚੁਣੋ",
      selectDistrict: "ਜ਼ਿਲਾ ਚੁਣੋ",
      enterSize: "ਆਕਾਰ ਦਾਖਲ ਕਰੋ",
      selectSoilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ",
      selectWaterSource: "ਪਾਣੀ ਦਾ ਸਰੋਤ ਚੁਣੋ",
      enterSeedVariety: "ਬੀਜ ਦੀ ਕਿਸਮ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ",
      selectPreference: "ਤਰਜੀਹ ਚੁਣੋ",
      selectCropType: "ਫਸਲ ਦੀ ਕਿਸਮ ਚੁਣੋ",
      enterPreviousCrop: "ਪਿਛਲੀ ਫਸਲ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ",
      selectExperience: "ਤਜਰਬੇ ਦਾ ਪੱਧਰ ਚੁਣੋ",
      selectBudget: "ਬਜਟ ਸੀਮਾ ਚੁਣੋ",
      selectLabor: "ਮਜ਼ਦੂਰ ਦੀ ਉਪਲਬਧਤਾ ਚੁਣੋ",
      fillAllFields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖੇਤਰ ਭਰੋ",
      allowLocation: "ਸਹੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਥਾਨ ਦੀ ਪਹੁੰਚ ਦੀ ਆਗਿਆ ਦਿਓ",
      errorMessage: "AI ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      farmingTips: "ਸਮਾਰਟ ਖੇਤੀ ਟਿਪਸ"
    },
    haryanvi: {
      title: "AI खेती सहायक",
      subtitle: "अपणे ठाम अर जरूरतां के हिसाब तै खेती की सलाह लो",
      season: "मौसम",
      state: "प्रदेश",
      district: "जिला",
      fieldSize: "खेत का साइज",
      soilType: "माटी की किस्म",
      waterSource: "पाणी का सोर्स",
      seedVariety: "बीज की किस्म",
      fertilizerPreference: "खाद की पसंद",
      cropType: "फसल की किस्म",
      previousCrop: "पिछली फसल",
      farmingExperience: "खेती का तजुर्बा",
      budget: "बजट (₹)",
      laborAvailability: "मजदूर की सुविधा",
      getRecommendations: "AI सलाह लो",
      gettingRecommendations: "सलाह ले रहे हैं...",
      aiRecommendations: "AI खेती की सलाह",
      locationDetected: "जगह पता चल गई",
      selectSeason: "मौसम चुणो",
      selectState: "प्रदेश चुणो",
      selectDistrict: "जिला चुणो",
      enterSize: "साइज भरो",
      selectSoilType: "माटी की किस्म चुणो",
      selectWaterSource: "पाणी का सोर्स चुणो",
      enterSeedVariety: "बीज की किस्म का नाम भरो",
      selectPreference: "पसंद चुणो",
      selectCropType: "फसल की किस्म चुणो",
      enterPreviousCrop: "पिछली फसल का नाम भरो",
      selectExperience: "तजुर्बा चुणो",
      selectBudget: "बजट चुणो",
      selectLabor: "मजदूर की सुविधा चुणो",
      fillAllFields: "सारी जरूरी जानकारी भरो",
      allowLocation: "सही सलाह के लिए जगह की इजाजत दो",
      errorMessage: "AI सलाह नहीं मिली। फेर कोशिश करो।",
      farmingTips: "स्मार्ट खेती के टिप्स"
    },
    bhojpuri: {
      title: "AI खेती सहायक",
      subtitle: "अपना जगह अउर जरूरत के हिसाब से खेती के सलाह मिला",
      season: "मौसम",
      state: "राज्य",
      district: "जिला",
      fieldSize: "खेत के साइज",
      soilType: "माटी के किस्म",
      waterSource: "पानी के सोर्स",
      seedVariety: "बीया के किस्म",
      fertilizerPreference: "खाद के पसंद",
      cropType: "फसल के किस्म",
      previousCrop: "पिछली फसल",
      farmingExperience: "खेती के तजुर्बा",
      budget: "बजट (₹)",
      laborAvailability: "मजदूर के सुविधा",
      getRecommendations: "AI सलाह मिला",
      gettingRecommendations: "सलाह ले रहल बानी...",
      aiRecommendations: "AI खेती के सलाह",
      locationDetected: "जगह के पता चल गइल",
      selectSeason: "मौसम चुना",
      selectState: "राज्य चुना",
      selectDistrict: "जिला चुना",
      enterSize: "साइज भरा",
      selectSoilType: "माटी के किस्म चुना",
      selectWaterSource: "पानी के सोर्स चुना",
      enterSeedVariety: "बीया के किस्म के नाम भरा",
      selectPreference: "पसंद चुना",
      selectCropType: "फसल के किस्म चुना",
      enterPreviousCrop: "पिछली फसल के नाम भरा",
      selectExperience: "तजुर्बा चुना",
      selectBudget: "बजट चुना",
      selectLabor: "मजदूर के सुविधा चुना",
      fillAllFields: "सब जरूरी जानकारी भरा",
      allowLocation: "सही सलाह खातिर जगह के इजाजत दा",
      errorMessage: "AI सलाह ना मिलल। फेर कोशिश करा।",
      farmingTips: "स्मार्ट खेती के टिप्स"
    },
    tamil: {
      title: "AI விவசாய உதவியாளர்",
      subtitle: "உங்கள் இடம் மற்றும் தேவைகளின் அடிப்படையில் தனிப்பட்ட விவசாய பரிந்துரைகளைப் பெறுங்கள்",
      season: "பருவம்",
      state: "மாநிலம்",
      district: "மாவட்டம்",
      fieldSize: "நில அளவு",
      soilType: "மண்ணின் வகை",
      waterSource: "நீர் ஆதாரம்",
      seedVariety: "விதை வகை",
      fertilizerPreference: "உரம் விருப்பம்",
      cropType: "விருப்பமான பயிர் வகை",
      previousCrop: "முந்தைய பருவ பயிர்",
      farmingExperience: "விவசாய அனுபவம்",
      budget: "பட்ஜெட் வரம்பு (₹)",
      laborAvailability: "தொழிலாளர் கிடைக்கும் தன்மை",
      getRecommendations: "AI பரிந்துரைகளைப் பெறுங்கள்",
      gettingRecommendations: "பரிந்துரைகளைப் பெறுகிறோம்...",
      aiRecommendations: "AI விவசாய பரிந்துரைகள்",
      locationDetected: "இடம் கண்டறியப்பட்டது",
      selectSeason: "பருவத்தைத் தேர்ந்தெடுக்கவும்",
      selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
      selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
      enterSize: "அளவை உள்ளிடவும்",
      selectSoilType: "மண் வகையைத் தேர்ந்தெடுக்கவும்",
      selectWaterSource: "நீர் ஆதாரத்தைத் தேர்ந்தெடுக்கவும்",
      enterSeedVariety: "விதை வகையின் பெயரை உள்ளிடவும்",
      selectPreference: "விருப்பத்தைத் தேர்ந்தெடுக்கவும்",
      selectCropType: "பயிர் வகையைத் தேர்ந்தெடுக்கவும்",
      enterPreviousCrop: "முந்தைய பயிரின் பெயரை உள்ளிடவும்",
      selectExperience: "அனுபவ நிலையைத் தேர்ந்தெடுக்கவும்",
      selectBudget: "பட்ஜெட் வரம்பைத் தேர்ந்தெடுக்கவும்",
      selectLabor: "தொழிலாளர் கிடைக்கும் தன்மையைத் தேர்ந்தெடுக்கவும்",
      fillAllFields: "தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்பவும்",
      allowLocation: "துல்லியமான பரிந்துரைகளுக்காக தயவுசெய்து இட அணுகலை அனுமதிக்கவும்",
      errorMessage: "AI பரிந்துரைகளைப் பெறுவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      farmingTips: "ஸ்மார்ட் விவசாய குறிப்புகள்"
    },
    marathi: {
      title: "AI शेती सहायक",
      subtitle: "तुमच्या ठिकाणी आणि गरजांच्या आधारे वैयक्तिक शेती शिफारसी मिळवा",
      season: "हंगाम",
      state: "राज्य",
      district: "जिल्हा",
      fieldSize: "शेताचा आकार",
      soilType: "मातीचा प्रकार",
      waterSource: "पाण्याचा स्रोत",
      seedVariety: "बियाण्याची जात",
      fertilizerPreference: "खतांची प्राधान्यता",
      cropType: "पसंतीचा पीक प्रकार",
      previousCrop: "मागील हंगामातील पीक",
      farmingExperience: "शेतीचा अनुभव",
      budget: "बजेट मर्यादा (₹)",
      laborAvailability: "मजुरांची उपलब्धता",
      getRecommendations: "AI शिफारसी मिळवा",
      gettingRecommendations: "शिफारसी मिळवत आहे...",
      aiRecommendations: "AI शेती शिफारसी",
      locationDetected: "ठिकाण शोधले गेले",
      selectSeason: "हंगाम निवडा",
      selectState: "राज्य निवडा",
      selectDistrict: "जिल्हा निवडा",
      enterSize: "आकार प्रविष्ट करा",
      selectSoilType: "मातीचा प्रकार निवडा",
      selectWaterSource: "पाण्याचा स्रोत निवडा",
      enterSeedVariety: "बियाण्याच्या जातीचे नाव प्रविष्ट करा",
      selectPreference: "प्राधान्यता निवडा",
      selectCropType: "पीक प्रकार निवडा",
      enterPreviousCrop: "मागील पिकाचे नाव प्रविष्ट करा",
      selectExperience: "अनुभवाची पातळी निवडा",
      selectBudget: "बजेट मर्यादा निवडा",
      selectLabor: "मजुरांची उपलब्धता निवडा",
      fillAllFields: "कृपया सर्व आवश्यक क्षेत्रे भरा",
      allowLocation: "अचूक शिफारसींसाठी कृपया स्थान प्रवेशास परवानगी द्या",
      errorMessage: "AI शिफारसी मिळवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
      farmingTips: "स्मार्ट शेती टिप्स"
    },
    kannada: {
      title: "AI ಕೃಷಿ ಸಹಾಯಕ",
      subtitle: "ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಅವಶ್ಯಕತೆಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
      season: "ಋತು",
      state: "ರಾಜ್ಯ",
      district: "ಜಿಲ್ಲೆ",
      fieldSize: "ಹೊಲದ ಗಾತ್ರ",
      soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
      waterSource: "ನೀರಿನ ಮೂಲ",
      seedVariety: "ಬೀಜದ ವಿಧ",
      fertilizerPreference: "ಗೊಬ್ಬರದ ಆದ್ಯತೆ",
      cropType: "ಆದ್ಯತೆಯ ಬೆಳೆ ಪ್ರಕಾರ",
      previousCrop: "ಹಿಂದಿನ ಋತುವಿನ ಬೆಳೆ",
      farmingExperience: "ಕೃಷಿ ಅನುಭವ",
      budget: "ಬಜೆಟ್ ವ್ಯಾಪ್ತಿ (₹)",
      laborAvailability: "ಕಾರ್ಮಿಕರ ಲಭ್ಯತೆ",
      getRecommendations: "AI ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
      gettingRecommendations: "ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುತ್ತಿದ್ದೇವೆ...",
      aiRecommendations: "AI ಕೃಷಿ ಶಿಫಾರಸುಗಳು",
      locationDetected: "ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ",
      selectSeason: "ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectDistrict: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      enterSize: "ಗಾತ್ರವನ್ನು ನಮೂದಿಸಿ",
      selectSoilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectWaterSource: "ನೀರಿನ ಮೂಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      enterSeedVariety: "ಬೀಜದ ವಿಧದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      selectPreference: "ಆದ್ಯತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectCropType: "ಬೆಳೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      enterPreviousCrop: "ಹಿಂದಿನ ಬೆಳೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      selectExperience: "ಅನುಭವದ ಮಟ್ಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectBudget: "ಬಜೆಟ್ ವ್ಯಾಪ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      selectLabor: "ಕಾರ್ಮಿಕರ ಲಭ್ಯತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      fillAllFields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
      allowLocation: "ನಿಖರವಾದ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ಸ್ಥಳದ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿಸಿ",
      errorMessage: "AI ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      farmingTips: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆಗಳು"
    }
  };

  const t = translations[language];

  const seasons = {
    common: [
      { value: 'Kharif', label: { 
        english: 'Kharif (June-October)', 
        hindi: 'खरीफ (जून-अक्टूबर)', 
        punjabi: 'ਖਰੀਫ (ਜੂਨ-ਅਕਤੂਬਰ)',
        haryanvi: 'खरीफ (जून-अक्टूबर)',
        bhojpuri: 'खरीफ (जून-अक्टूबर)',
        tamil: 'கரீஃப் (ஜூன்-அக்டோபர்)',
        marathi: 'खरीप (जून-ऑक्टोबर)',
        kannada: 'ಖರೀಫ್ (ಜೂನ್-ಅಕ್ಟೋಬರ್)'
      }},
      { value: 'Rabi', label: { 
        english: 'Rabi (November-April)', 
        hindi: 'रबी (नवंबर-अप्रैल)', 
        punjabi: 'ਰਬੀ (ਨਵੰਬਰ-ਅਪ੍ਰੈਲ)',
        haryanvi: 'रबी (नवंबर-अप्रैल)',
        bhojpuri: 'रबी (नवंबर-अप्रैल)',
        tamil: 'ரபி (நவம்பர்-ஏப்ரல்)',
        marathi: 'रब्बी (नोव्हेंबर-एप्रिल)',
        kannada: 'ರಬಿ (ನವೆಂಬರ್-ಏಪ್ರಿಲ್)'
      }},
      { value: 'Zaid', label: { 
        english: 'Zaid (April-June)', 
        hindi: 'जायद (अप्रैल-जून)', 
        punjabi: 'ਜ਼ਾਇਦ (ਅਪ੍ਰੈਲ-ਜੂਨ)',
        haryanvi: 'जायद (अप्रैल-जून)',
        bhojpuri: 'जायद (अप्रैल-जून)',
        tamil: 'சைத் (ஏப்ரல்-ஜூன்)',
        marathi: 'झायद (एप्रिल-जून)',
        kannada: 'ಜಾಯಿದ್ (ಏಪ್ರಿಲ್-ಜೂನ್)'
      }}
    ]
  };

  const budgetRanges = [
    { value: 'Low', label: '₹10,000 - ₹50,000' },
    { value: 'Medium', label: '₹50,000 - ₹2,00,000' },
    { value: 'High', label: '₹2,00,000 - ₹5,00,000' },
    { value: 'Very High', label: '₹5,00,000+' }
  ];

  const laborOptions = [
    { value: 'Family Only', label: 'केवल पारिवारिक / Family Only' },
    { value: 'Limited Hired', label: 'सीमित मजदूर / Limited Workers' },
    { value: 'Adequate Hired', label: 'पर्याप्त मजदूर / Adequate Workers' },
    { value: 'Abundant', label: 'प्रचुर मजदूर / Abundant Workers' }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const districtsByState = {
    'Andhra Pradesh': ['Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Annamayya', 'Bapatla', 'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    'Arunachal Pradesh': ['Anjaw', 'Capital Complex Itanagar', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
    'Assam': ['Bajali', 'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tamulpur', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
    'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Khairagarh-Chhuikhadan-Gandai', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh-Bilaigarh', 'Sukma', 'Surguja', 'Surajpur'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara', 'Vijayapura', 'Yadgir'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar', 'Mandla', 'Mandsaur', 'Morena', 'Narmadapuram', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
    'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills', 'Mairang', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
    'Nagaland': ['Chumoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Anupgarh', 'Balotra', 'Banswara', 'Baran', 'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Deeg', 'Dholpur', 'Didwana-Kuchaman', 'Dudu', 'Dungarpur', 'Gangapur City', 'Hanumangarh', 'Jaipur', 'Jaipur Rural', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kekri', 'Khairthal-Tijara', 'Kotputli-Behror', 'Kota', 'Nagaur', 'Neem ka Thana', 'Pali', 'Phalodi', 'Pratapgarh', 'Rajsamand', 'Salumbar', 'Sanchore', 'Sawai Madhopur', 'Shahpura', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
    'Sikkim': ['Gangtok', 'Gyalshing', 'Mangan', 'Namchi', 'Pakyong', 'Soreng'],
    'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'],
    'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddh Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Maldah', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']
  };

  const soilTypes = [
    { value: 'Alluvial', label: 'जलोढ़ मिट्टी / Alluvial Soil' },
    { value: 'Black', label: 'काली मिट्टी / Black Cotton Soil' },
    { value: 'Red', label: 'लाल मिट्टी / Red Soil' },
    { value: 'Laterite', label: 'लेटराइट मिट्टी / Laterite Soil' },
    { value: 'Desert', label: 'रेगिस्तानी मिट्टी / Desert Soil' },
    { value: 'Mountain', label: 'पर्वतीय मिट्टी / Mountain Soil' }
  ];

  const waterSources = [
    { value: 'Rain-fed', label: 'वर्षा आधारित / Rain-fed' },
    { value: 'Irrigation - Canal', label: 'नहर सिंचाई / Canal Irrigation' },
    { value: 'Irrigation - Tube well', label: 'ट्यूबवेल सिंचाई / Tube well' },
    { value: 'Irrigation - River', label: 'नदी सिंचाई / River Irrigation' },
    { value: 'Mixed', label: 'मिश्रित स्रोत / Mixed Sources' }
  ];

  const fertilizerPreferences = [
    { value: 'Organic', label: 'जैविक / Organic Only' },
    { value: 'Chemical', label: 'रासायनिक / Chemical Only' },
    { value: 'Mixed', label: 'मिश्रित / Mixed (Organic + Chemical)' }
  ];

  const cropTypes = [
    { value: 'Cereals', label: 'अनाज / Cereals (Rice, Wheat, Maize)' },
    { value: 'Pulses', label: 'दालें / Pulses (Dal, Lentils)' },
    { value: 'Oilseeds', label: 'तिलहन / Oilseeds (Mustard, Groundnut)' },
    { value: 'Cash Crops', label: 'नकदी फसल / Cash Crops (Cotton, Sugarcane)' },
    { value: 'Vegetables', label: 'सब्जियां / Vegetables' },
    { value: 'Fruits', label: 'फल / Fruits' },
    { value: 'Spices', label: 'मसाले / Spices' }
  ];

  const experienceLevels = [
    { value: 'Beginner', label: 'नया किसान / Beginner (0-2 years)' },
    { value: 'Intermediate', label: 'अनुभवी / Intermediate (3-10 years)' },
    { value: 'Experienced', label: 'बहुत अनुभवी / Expert (10+ years)' }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { district: '' })
    }));
  };

  const validateForm = () => {
    const requiredFields = ['season', 'state', 'district', 'fieldSize', 'soilType', 'waterSource', 'seedVariety', 'fertilizerPreference', 'cropType', 'previousCrop', 'farmingExperience', 'budget', 'laborAvailability'];
    return requiredFields.every(field => formData[field].toString().trim() !== '');
  };

  const generatePrompt = () => {
    const languageInstructions = {
      english: 'English',
      hindi: 'Hindi (Devanagari script) with simple, farmer-friendly vocabulary',
      punjabi: 'Punjabi (Gurmukhi script) with simple, farmer-friendly vocabulary',
      haryanvi: 'Haryanvi dialect with simple, farmer-friendly vocabulary',
      bhojpuri: 'Bhojpuri dialect with simple, farmer-friendly vocabulary',
      tamil: 'Tamil with simple, farmer-friendly vocabulary',
      marathi: 'Marathi with simple, farmer-friendly vocabulary',
      kannada: 'Kannada with simple, farmer-friendly vocabulary'
    };

    const responseLanguage = languageInstructions[language];
    
    return `You are an expert agricultural consultant AI specifically designed for Indian farmers. A farmer needs comprehensive, easy-to-understand farming guidance. Provide detailed recommendations in ${responseLanguage}.

IMPORTANT INSTRUCTIONS:
- Use SIMPLE, EASY-TO-UNDERSTAND language that a rural farmer can comprehend
- Provide PRACTICAL, ACTIONABLE advice with more details to help the farmer
- Include SPECIFIC dates, quantities, methods, names of fertilizers, pesticides, seeds with varieties, costs (based on current state-specific rates in Indian Rupees), uses, pros and cons
- Use bullet points and numbered lists for clarity
- Mention local crop varieties and practices specific to the state and district
- Include cost estimates in Indian Rupees with breakdowns
- Provide step-by-step instructions with additional tips for better yields
- Enhance all sections with more in-depth information, examples, alternatives, and warnings

FARMER'S DETAILS:
- Location: ${formData.state}, ${formData.district} (Lat: ${location.latitude}, Long: ${location.longitude})
- Season: ${formData.season}
- Field Size: ${formData.fieldSize} ${formData.fieldUnit}
- Soil Type: ${formData.soilType}
- Water Source: ${formData.waterSource}
- Current Seed Variety: ${formData.seedVariety}
- Fertilizer Preference: ${formData.fertilizerPreference}
- Preferred Crop Type: ${formData.cropType}
- Previous Season Crop: ${formData.previousCrop}
- Farming Experience: ${formData.farmingExperience}
- Budget: ${formData.budget}
- Labor Availability: ${formData.laborAvailability}

Provide comprehensive guidance in ${responseLanguage} covering:

## 🌱 सबसे अच्छी फसल की सलाह (Best Crop Recommendations)
- इस मौसम और जगह के लिए टॉप 3 फसलें (with local varieties specific to state/district)
- हर फसल से कितना फायदा होगा (₹ में, with yield estimates, market rates)
- कौन सी फसल सबसे कम रिस्क में है (with reasons, alternatives if one fails)
- Pros and cons of each crop, including suitability to soil, water, previous crop

## 📅 बुवाई की पूरी जानकारी (Complete Sowing Guide)
- सटीक बुवाई की तारीख (कौन सा महीना, कौन सा हफ्ता, considering local climate)
- ${formData.fieldSize} ${formData.fieldUnit} के लिए कितना बीज चाहिए (specific seed names, varieties recommended for the region, cost per kg based on state rates, pros/cons of each variety, where to buy)
- बीज कैसे बोएं (गहराई, दूरी, तरीका, with diagrams in text, seed treatment methods)
- बुवाई से पहले खेत कैसे तैयार करें (plowing depth, tools, organic amendments, costs)

## 🌾 खाद और पोषण (Fertilizer & Nutrition)
- मिट्टी की जांच कब और कैसे कराएं (local labs, costs, interpretation guide)
- कौन सी खाद कब डालें (specific names like Urea, DAP, Compost; quantities in kg/acre at different stages; costs based on state rates; uses, pros/cons; alternatives based on preference)
  * बुवाई के समय: कितनी मात्रा (किग्रा/एकड़), specific products
  * 30 दिन बाद: कितनी मात्रा, specific products
  * फूल आने पर: कितनी मात्रा, specific products
- जैविक खाद कैसे बनाएं और इस्तेमाल करें (recipes, quantities, benefits, costs)
- हर बार की लागत कितनी होगी (detailed breakdown)
- Nutrient deficiency symptoms and remedies

## 💧 पानी की व्यवस्था (Water Management)
- कितने दिन में पानी दें (frequency based on crop stage, soil, weather)
- एक बार में कितना पानी (liters/acre or hours, methods like drip/sprinkler with costs, pros/cons)
- पानी देने का सबसे अच्छा समय (morning/evening, reasons)
- पानी बचाने के आसान तरीके (mulching types, costs; rainwater harvesting setups)
- बारिश का पानी कैसे रोकें (drainage techniques, tools)

## 🐛 कीड़े और बीमारी से बचाव (Pest & Disease Control)
- मुख्य कीड़ों की पहचान (आसान भाषा में, symptoms, images in text description)
- घरेलू नुस्खे (नीम, हल्दी आदि; recipes, application methods)
- रासायनिक दवा कब और कैसे छिड़कें (specific pesticide names like Chlorpyrifos, quantities, costs based on state rates, uses, pros/cons, safety precautions)
- हर महीने क्या सावधानी रखें (monitoring tips, IPM strategies)
- दवाइयों की लागत (breakdown, alternatives)

## 🔧 खेत की देखभाल (Field Care)
- निराई-गुड़ाई कब करें (कितने दिन बाद, methods, tools with costs)
- कौन से औजार इस्तेमाल करें (recommendations, pros/cons, where to get)
- मजदूर की जरूरत (कितने लोग, कितने दिन, based on labor availability)
- अन्य जरूरी काम (pruning, staking, etc., with details)

## ✂️ कटाई और भंडारण (Harvesting & Storage)
- फसल कब काटें (पकने के संकेत, maturity indices)
- कैसे काटें और सुखाएं (methods, tools, time required)
- भंडारण के आसान तरीके (structures, treatments, costs, pros/cons)
- नुकसान से कैसे बचें (pest control in storage, moisture control)

## 💰 बेचने की रणनीति (Marketing Strategy)
- कब बेचना सबसे फायदेमंद होगा (peak seasons, price trends)
- स्थानीय मंडी की जानकारी (names, distances, tips)
- कीमत कैसे बढ़ाएं (value addition, grading, packaging with costs)
- सरकारी योजनाओं का फायदा कैसे उठाएं (specific schemes like PM-KISAN, application process)

## ⚠️ जोखिम से बचाव (Risk Management)
- मौसम की मार से कैसे बचें (crop insurance details, costs; weather apps)
- फसल बीमा की जानकारी (specific policies, premiums based on state)
- अगर फसल खराब हो जाए तो क्या करें (salvage methods, government aid)
- वैकल्पिक कमाई के तरीके (intercropping, livestock integration)

## 📊 पूरा बजट विश्लेषण (Complete Budget Analysis)
- कुल खर्च: ₹____ (detailed breakdown by category: seeds, fertilizers, pesticides, labor, water, etc.)
- अपेक्षित आय: ₹____ (yield x market rate, with variations)
- शुद्ध लाभ: ₹____
- प्रति एकड़ लागत breakdown (pie chart in text, sensitivity analysis)

Please ensure all advice is:
- PRACTICAL and can be implemented by a farmer with ${formData.farmingExperience} experience
- SPECIFIC to ${formData.state}, ${formData.district} region, including local rates and resources
- Within the budget range of ${formData.budget}
- Suitable for ${formData.laborAvailability} labor situation
- Written in SIMPLE ${responseLanguage} that any farmer can understand
- Enhanced with more details, examples, pros/cons, costs for fertilizers, pesticides, seeds

Use emojis, bullet points, and clear headings to make information easily digestible.`;
  };

  const callGeminiAPI = async (prompt) => {
    const API_KEY = 'AIzaSyCn8GW0eBowyLCfETjR5sXpZeBqJZixaq0';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert(t.fillAllFields);
      return;
    }

    if (!location.latitude || !location.longitude) {
      alert(t.allowLocation);
      return;
    }

    setLoading(true);
    try {
      const prompt = generatePrompt();
      const response = await callGeminiAPI(prompt);
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
      alert(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const availableDistricts = districtsByState[formData.state] || [];

  const languageOptions = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'punjabi', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'haryanvi', name: 'हरियाणवी', flag: '🇮🇳' },
    { code: 'bhojpuri', name: 'भोजपुरी', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-6 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-green-100">
          <div className="text-center">
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
                  {t.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {t.subtitle}
                </p>
              </div>
            </div>

            {/* Language Selection */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    language === lang.code
                      ? 'bg-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Location Status */}
            {location.latitude && location.longitude && (
              <div className="flex justify-center items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {t.locationDetected}: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Season */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  {t.season} *
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectSeason}</option>
                  {seasons.common.map(season => (
                    <option key={season.value} value={season.value}>
                      {season.label[language] || season.label.english}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {t.state} *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectState}</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  {t.district} *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                  disabled={!formData.state}
                >
                  <option value="">{t.selectDistrict}</option>
                  {availableDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Field Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🏞️ {t.fieldSize} *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="fieldSize"
                    value={formData.fieldSize}
                    onChange={handleInputChange}
                    placeholder={t.enterSize}
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                    required
                    min="0.1"
                    step="0.1"
                  />
                  <select
                    name="fieldUnit"
                    value={formData.fieldUnit}
                    onChange={handleInputChange}
                    className="w-28 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  💰 {t.budget} *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectBudget}</option>
                  {budgetRanges.map(budget => (
                    <option key={budget.value} value={budget.value}>{budget.label}</option>
                  ))}
                </select>
              </div>

              {/* Labor Availability */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  👥 {t.laborAvailability} *
                </label>
                <select
                  name="laborAvailability"
                  value={formData.laborAvailability}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectLabor}</option>
                  {laborOptions.map(labor => (
                    <option key={labor.value} value={labor.value}>{labor.label}</option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🌍 {t.soilType} *
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectSoilType}</option>
                  {soilTypes.map(soil => (
                    <option key={soil.value} value={soil.value}>{soil.label}</option>
                  ))}
                </select>
              </div>

              {/* Water Source */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  {t.waterSource} *
                </label>
                <select
                  name="waterSource"
                  value={formData.waterSource}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectWaterSource}</option>
                  {waterSources.map(source => (
                    <option key={source.value} value={source.value}>{source.label}</option>
                  ))}
                </select>
              </div>

              {/* Crop Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🌾 {t.cropType} *
                </label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectCropType}</option>
                  {cropTypes.map(crop => (
                    <option key={crop.value} value={crop.value}>{crop.label}</option>
                  ))}
                </select>
              </div>

              {/* Seed Variety */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🌱 {t.seedVariety} *
                </label>
                <input
                  type="text"
                  name="seedVariety"
                  value={formData.seedVariety}
                  onChange={handleInputChange}
                  placeholder={t.enterSeedVariety}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Fertilizer Preference */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🧪 {t.fertilizerPreference} *
                </label>
                <select
                  name="fertilizerPreference"
                  value={formData.fertilizerPreference}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectPreference}</option>
                  {fertilizerPreferences.map(pref => (
                    <option key={pref.value} value={pref.value}>{pref.label}</option>
                  ))}
                </select>
              </div>

              {/* Previous Crop */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  📋 {t.previousCrop} *
                </label>
                <input
                  type="text"
                  name="previousCrop"
                  value={formData.previousCrop}
                  onChange={handleInputChange}
                  placeholder={t.enterPreviousCrop}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Farming Experience */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  🎓 {t.farmingExperience} *
                </label>
                <select
                  name="farmingExperience"
                  value={formData.farmingExperience}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  required
                >
                  <option value="">{t.selectExperience}</option>
                  {experienceLevels.map(exp => (
                    <option key={exp.value} value={exp.value}>{exp.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-80 relative overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.gettingRecommendations}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Leaf className="w-6 h-6" />
                    {t.getRecommendations}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                {t.aiRecommendations}
              </h2>
            </div>
            <div className="p-8">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <div 
                  className="whitespace-pre-line font-medium text-base leading-8"
                  dangerouslySetInnerHTML={{
                    __html: result
                      .replace(/##\s*(.*)/g, '<h2 class="text-2xl font-bold text-green-700 mb-4 mt-8 flex items-center gap-2">$1</h2>')
                      .replace(/###\s*(.*)/g, '<h3 class="text-xl font-semibold text-blue-600 mb-3 mt-6">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="text-green-600">$1</em>')
                      .replace(/•\s*(.*)/g, '<li class="ml-4 mb-2 text-gray-700">• $1</li>')
                      .replace(/(\d+\.)\s*(.*)/g, '<div class="bg-blue-50 p-4 rounded-lg mb-3 border-l-4 border-blue-500"><span class="font-bold text-blue-700">$1</span> <span class="text-gray-800">$2</span></div>')
                      .replace(/(₹[\d,]+)/g, '<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">$1</span>')
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;