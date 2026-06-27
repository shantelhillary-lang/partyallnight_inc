document.addEventListener('DOMContentLoaded', function () {
  const supportForm = document.getElementById('supportForm');

  if (supportForm) {
    supportForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (supportForm.checkValidity()) {
        // All fields valid
        supportForm.classList.remove('was-validated');
        document.getElementById('formSuccess').style.display = 'block';
        supportForm.reset();
        supportForm.classList.remove('was-validated');
      } else {
        // Show Bootstrap's invalid-feedback messages
        supportForm.classList.add('was-validated');
        document.getElementById('formSuccess').style.display = 'none';
      }
    });
  }

  // --------------------------------------------
  // FEATURE 2: Booking Form - Live Price Calculator + Validation
  // --------------------------------------------
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    const eventSelect = document.getElementById('eventSelect');
    const ticketType = document.getElementById('ticketType');
    const ticketQty = document.getElementById('ticketQty');

    // Approximate base prices per event (KES)
    const prices = {
      fest: { regular: 1500, vip: 5000 },
      mass: { regular: 1000, vip: 3500 },
      kamo: { regular: 1200, vip: 4000 }
    };

    // Create a price display element if it doesn't exist yet
    let priceDisplay = document.getElementById('priceDisplay');
    if (!priceDisplay) {
      priceDisplay = document.createElement('div');
      priceDisplay.id = 'priceDisplay';
      priceDisplay.className = 'mb-4 p-3 rounded bg-black border border-secondary text-warning fw-bold text-center';
      priceDisplay.textContent = 'Select an event and ticket type to see your total.';
      bookingForm.insertBefore(priceDisplay, bookingForm.querySelector('button[type="submit"]'));
    }

    function updatePrice() {
      const event = eventSelect.value;
      const type = ticketType.value;
      const qty = parseInt(ticketQty.value, 10) || 1;

      if (event && prices[event]) {
        const unitPrice = prices[event][type];
        const total = unitPrice * qty;
        priceDisplay.textContent = `Total: KES ${total.toLocaleString()} (${qty} x KES ${unitPrice.toLocaleString()})`;
      } else {
        priceDisplay.textContent = 'Select an event and ticket type to see your total.';
      }
    }

    eventSelect.addEventListener('change', updatePrice);
    ticketType.addEventListener('change', updatePrice);
    ticketQty.addEventListener('input', updatePrice);

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (bookingForm.checkValidity()) {
        alert('Booking confirmed! A confirmation email has been sent.');
        bookingForm.reset();
        priceDisplay.textContent = 'Select an event and ticket type to see your total.';
      } else {
        bookingForm.classList.add('was-validated');
      }
    });
  }
});