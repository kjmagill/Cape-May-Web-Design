import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element>(
    options: ObserverOptions = { threshold: 0.1, triggerOnce: true }
): [RefObject<T>, boolean] {
    const [isIntersecting, setIntersecting] = useState(false);
    const elementRef = useRef<T>(null);

    const { root = null, rootMargin = '0px', threshold = 0.1, triggerOnce = true } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        try {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIntersecting(true);
                        if (triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        setIntersecting(false);
                    }
                },
                {
                    root,
                    rootMargin,
                    threshold,
                }
            );

            observer.observe(element);

            return () => {
                if (element) {
                    observer.unobserve(element);
                }
            };
        } catch (error) {
            console.error('IntersectionObserver initialization failed:', error);
        }
    }, [elementRef, root, rootMargin, JSON.stringify(threshold), triggerOnce]);

    return [elementRef, isIntersecting];
}
