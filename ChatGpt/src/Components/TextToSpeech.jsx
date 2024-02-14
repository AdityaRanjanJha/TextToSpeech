import React, { useState, useEffect } from 'react';


export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synthesis = window.speechSynthesis;
    const populateVoiceList = () => {
      const availableVoices = synthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoiceList();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  }, []);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support text to speech functionality.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceChange = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const voiceName = selectedOption.getAttribute('data-name');
    const voiceLang = selectedOption.getAttribute('data-lang');
    const selectedVoice = voices.find(
      (voice) => voice.name === voiceName && voice.lang === voiceLang
    );

    setSelectedVoice(selectedVoice);
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <textarea
        id="text-input"
        rows="4"
        placeholder="Enter text to be spoken..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <select id="voice-select" onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} data-name={voice.name} data-lang={voice.lang}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <button id="speak-btn" onClick={handleSpeak}>
        Speak
      </button>
    </div>
  );
}

// export default TextToSpeech;
