(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = docHeight > 0 ? (window.scrollY / docHeight) * 100 + '%' : '0%';
    }, { passive: true });
  }

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    if (index === 0) {
      item.classList.add('active');
      panel.hidden = false;
    } else {
      panel.hidden = true;
    }

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('active');
        const otherPanel = other.querySelector('.faq-panel');
        if (otherPanel) otherPanel.hidden = true;
      });
      if (!isActive) {
        item.classList.add('active');
        panel.hidden = false;
      }
    });
  });

  const track = document.getElementById('testimonialTrack');
  const dots = Array.from(document.querySelectorAll('[data-testimonial-dot]'));
  const cards = track ? Array.from(track.children) : [];
  let testimonialIndex = 1;

  function updateTestimonials() {
    if (!track || !cards.length) return;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === testimonialIndex);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === testimonialIndex);
    });
  }

  function goTestimonial(dir) {
    if (!cards.length) return;
    testimonialIndex = (testimonialIndex + dir + cards.length) % cards.length;
    updateTestimonials();
  }

  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goTestimonial(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTestimonial(1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      testimonialIndex = i;
      updateTestimonials();
    });
  });
  updateTestimonials();

  const form = document.getElementById('demo-form');
  const statusDiv = document.getElementById('form-status');
  if (form && statusDiv) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      statusDiv.hidden = false;
      statusDiv.className = 'form-status is-pending';
      statusDiv.textContent = 'Sending your request...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      }).then((response) => {
        if (response.ok) {
          statusDiv.className = 'form-status is-ok';
          statusDiv.textContent = 'Thank you. We will be in touch shortly.';
          form.reset();
        } else {
          statusDiv.className = 'form-status is-error';
          statusDiv.textContent = 'Something went wrong. Please try again or email info@transcendtech.in.';
        }
      }).catch(() => {
        statusDiv.className = 'form-status is-error';
        statusDiv.textContent = 'Something went wrong. Please try again or email info@transcendtech.in.';
      });
    });
  }

  const languageModal = document.getElementById('languageModal');
  const videoModal = document.getElementById('videoModal');
  const youtubeVideo = document.getElementById('youtubeVideo');
  const hindiUrl = 'https://www.youtube.com/embed/ILr__iSoUmg?autoplay=1';
  const englishUrl = 'https://www.youtube.com/embed/fMnxZTTXzfQ?autoplay=1';

  function openLanguageModal() {
    if (languageModal) languageModal.hidden = false;
  }

  function closeLanguageModal() {
    if (languageModal) languageModal.hidden = true;
  }

  function closeVideoModal() {
    if (videoModal) videoModal.hidden = true;
    if (youtubeVideo) youtubeVideo.src = '';
  }

  function openVideo(url) {
    closeLanguageModal();
    if (videoModal) videoModal.hidden = false;
    if (youtubeVideo) youtubeVideo.src = url;
  }

  document.querySelectorAll('[data-open-demo]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      openLanguageModal();
    });
  });

  const closeLanguage = document.getElementById('closeLanguageModal');
  const closeModal = document.getElementById('closeModal');
  const hindiVideoBtn = document.getElementById('hindiVideo');
  const englishVideoBtn = document.getElementById('englishVideo');

  if (closeLanguage) closeLanguage.addEventListener('click', closeLanguageModal);
  if (closeModal) closeModal.addEventListener('click', closeVideoModal);
  if (hindiVideoBtn) hindiVideoBtn.addEventListener('click', () => openVideo(hindiUrl));
  if (englishVideoBtn) englishVideoBtn.addEventListener('click', () => openVideo(englishUrl));

  const toTop = document.getElementById('toTop');
  if (toTop) {
    const syncToTop = () => {
      toTop.style.display = window.scrollY > 480 ? 'grid' : 'none';
    };
    toTop.style.display = 'none';
    window.addEventListener('scroll', syncToTop, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  window.addEventListener('click', (event) => {
    if (event.target === videoModal) closeVideoModal();
    if (event.target === languageModal) closeLanguageModal();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeVideoModal();
      closeLanguageModal();
    }
  });
})();
