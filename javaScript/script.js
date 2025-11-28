// ===== Scroll Highlight =====
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".navlinks a");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  if (window.scrollY < 200) current = sections[0].getAttribute("id");
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  navAnchors.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== Inquiry Form =====
const form = document.getElementById('inquiryForm');
if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Create error spans for each field dynamically
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    let span = document.createElement('span');
    span.className = 'error';
    span.style.color = 'red';
    span.style.fontSize = '0.85rem';
    span.style.display = 'block';
    span.style.marginTop = '3px';
    input.parentNode.insertBefore(span, input.nextSibling);
  });

  const nameError = nameInput.nextElementSibling;
  const emailError = emailInput.nextElementSibling;
  const subjectError = subjectInput.nextElementSibling;
  const messageError = messageInput.nextElementSibling;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // ===== Name Validation =====
    const namePattern = /^[a-zA-Z\s]+$/; // regex 
    if (nameInput.value.trim().length < 2 || !namePattern.test(nameInput.value.trim())) {
      nameError.textContent = "Name must be at least 2 letters and contain only alphabets.";
      nameInput.style.border = '2px solid red';
      valid = false;
    } else {
      nameError.textContent = "";
      nameInput.style.border = '';
    }

    // ===== Email Validation =====
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.style.border = '2px solid red';
      valid = false;
    } else {
      emailError.textContent = "";
      emailInput.style.border = '';
    }

    // ===== Subject Validation =====
    if (subjectInput.value.trim().length < 3) {
      subjectError.textContent = "Subject must be at least 3 characters.";
      subjectInput.style.border = '2px solid red';
      valid = false;
    } else {
      subjectError.textContent = "";
      subjectInput.style.border = '';
    }

    // ===== Message Validation =====
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      messageInput.style.border = '2px solid red';
      valid = false;
    } else {
      messageError.textContent = "";
      messageInput.style.border = '';
    }

    // ===== If All Valid, Submit =====
    if (valid) {
      const ticketId = 'GIKACE-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      const inquiry = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        ticketId,
        date: new Date().toLocaleString()
      };

      const stored = JSON.parse(localStorage.getItem('inquiries')) || [];
      stored.push(inquiry);
      localStorage.setItem('inquiries', JSON.stringify(stored));

      const ticketResult = document.getElementById('ticketResult');
      ticketResult.innerHTML = `<p class='success'>Thank you, ${nameInput.value.trim()}! Your inquiry has been submitted.<br>Ticket ID: <strong>${ticketId}</strong></p>`;
      ticketResult.style.color = 'green';

      form.reset();

      // Clear borders after reset
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => input.style.border = '');
    }
  });
}

// ===== Hamburger Menu =====
const menuIcon = document.querySelector('.menu-icon');
const navContainer = document.querySelector('.navlinks');
if (menuIcon && navContainer) {
  menuIcon.addEventListener('click', () => navContainer.classList.toggle('active'));
  navAnchors.forEach(link => link.addEventListener('click', () => navContainer.classList.remove('active')));
  window.addEventListener("scroll", () => navContainer.classList.remove("active"));
}

// ===== Footer Year =====
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
