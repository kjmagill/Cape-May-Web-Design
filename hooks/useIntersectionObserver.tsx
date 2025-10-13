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

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    if (options.triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!options.triggerOnce) {
                    setIntersecting(false);
                }
            },
            {
                root: options.root,
                rootMargin: options.rootMargin,
                threshold: options.threshold,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    // We disable the exhaustive-deps rule here because we are stringifying the options
    // object to prevent re-running the effect on every render if the options object
    // is defined inline. This is a safe and common pattern for this use case.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef, JSON.stringify(options)]);

    return [elementRef, isIntersecting];
}
