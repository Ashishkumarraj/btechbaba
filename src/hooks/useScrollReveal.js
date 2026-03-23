import { useEffect, useRef } from 'react';

/**
 * Returns a ref. Attach to a container whose .reveal children
 * will animate in when they scroll into the viewport.
 */
export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
