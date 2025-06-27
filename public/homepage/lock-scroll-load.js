export function lockScrollLoader() {
    const element = document.querySelector(".section_loader");
    if (!element) return;

    // Prevent the browser from automatically restoring scroll position
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    // Force scroll to the top on page load
    window.scrollTo(0, 0);

    // Stop Lenis and GSAP animations temporarily
    lenis.stop();
    gsap.globalTimeline.pause();

    // Keep forcing the scroll to (0,0) briefly to prevent any scroll-jump on load
    let intervalId = setInterval(() => {
        window.scrollTo(0, 0);
    }, 10); // Ensure a small interval for frequent execution

    // Stop forcing scroll after 1.5 seconds, and resume animations
    setTimeout(() => {
        clearInterval(intervalId);

        // Resume GSAP animations and restart Lenis
        gsap.globalTimeline.resume();
        lenis.start();
    }, 1500); // Adjust timeout duration to ensure page load stability
}