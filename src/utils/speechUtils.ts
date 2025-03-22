/**
 * Utility functions for text-to-speech functionality
 */

/**
 * Speaks the given text using the Web Speech API
 * @param text The text to speak
 * @param options Optional configuration for the speech
 */
export const speak = (
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
  } = {}
): void => {
  // Check if speech synthesis is supported
  if (!('speechSynthesis' in window)) {
    console.error('Text-to-speech not supported in this browser');
    return;
  }

  // Create a new speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply options
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  
  if (options.voice) {
    utterance.voice = options.voice;
  }

  // Speak the utterance
  window.speechSynthesis.speak(utterance);
};

/**
 * Cancels any ongoing speech
 */
export const cancelSpeech = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Gets available voices for speech synthesis
 * @returns Promise that resolves to an array of available voices
 */
export const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    // If voices are already loaded
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // If voices aren't loaded yet, wait for them
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };
  });
};
