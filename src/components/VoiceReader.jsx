import React, { useEffect, useState } from "react";

function VoiceReader() {

  const [voices, setVoices] = useState([]);

  useEffect(() => {

    const loadVoices = () => {

      const voiceList = window.speechSynthesis.getVoices();

      setVoices(voiceList);

    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, []);

  const speak = (text, language) => {

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    let voice = null;

    if (language === "kn") {

      speech.lang = "kn-IN";

      voice = voices.find(v => v.lang.includes("kn"));

    }

    else if (language === "hi") {

      speech.lang = "hi-IN";

      voice = voices.find(v => v.lang.includes("hi"));

    }

    else {

      speech.lang = "en-IN";

      voice = voices.find(v => v.lang.includes("en"));

    }

    if (voice) {
      speech.voice = voice;
    }

    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  const pause = () => {
    window.speechSynthesis.pause();
  };

  const resume = () => {
    window.speechSynthesis.resume();
  };

  return {

    speak,
    stop,
    pause,
    resume

  };

}

export default VoiceReader;