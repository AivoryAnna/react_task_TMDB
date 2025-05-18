import { useEffect, useRef, useState, useCallback } from "react";

/**
 * @param {Function|null} onVisible // when the element becomes visible
 * @param {Object} options 
 * @param {boolean} options.enabled // if the observer is enabled
 * @param {number} options.threshold // the percentage of visibility required to trigger the callback
 * @param {boolean} options.once // if the callback should be triggered only once
 * @returns {[React.RefObject, boolean]} // a ref to the observed element and its visibility status
 */


export default function useVisibilityObserver( onVisible, { enabled = true, threshold = 1.0, once = false } = {}) {
  const ref = useRef(null); // I create a ref to attach to the element we want to observe
  const observerRef = useRef(null); // I create a ref to store the IntersectionObserver instance
  const [isVisible, setIsVisible] = useState(false); // I create a state to track the visibility of the element

  const callback = useCallback((entries) => {
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
