document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const track = document.querySelector('.gallery-track');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const previousButton = document.querySelector('[data-direction="prev"]');
  const nextButton = document.querySelector('[data-direction="next"]');
  const progress = document.querySelector('.slider-progress span');
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const updateSlider = () => {
    cards.forEach((card, index) => {
      const position = (index - currentIndex + cards.length) % cards.length;
      card.dataset.position = position;
    });
    previousButton.disabled = false;
    nextButton.disabled = false;
    progress.style.width = `${((currentIndex + 1) / cards.length) * 100}%`;
  };

  previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  });

  const finishSwipe = () => {
    if (!isDragging) return;
    const distance = currentX - startX;
    if (Math.abs(distance) > 45) {
      currentIndex = (currentIndex + (distance < 0 ? 1 : -1) + cards.length) % cards.length;
    }
    isDragging = false;
    track.style.transform = '';
    updateSlider();
  };

  track.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    isDragging = true;
    startX = event.clientX;
    currentX = startX;
    track.setPointerCapture(event.pointerId);
    track.style.transition = 'none';
  });

  track.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    currentX = event.clientX;
    track.style.transform = `translateX(${currentX - startX}px)`;
  });

  track.addEventListener('pointerup', finishSwipe);
  track.addEventListener('pointercancel', finishSwipe);

  window.addEventListener('resize', updateSlider);
  updateSlider();
});
