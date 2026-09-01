import { useEffect } from 'react';
import { ScrollToTop } from '@kikytokamuro/scroll-to-top';

const ScrollToTopButton = () => {
  useEffect(() => {
    let button: ScrollToTop | null = null;

    const createButton = () => {
      button?.destroy();
      button = new ScrollToTop({
        buttonContent:
          '<span class="scroll-to-top-star" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.74 5.55 6.13.9-4.44 4.32 1.05 6.1L12 16.6l-5.48 2.87 1.05-6.1-4.44-4.32 6.13-.9L12 2.6z"/></svg></span>',
        size: 54,
        right: 24,
        top: Math.max(24, window.innerHeight - 90),
        backgroundColor: 'rgba(255,255,255,0.16)',
        hoverBackgroundColor: 'rgba(134,255,147,0.24)',
        iconColor: 'var(--secondary)',
        borderRadius: '9999px',
        shadow:
          'inset 0 1px 0 rgba(255,255,255,0.35), 0 18px 45px rgba(0,0,0,0.28), 0 0 28px rgba(134,255,147,0.22)',
        zIndex: 80,
        transitionDuration: 260,
        scrollThreshold: 420,
        smoothScroll: true,
      });

      const element = document.querySelector('.scroll-to-top-star')?.closest('button');
      if (element instanceof HTMLButtonElement) {
        element.style.border = '1px solid rgba(255,255,255,0.28)';
        element.style.backdropFilter = 'blur(14px)';
        element.style.setProperty('-webkit-backdrop-filter', 'blur(14px)');
      }
    };

    createButton();
    window.addEventListener('resize', createButton);

    return () => {
      window.removeEventListener('resize', createButton);
      button?.destroy();
    };
  }, []);

  return null;
};

export default ScrollToTopButton;
