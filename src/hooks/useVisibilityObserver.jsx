import { useEffect, useRef, useState, useCallback } from "react";

/**
 * @param {Function|null} onVisible
 * @param {Object} options
 * @param {boolean} options.enabled 
 * @param {number} options.threshold 
 * @param {boolean} options.once 
 * @returns {[React.RefObject, boolean]}
 */


export default function useVisibilityObserver(
  onVisible,
  { enabled = true, threshold = 1.0, once = false } = {}
) {
  const ref = useRef(null);
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = useCallback(
    (entries) => {
      const entry = entries[0];
      const isIntersecting = entry.isIntersecting;
      setIsVisible(isIntersecting);

      if (isIntersecting && onVisible) {
        onVisible();
        if (once && observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    },
    [onVisible, once]
  );

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(callback, { threshold });
    observerRef.current = observer;

    if (ref.current) {
      observer.observe(ref.current);
    }

    const interval = setInterval(() => {
      if (ref.current && observer && !isVisible) {
        observer.observe(ref.current);
      }
    }, 500); 

    return () => {
      clearInterval(interval);
      if (observer) observer.disconnect();
    };
  }, [enabled, threshold, callback, isVisible]);

  return [ref, isVisible];
}
