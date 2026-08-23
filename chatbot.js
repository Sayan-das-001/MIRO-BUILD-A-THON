// AI Chatbot module — rule-based sentiment/crisis detection (simulates NLP layer)
// On crisis keyword match -> writes to "Alert Service" (localStorage) for Counselor Dashboard

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'self harm',
  'self-harm', 'hurt myself', 'no reason to live', "can't go on", 'give up on life'
];

const SUPPORTIVE_RESPONSES = [
  "That sounds really hard. I'm glad you shared that with me. Can you tell me more?",
  "Thank you for opening up. Your feelings are valid.",
  "It's okay to not be okay sometimes. What's been weighing on you most?",
  "I'm here with you. Have you been able to talk to anyone else about this?",
  "That makes a lot of sense given what you're dealing with. How long have you felt this way?"
];

const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const crisisBanner = document.getElementById('crisisBanner');

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  chatInput.value = '';

  const isCrisis = CRISIS_KEYWORDS.some(kw => text.toLowerCase().includes(kw));

  setTimeout(() => {
    if (isCrisis) {
      addMessage("I hear you, and I'm really concerned about what you just shared. You don't have to go through this alone — I've notified a counselor to reach out to you.", 'bot');
      crisisBanner.classList.remove('hidden');
      triggerAlert(text);
    } else {
      const reply = SUPPORTIVE_RESPONSES[Math.floor(Math.random() * SUPPORTIVE_RESPONSES.length)];
      addMessage(reply, 'bot');
    }
  }, 500);
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function triggerAlert(message) {
  const alerts = JSON.parse(localStorage.getItem('mindcare_alerts') || '[]');
  const user = JSON.parse(localStorage.getItem('mindcare_user') || '{"email":"anonymous"}');
  alerts.unshift({
    student: user.email,
    message,
    date: new Date().toLocaleString(),
    status: 'active'
  });
  localStorage.setItem('mindcare_alerts', JSON.stringify(alerts));
}
