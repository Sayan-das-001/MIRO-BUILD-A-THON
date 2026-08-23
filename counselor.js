// Counselor Dashboard — reads Alert Service + booking data from "Encrypted database"

function renderAlerts() {
  const alerts = JSON.parse(localStorage.getItem('mindcare_alerts') || '[]');
  const container = document.getElementById('alertList');
  document.getElementById('statAlerts').textContent = alerts.filter(a => a.status === 'active').length;

  if (alerts.length === 0) {
    container.innerHTML = '<p class="empty-state">No active alerts. All clear.</p>';
    return;
  }
  container.innerHTML = alerts.map((a, i) => `
    <div class="alert-entry">
      <span><strong>${a.student}</strong> — flagged message at ${a.date}</span>
      <button class="btn-outline small" onclick="resolveAlert(${i})">${a.status === 'active' ? 'Mark Resolved' : 'Resolved ✓'}</button>
    </div>
  `).join('');
}

function resolveAlert(index) {
  const alerts = JSON.parse(localStorage.getItem('mindcare_alerts') || '[]');
  alerts[index].status = 'resolved';
  localStorage.setItem('mindcare_alerts', JSON.stringify(alerts));
  renderAlerts();
}

function renderSessions() {
  const bookings = JSON.parse(localStorage.getItem('mindcare_bookings') || '[]');
  const container = document.getElementById('sessionList');
  document.getElementById('statBookings').textContent = bookings.filter(b => b.status === 'pending').length;

  if (bookings.length === 0) {
    container.innerHTML = '<p class="empty-state">No sessions scheduled.</p>';
    return;
  }
  container.innerHTML = bookings.map(b => `
    <div class="mood-entry">
      <span>${b.student} with ${b.counselor} — ${b.date} at ${b.time}</span>
      <span style="color:var(--text-muted); font-size:0.8rem; text-transform:capitalize;">${b.status}</span>
    </div>
  `).join('');
}

function renderStats() {
  const moods = JSON.parse(localStorage.getItem('mindcare_moods') || '[]');
  const today = new Date().toLocaleDateString();
  const todayCount = moods.filter(m => new Date(m.date).toLocaleDateString() === today).length;
  document.getElementById('statCheckins').textContent = todayCount;
}

renderAlerts();
renderSessions();
renderStats();
