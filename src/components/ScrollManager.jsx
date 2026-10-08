import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';

export default function ScrollManager({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let timer;
    if (hash) {
      // The new page mounts after the exit animation, so wait for the target to exist.
      let tries = 0;
      const goToHash = () => {
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el, { offset: -96 });
        else if (tries++ < 30) timer = setTimeout(goToHash, 100);
      };
      goToHash();
    } else {
      // Reset scroll on path change
      lenis.scrollTo(0, { immediate: true });
    }

    let requestID;
    function raf(time) {
      lenis.raf(time);
      requestID = requestAnimationFrame(raf);
    }
    requestID = requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      cancelAnimationFrame(requestID);
    };
  }, [pathname, hash]);

  return <>{children}</>;
}
