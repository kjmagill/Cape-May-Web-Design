import { useEffect } from 'react';

interface MetricRating {
  rating: 'good' | 'needs-improvement' | 'poor';
  color: string;
  emoji: string;
}

const getRating = (metric: string, value: number): MetricRating => {
  switch (metric) {
    case 'TTFB':
      if (value <= 800) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 1800) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    case 'FCP':
      if (value <= 1800) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 3000) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    case 'LCP':
      if (value <= 2500) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 4000) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    case 'FID':
      if (value <= 100) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 300) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    case 'CLS':
      if (value <= 0.1) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 0.25) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    case 'INP':
      if (value <= 200) return { rating: 'good', color: '#10b981', emoji: '🟢' };
      if (value <= 500) return { rating: 'needs-improvement', color: '#f59e0b', emoji: '🟡' };
      return { rating: 'poor', color: '#ef4444', emoji: '🔴' };
    default:
      return { rating: 'good', color: '#10b981', emoji: '🟢' };
  }
};

const formatValue = (metric: string, value: number): string => {
  if (metric === 'CLS') {
    return value.toFixed(4);
  }
  return `${Math.round(value)}ms`;
};

const logMetric = (metric: string, name: string, value: number) => {
  const { rating, color, emoji } = getRating(metric, value);
  const formattedVal = formatValue(metric, value);
  
  // Custom styled CSS logs for a premium engineering presentation
  console.log(
    `%c${emoji} Cape May Web Design | Performance Vital: %c${metric} (${name}) %c-> %c${formattedVal} %c(${rating.toUpperCase()})`,
    'color: #94a3b8; font-weight: normal;',
    'color: #38bdf8; font-weight: bold;',
    'color: #64748b;',
    `color: ${color}; font-weight: bold;`,
    `color: ${color}; font-weight: bold; font-style: italic;`
  );
};

export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if PerformanceObserver is supported
    const isSupported = 'PerformanceObserver' in window;
    if (!isSupported) {
      console.warn('Cape May Web Design Vitals: PerformanceObserver not supported in this browser.');
      return;
    }

    const observers: PerformanceObserver[] = [];

    // 1. TTFB (Time to First Byte)
    try {
      const getNavigationEntry = () => {
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (nav) {
          logMetric('TTFB', 'Time to First Byte', nav.responseStart);
        }
      };

      if (document.readyState === 'complete') {
        getNavigationEntry();
      } else {
        window.addEventListener('load', getNavigationEntry, { once: true });
      }
    } catch (e) {
      console.debug('Failed to record TTFB:', e);
    }

    // 2. FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            logMetric('FCP', 'First Contentful Paint', entry.startTime);
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);
    } catch (e) {
      console.debug('FCP observer failed:', e);
    }

    // 3. LCP (Largest Contentful Paint)
    try {
      let lcpValue = 0;
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          lcpValue = lastEntry.startTime;
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);

      // Log LCP on visibilitychange to hidden or window unload, when LCP is considered "final"
      const logLcp = () => {
        if (lcpValue > 0) {
          logMetric('LCP', 'Largest Contentful Paint', lcpValue);
          // Zero out so we don't log duplicate times if triggered multiple times
          lcpValue = 0;
        }
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          logLcp();
        }
      });
      window.addEventListener('pagehide', logLcp);
    } catch (e) {
      console.debug('LCP observer failed:', e);
    }

    // 4. FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceEventTiming[];
        const firstInput = entries[0];
        if (firstInput) {
          const fid = firstInput.processingStart - firstInput.startTime;
          logMetric('FID', 'First Input Delay', fid);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      console.debug('FID observer failed:', e);
    }

    // 5. CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      let logTimeout: ReturnType<typeof setTimeout> | null = null;

      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as any[];
        let hasNewShift = false;

        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            hasNewShift = true;
          }
        }

        if (hasNewShift) {
          // Debounce logging since shifts can happen sequentially in a window
          if (logTimeout) clearTimeout(logTimeout);
          logTimeout = setTimeout(() => {
            logMetric('CLS', 'Cumulative Layout Shift', clsValue);
          }, 1000);
        }
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      console.debug('CLS observer failed:', e);
    }

    // 6. INP (Interaction to Next Paint)
    try {
      let maxINP = 0;
      let inpTimeout: ReturnType<typeof setTimeout> | null = null;

      const inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceEventTiming[];
        let updated = false;

        for (const entry of entries) {
          const rawEntry = entry as any;
          if (rawEntry.interactionId) {
            const inp = rawEntry.duration;
            if (inp > maxINP) {
              maxINP = inp;
              updated = true;
            }
          }
        }

        if (updated) {
          // Debounce logging INP changes during active interaction bursts
          if (inpTimeout) clearTimeout(inpTimeout);
          inpTimeout = setTimeout(() => {
            logMetric('INP', 'Interaction to Next Paint', maxINP);
          }, 1500);
        }
      });

      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 } as any);
      observers.push(inpObserver);
    } catch (e) {
      console.debug('INP observer failed:', e);
    }

    // Cleanup all observers and event listeners on unmount
    return () => {
      observers.forEach((obs) => {
        try {
          obs.disconnect();
        } catch (_) {}
      });
    };
  }, []);
};
