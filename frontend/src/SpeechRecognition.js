import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import fontPath from './assets/CinzelDecorative-Regular.ttf';
import "./SpeechRecognitionComponent.css"; 

const SpeechRecognitionComponent = () => {
  const [gif, setGif] = useState(null);
  const [recognizedWord, setRecognizedWord] = useState(''); 
  const [listeningState, setListeningState] = useState(false); 
  const [statusMessage, setStatusMessage] = useState(''); 
  const commands = [
    {
      command: "*",
      callback: (input) => processSpeech(input.toLowerCase().trim()),
    },
  ];

  const { transcript, listening } = useSpeechRecognition({ commands });

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []); 

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const processSpeech = (phrase) => {
    const tslGifPhrases = [
      "வணக்கம்", "காலை", "மதியம்", "இரவு", "இன்பம்", "துன்பம்", "மகிழ்ச்சி",
      "ஆண்", "பெண்", "அப்பா", "அம்மா", "சகோதரன்", "சகோதரி", "கணவர்", "மனைவி",
      "குழந்தை", "பிள்ளை", "ஆண் பிள்ளை", "பெண் பிள்ளை", "பள்ளி", "கல்லூரி",
      "வேலை", "படிப்பு", "மீண்டும் சந்திப்போம்","நான்","என்னுடைய","நீ","உன்னுடைய","நல்லது",
      "கெட்டது","இல்லை","ஆம்","மன்னிப்பு","தயவுசெய்து","நன்றி","நல்வரவு","செவிடு","அலுவலகம்",
      "வீடு","கடை","எப்படி இருக்கீங்க","நல்லா இருக்கேன்","உங்கள் பெயர் என்ன","அழகு","பலம்"
      ,"அவன்","அவள்","நல்லா இருக்கு"
    ];

    if (tslGifPhrases.includes(phrase)) {
      setRecognizedWord(phrase);  
      setGif(`/TSL_Gifs/${phrase}.gif`);
      setStatusMessage("Phrase found!");  
    } else {
      setGif(null);
      setStatusMessage("Phrase not found!");  
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ language: "ta-IN", continuous: true });
    setListeningState(true); 
    setStatusMessage(''); 
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setListeningState(false); 
  };

  return (
    <div className="speech-recognition-container">
      <div className="speech-recognition-box">
        <h1 style={{ marginBottom: '20px', color: '#0056b3', fontFamily: 'MyCustomFont, sans-serif' }}>
          Silent Gestures
        </h1>

        <button onClick={startListening} disabled={listeningState}>
          Start Listening
        </button>
        <button onClick={stopListening} disabled={!listeningState}>
          Stop Listening
        </button>

        <p>{listeningState ? "Listening..." : "Not listening"}</p>

        <p>{statusMessage}</p>

        <p className="recognized-text">Recognized Word: {recognizedWord}</p>

        {gif && <img src={gif} alt="TSL GIF" />}
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
