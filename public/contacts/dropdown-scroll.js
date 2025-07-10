export function dropdownScroll() {
    //const element = document.querySelector('[data-lenis-allow-scroll]');
    //if (!element) return;

    function enableLenisAllowScroll() {
        document.querySelectorAll('[data="lenis-allow-scroll"]').forEach((el) => {
            // Ensure it actually scrolls
            el.style.overflowY = "auto";

            el.addEventListener(
                "wheel",
                function (e) {
                    e.stopPropagation();
                },
                { passive: false }
            );

            el.addEventListener(
                "touchmove",
                function (e) {
                    e.stopPropagation();
                },
                { passive: false }
            );
        });
    }

    window.addEventListener("load", function () {
        // Run on initial load
        enableLenisAllowScroll();
    });
    // Observe DOM for dynamically added dropdown
    const observer = new MutationObserver(() => {
        enableLenisAllowScroll();
    });

    observer.observe(document.body, { childList: true, subtree: true });


    //————————————————————————————————————————————————————————
    /*
        const observer = new MutationObserver(() => {
            const countryList = document.querySelector(".iti__country-list");
            if (countryList) {
                countryList.addEventListener(
                    "wheel",
                    function (e) {
                        e.stopPropagation();
                    },
                    { passive: false }
                );
                observer.disconnect(); // Stop observing after it's found
            }
        });
    
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    */

}
