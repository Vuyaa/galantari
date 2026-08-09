document.addEventListener('DOMContentLoaded', () => {
  // Osigurava da se plutajući elementi nalaze izravno unutar body-a
  const chatWidget = document.getElementById('chat-widget');
  const videoContainer = document.querySelector('.floating-video-card');

  if (chatWidget) {
    document.body.appendChild(chatWidget);
  }
  if (videoContainer) {
    document.body.appendChild(videoContainer);
  }

  // --- LOGIKA ZA CHAT WIDGET ---
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatClose = document.getElementById('chat-close');

  if (chatToggle && chatWidget) {
    chatToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = chatWidget.classList.toggle('open');
      if (chatPanel) {
        chatPanel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      }
    });
  }

  if (chatClose && chatWidget) {
    chatClose.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWidget.classList.remove('open');
      if (chatPanel) {
        chatPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // --- LOGIKA ZA FLOATING VIDEO ---
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

    const containerToggle = (event) => {
      if (
        videoContainer.classList.contains('collapsed') &&
        !event.target.closest('video') &&
        !event.target.closest('.video-toggle-btn')
      ) {
        event.preventDefault();
        toggleVideo();
      }
    };

    const stopPropagation = (event) => {
      event.stopPropagation();
    };

    ['pointerdown', 'touchstart', 'pointerup', 'touchend'].forEach((eventName) => {
      toggleButton.addEventListener(eventName, stopPropagation);
    });

    toggleButton.addEventListener('click', (event) => {
      stopPropagation(event);
      toggleVideo();
    });

    videoContainer.addEventListener('click', containerToggle);
  }

  if (replayButton && video) {
    replayButton.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
    });
  }
});
