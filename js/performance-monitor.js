// Simple performance monitoring - tracks key metrics
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        
        const metrics = {
            'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
            'TCP Connection': timing.connectEnd - timing.connectStart,
            'DOM Loading': timing.domComplete - timing.navigationStart,
            'Page Load': timing.loadEventEnd - timing.navigationStart,
            'First Paint': timing.responseEnd - timing.navigationStart
        };
        
        // Log metrics only if navigation timing API is supported
        if (timing.navigationStart > 0) {
            console.log('%cPerformance Metrics', 'color: #1b7034; font-weight: bold;');
            Object.entries(metrics).forEach(([key, value]) => {
                if (value > 0) {
                    console.log(`  ${key}: ${value.toFixed(0)}ms`);
                }
            });
        }
    });
}

// Lazy load non-critical functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize non-critical features after DOM is ready
    if (window.initializeNonCriticalFeatures) {
        window.initializeNonCriticalFeatures();
    }
});
