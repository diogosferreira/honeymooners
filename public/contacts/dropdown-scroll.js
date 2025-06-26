export function dropdownScroll() {
    const element = document.querySelector('[data-lenis-allow-scroll]');
    if (!element) return;

    console.log("dropdown Scroll");

    document.querySelectorAll('[data="lenis-allow-scroll"]').forEach((el) => {
        el.addEventListener(
            "wheel",
            function (e) {
                e.stopPropagation(); // Impede o Lenis de interferir no scroll interno
            },
            { passive: false }
        );
    });

    //————————————————————————————————————————————————————————

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


}
