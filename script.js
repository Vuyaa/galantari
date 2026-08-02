document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('[data-year]');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const video = document.querySelector('.floating-video-card video');
  if (video) {
    const tryPlay = () => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          console.warn('Autoplay nije dopušten od strane preglednika.');
        });
      }
    };

    video.addEventListener('error', () => {
      const fallback = document.querySelector('.video-fallback');
      if (fallback) {
        fallback.textContent = 'Video se trenutno ne može reproducirati u ovom pregledniku. Provjerite datoteku ili otvorite je u drugom pregledniku.';
      }
    });

    video.addEventListener('loadeddata', tryPlay, { once: true });
    window.addEventListener('focus', tryPlay, { once: true });
    document.addEventListener('pointerdown', tryPlay, { once: true });
    setTimeout(tryPlay, 800);
  }
});
