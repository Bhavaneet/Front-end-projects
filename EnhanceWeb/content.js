// Variables to manage text-to-speech state
let isSpeaking = false;
let utterance;

// Function to toggle high contrast mode
function toggleHighContrast() {
  const existingStyle = document.getElementById('high-contrast-style');
  if (existingStyle) {
    existingStyle.remove();
  } else {
    const style = document.createElement('style');
    style.id = 'high-contrast-style';
    style.textContent = `
      body {
        background-color: #000 !important;
        color: #fff !important;
      }
      a {
        color: #1e90ff !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Function to start text-to-speech
function startTextToSpeech() {
  if (!isSpeaking) {
    utterance = new SpeechSynthesisUtterance(document.body.innerText);
    utterance.onend = () => { isSpeaking = false; };
    speechSynthesis.speak(utterance);
    isSpeaking = true;
  }
}

// Function to stop text-to-speech
function stopTextToSpeech() {
  if (isSpeaking) {
    speechSynthesis.cancel(); // Stop any ongoing speech synthesis
    isSpeaking = false;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleHighContrast') {
    toggleHighContrast();
  } else if (message.action === 'toggleTextToSpeech') {
    if (isSpeaking) {
      stopTextToSpeech();
    } else {
      startTextToSpeech();
    }
  }
});
