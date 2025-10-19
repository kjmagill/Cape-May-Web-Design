import { useState, useEffect } from 'react';

/**
 * Custom hook to track the loading state of an image.
 * @param src The source URL of the image to load.
 * @returns {boolean} A boolean indicating if the image is currently loading.
 */
export const useImageLoader = (src?: string): boolean => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!src) {
            setIsLoading(false);
            return;
        }

        const img = new Image();
        img.src = src;

        const handleLoad = () => {
            setIsLoading(false);
        };

        const handleError = () => {
            // Even on error, we stop showing the loader
            setIsLoading(false);
            console.error(`Failed to load image at: ${src}`);
        };

        // If the image is already in the browser cache, it might be 'complete'
        if (img.complete) {
            handleLoad();
            return;
        }

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);

        return () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleError);
        };
    }, [src]);

    return isLoading;
};
