import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * Attaches to a container ref and animates child elements with [data-reveal] attributes.
 * Supports staggered animations via data-reveal-delay attribute.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", staggerMs = 80 } = options;
  const containerRef = useRef(null);

  const revealCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.revealDelay || "0", 10);
          setTimeout(() => {
            el.classList.remove("scroll-hidden");
            el.classList.add("scroll-revealed");
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(revealCallback, {
      threshold,
      rootMargin,
    });

    // Find all elements that should be revealed
    const revealElements = container.querySelectorAll("[data-reveal]");
    revealElements.forEach((el) => {
      el.classList.add("scroll-hidden");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [revealCallback, threshold, rootMargin]);

  return containerRef;
}

/**
 * Helper to generate stagger delay attributes for a list of items.
 * Returns an object with data-reveal and data-reveal-delay attributes.
 */
export function staggerProps(index, baseDelay = 0, staggerMs = 80) {
  return {
    "data-reveal": true,
    "data-reveal-delay": baseDelay + index * staggerMs,
  };
}
