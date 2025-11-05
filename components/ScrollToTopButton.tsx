import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpIcon } from './icons';

// Add type definition for Elevator.js on the window object
declare global {
  interface Window {
    Elevator: new (options: {
      element: HTMLElement;
      mainAudio?: string;
      endAudio?: string;
    }) => void;
  }
}

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elevatorRef = useRef<HTMLAnchorElement>(null);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Initialize Elevator.js on component mount
    useEffect(() => {
        const elevatorElement = elevatorRef.current;
        
        // Ensure the script has loaded and the element exists
        if (elevatorElement && window.Elevator) {
            try {
                new window.Elevator({
                    element: elevatorElement,
                    mainAudio: 'https://raw.githubusercontent.com/tholman/elevator.js/master/demo/music/elevator.mp3',
                    endAudio: 'https://raw.githubusercontent.com/tholman/elevator.js/master/demo/music/ding.mp3',
                });
            } catch(e) {
                console.error("Failed to initialize Elevator.js", e);
            }
        }
    }, []);

    const handleFallbackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // This is a fallback for when Elevator.js fails to initialize or is blocked.
        // If Elevator.js is loaded, it will handle the click and prevent this default behavior.
        if (!window.Elevator) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        // If Elevator.js is initialized, it has its own listener that will handle the click
        // and prevent the default href="#" behavior. So we don't need to do anything here.
    };

    return (
        <a
            ref={elevatorRef}
            id="elevator-button"
            href="#"
            onClick={handleFallbackClick}
            role="button"
            className={`
                fixed bottom-6 right-6 z-50
                w-12 h-12 rounded-full
                bg-slate-800/70 backdrop-blur-sm
                border-2 border-slate-700
                flex items-center justify-center
                shadow-lg
                transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-700/80 hover:shadow-lg hover:shadow-cyan-500/20
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-cyan-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}
            aria-label="Scroll to top"
        >
            <ArrowUpIcon className="w-6 h-6" />
        </a>
    );
};

export default ScrollToTopButton;
