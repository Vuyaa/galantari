document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('[data-year]');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const videoContainer = document.querySelector('.floating-video-card');
  const video = document.querySelector('.floating-video-card video');
  const toggleButton = document.querySelector('.video-toggle-btn');
  const replayButton = document.querySelector('.video-replay-btn');

  if (video) {
    video.loop = false;

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

  if (toggleButton && videoContainer) {
    const toggleVideo = () => {
      const isCollapsed = videoContainer.classList.toggle('collapsed');
      toggleButton.setAttribute('aria-label', isCollapsed ? 'Povećaj video' : 'Minimiziraj video');
    };

    toggleButton.addEventListener('click', toggleVideo);
    videoContainer.addEventListener('click', (event) => {
      if (videoContainer.classList.contains('collapsed')) {
        toggleVideo();
      }
    });
  }

  if (replayButton && video) {
    replayButton.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
    });
  }
});
