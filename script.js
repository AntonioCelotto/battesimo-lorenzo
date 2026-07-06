// Countdown
const eventDate = new Date('2026-08-26T18:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    document.getElementById('timer').innerHTML = "L'evento è iniziato!";
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('timer').innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// WhatsApp RSVP
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = encodeURIComponent(`Confermo la mia presenza: ${name}`);
  window.open(`https://wa.me/3938850092?text=${message}`, '_blank');
});
