
document.getElementById('inquiryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const ticketId = 'GIKACE-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  const inquiry = { name, email, subject, message, ticketId, date: new Date().toLocaleString() };

  const stored = JSON.parse(localStorage.getItem('inquiries')) || [];
  stored.push(inquiry);
  localStorage.setItem('inquiries', JSON.stringify(stored));

  document.getElementById('ticketResult').innerHTML =
    `<p class='success'>Thank you, ${name}! Your inquiry has been submitted.<br> Ticket ID: <strong>${ticketId}</strong></p>`;

  document.getElementById('inquiryForm').reset();
});


// --- Hamburger Menu Toggle ---
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.navlinks');

// Open/Close the menu with the hamburger icon
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// --- NEW: Close menu when a link is clicked ---
// Select ALL nav links
const links = document.querySelectorAll('.navlinks a');

links.forEach(link => {
  link.addEventListener('click', () => {
    // We only remove 'active', we don't toggle
    navLinks.classList.remove('active');
  });
});


// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
