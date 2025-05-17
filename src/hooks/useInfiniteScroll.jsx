import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ callback, enabled = true, hasMore = true, threshold = 0.1 }) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold }
    );

    const element = observerRef.current;

    if (element) {
      observer.observe(element);

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        callback();
      }
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [enabled, hasMore, callback, threshold]);

  return observerRef;
}


