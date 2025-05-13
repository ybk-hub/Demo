import { useState, useEffect, useRef } from 'react';
export const useLazyLoad = (ref, options) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const observerRef = useRef();
    useEffect(() => {
        if (!ref.current) return;
        // 处理兼容性
        if (typeof IntersectionObserver === 'undefined') {
            console.warn('IntersectionObserver not supported, loading image immediately');
            setIsLoaded(true);
            return;
        }
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observerRef.current?.unobserve(entry.target);
                }
            });
        }, options);
        observerRef.current.observe(ref.current);
        return () => {
            observerRef.current?.disconnect();
        };
    }, [ref, options]);
    return isLoaded;
}
