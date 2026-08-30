// Tailwind CSS configuration for custom colors and font family
// (moved from <head>)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-green': '#1AB773',
        'light-green': '#E8F5EE',
        'dark-text': '#1F2937',
        'gray-text': '#4B5563',
        'light-gray-bg': '#F9FAFB',
        'peach-bg': '#FDF4EC',
        'peach-text': '#D98218',
        'orange-btn': '#F59E0B',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    }
  }
};

// ---------- Video language & player modals (moved from Hero section) ----------
const playButton = document.getElementById("playButton");
const languageModal = document.getElementById("languageModal");
const closeLanguageModal = document.getElementById("closeLanguageModal");

const videoModal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const youtubeVideo = document.getElementById("youtubeVideo");

const hindiVideoBtn = document.getElementById("hindiVideo");
const englishVideoBtn = document.getElementById("englishVideo");

const hindiUrl = "https://www.youtube.com/embed/ILr__iSoUmg?autoplay=1";
const englishUrl = "https://www.youtube.com/embed/fMnxZTTXzfQ?autoplay=1";

// Open language selection
if (playButton) {
  playButton.addEventListener("click", () => {
    languageModal.classList.remove("hidden");
  });
}

// Close language modal
if (closeLanguageModal) {
  closeLanguageModal.addEventListener("click", () => {
    languageModal.classList.add("hidden");
  });
}

// When user picks Hindi
if (hindiVideoBtn) {
  hindiVideoBtn.addEventListener("click", () => {
    languageModal.classList.add("hidden");
    videoModal.classList.remove("hidden");
    youtubeVideo.src = hindiUrl;
  });
}

// When user picks English
if (englishVideoBtn) {
  englishVideoBtn.addEventListener("click", () => {
    languageModal.classList.add("hidden");
    videoModal.classList.remove("hidden");
    youtubeVideo.src = englishUrl;
  });
}

// Close video modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    videoModal.classList.add("hidden");
    youtubeVideo.src = "";
  });
}

// Close on background click
window.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.add("hidden");
    youtubeVideo.src = "";
  }
  if (e.target === languageModal) {
    languageModal.classList.add("hidden");
  }
});

// ---------- Slider controls (moved from Modules section) ----------
function scrollSlider(amount) {
  document.getElementById('slider').scrollBy({ left: amount, behavior: 'smooth' });
}
window.scrollSlider = scrollSlider;

// ---------- Book Demo Form – FormSubmit (moved from Book a Demo section) ----------
function showThankYouMessage(event) {
  event.preventDefault(); // prevent default submit

  const form = event.target;
  const statusDiv = document.getElementById('form-status');

  // Submit via FormSubmit
  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      statusDiv.classList.remove("hidden");
      form.reset();
    } else {
      statusDiv.innerHTML = "❌ Something went wrong, please try again.";
      statusDiv.classList.remove("hidden");
    }
  }).catch(error => {
    statusDiv.innerHTML = "❌ Error: " + error.message;
    statusDiv.classList.remove("hidden");
  });
}
window.showThankYouMessage = showThankYouMessage;

// ---------- Footer year (moved from footer) ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- FAQ accordion + additional demo-form handler (moved from bottom) ----------
document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.display = 'none';
        }
      });
      if (isActive) {
        item.classList.remove('active');
        content.style.display = 'none';
      } else {
        item.classList.add('active');
        content.style.display = 'block';
      }
    });
  });

  // Demo Form Submission
  const form = document.getElementById('demo-form');
  const statusDiv = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      statusDiv.classList.remove('hidden');
      statusDiv.innerHTML = '<span class="text-gray-700">Sending your request...</span>';
      
      // Collect form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        contact: formData.get('contact'),
        company: formData.get('company'),
        message: formData.get('message')
      };

      // For security reasons, we can't directly send to an email address from the client side.
      // The form is set up to show a success message upon submission, as a real implementation
      // would require a server-side endpoint to handle the email sending process.
      setTimeout(() => {
        statusDiv.innerHTML = '<span class="text-primary-green font-semibold">Thank you for your submission! We will be in touch shortly.</span>';
        form.reset(); // Clear the form fields
      }, 2000);
    });
  }
});
