import { useEffect } from 'react';

// Easing function for a smoother scroll effect (ease-in-out quadratic)
const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const smoothScrollTo = (targetId: string, duration: number = 800) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;
  
  // Get the top position of the target element relative to the document,
  // accounting for any existing scroll offset.
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      // Ensure the event target is an element, then check if it's an anchor or inside one
      const anchorTarget = (event.target as Element).closest('a');
      
      // If there's no anchor, or if it's the elevator button, do nothing.
      // This prevents this global handler from interfering with elevator.js.
      if (!anchorTarget || anchorTarget.id === 'elevator-button') {
        return;
      }

      if (
        anchorTarget.hash && // Check for a hash (e.g., #services)
        anchorTarget.pathname === window.location.pathname // Ensure it's a link on the current page
      ) {
        const targetId = anchorTarget.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          event.preventDefault(); // Prevent the default browser jump
          smoothScrollTo(targetId);
          
          // Optional: Update the URL hash in the address bar without causing a jump.
          // This provides a better user experience and allows for link sharing.
          if (history.pushState) {
            history.pushState(null, '', anchorTarget.hash);
          } else {
            // Fallback for older browsers
            window.location.hash = anchorTarget.hash;
          }
        }
      }
    };

    // Add a single global event listener to the document
    document.addEventListener('click', handleLinkClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []); // Empty dependency array means this effect runs only once
};
