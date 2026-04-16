import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';

export default function ScrollManager({ children }) {
  const { pathname } = useLocation();

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

    // Reset scroll on path change
    lenis.scrollTo(0, { immediate: true });

    let requestID;
    function raf(time) {
      lenis.raf(time);
      requestID = requestAnimationFrame(raf);
    }
    requestID = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(requestID);
    };
  }, [pathname]);

  return <>{children}</>;
}
