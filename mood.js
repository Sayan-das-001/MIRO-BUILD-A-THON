// Mood tracking -> writes to "Encrypted database" (simulated via localStorage)
const moodLabels = { 5: '😄 Great', 4: '🙂 Good', 3: '😐 Okay', 2: '😔 Low', 1: '😢 Struggling' };
let selectedMood = null;

document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.dataset.mood;
  });
});

document.getElementById('saveMood').addEventListener('click', () => {
  if (!selectedMood) {
    document.getElementById('moodStatus').textContent = 'Please select a mood first.';
    return;
  }
  const note = document.getElementById('moodNote').value;
  const entries = JSON.parse(localStorage.getItem('mindcare_moods') || '[]');
  entries.unshift({
    mood: selectedMood,
    note,
    date: new Date().toLocaleString()
  });
  localStorage.setItem('mindcare_moods', JSON.stringify(entries));
  document.getElementById('moodStatus').textContent = '✓ Check-in saved.';
  document.getElementById('moodNote').value = '';
  renderMoodHistory();
});

function renderMoodHistory() {
  const entries = JSON.parse(localStorage.getItem('mindcare_moods') || '[]');
  const container = document.getElementById('moodHistory');
  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-state">No check-ins yet. Log your first mood above.</p>';
    return;
  }
  container.innerHTML = entries.slice(0, 10).map(e => `
    <div class="mood-entry">
      <span>${moodLabels[e.mood]} ${e.note ? '— ' + escapeHtml(e.note) : ''}</span>
      <span style="color:var(--text-muted); font-size:0.8rem;">${e.date}</span>
    </div>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

renderMoodHistory();
