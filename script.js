const CONFIG = {
  eventDate: "2026-08-26T18:00:00+02:00",
  whatsappNumber: "3938850092"
};

function pad(value){
  return String(value).padStart(2, "0");
}

function updateCountdown(){
  const target = new Date(CONFIG.eventDate).getTime();
  const now = Date.now();
  const distance = target - now;

  if(distance <= 0){
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
  document.getElementById("hours").textContent = pad(Math.floor((distance / (1000 * 60 * 60)) % 24));
  document.getElementById("minutes").textContent = pad(Math.floor((distance / (1000 * 60)) % 60));
  document.getElementById("seconds").textContent = pad(Math.floor((distance / 1000) % 60));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const guestList = document.getElementById("guestList");
const addGuestButton = document.getElementById("addGuest");
let guestIndex = 0;

addGuestButton.addEventListener("click", () => {
  guestIndex++;

  const item = document.createElement("div");
  item.className = "guest-item";

  item.innerHTML = `
    <div class="guest-item-title">
      <span>Ospite aggiuntivo ${guestIndex}</span>
      <button type="button" class="removeGuest">Rimuovi</button>
    </div>
    <input type="text" placeholder="Nome ospite" class="guestName">
    <input type="text" placeholder="Cognome ospite" class="guestSurname">
  `;

  item.querySelector(".removeGuest").addEventListener("click", () => {
    item.remove();
  });

  guestList.appendChild(item);
});

function getGuestsText(){
  const guests = [...document.querySelectorAll(".guest-item")];

  if(guests.length === 0){
    return "Nessun ospite aggiuntivo";
  }

  return guests.map((guest, index) => {
    const name = guest.querySelector(".guestName").value.trim();
    const surname = guest.querySelector(".guestSurname").value.trim();

    if(!name && !surname){
      return null;
    }

    return `${index + 1}. ${name} ${surname}`.trim();
  }).filter(Boolean).join(" | ") || "Nessun ospite aggiuntivo";
}

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const message = [
    "CONFERMA BATTESIMO LORENZO",
    `Nome: ${name} ${surname}`,
    `Telefono: ${phone}`,
    `Ospiti aggiuntivi: ${getGuestsText()}`,
    `Note: ${notes || "Nessuna nota"}`
  ].join(" | ");

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});
