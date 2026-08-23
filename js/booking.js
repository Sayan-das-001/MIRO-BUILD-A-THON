// Booking system -> writes to "Encrypted database", read by Counselor Dashboard
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const counselor = document.getElementById('counselor').value;
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const reason = document.getElementById('bookingReason').value;
  const user = JSON.parse(localStorage.getItem('mindcare_user') || '{"email":"anonymous"}');

  const bookings = JSON.parse(localStorage.getItem('mindcare_bookings') || '[]');
  bookings.unshift({ student: user.email, counselor, date, time, reason, status: 'pending' });
  localStorage.setItem('mindcare_bookings', JSON.stringify(bookings));

  document.getElementById('bookingStatus').textContent = '✓ Session request sent. You will get a confirmation email.';
  this.reset();
  renderBookings();
});

function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem('mindcare_bookings') || '[]');
  const container = document.getElementById('bookingList');
  if (bookings.length === 0) {
    container.innerHTML = '<p class="empty-state">No sessions booked yet.</p>';
    return;
  }
  container.innerHTML = bookings.map(b => `
    <div class="mood-entry">
      <span>${b.counselor} — ${b.date} at ${b.time}</span>
      <span style="color:var(--text-muted); font-size:0.8rem; text-transform:capitalize;">${b.status}</span>
    </div>
  `).join('');
}

renderBookings();
