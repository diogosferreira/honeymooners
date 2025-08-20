export function customContactLink() {
    const element = document.querySelector("[data-link-custom-contact='true']");
    if (!element) return;

    console.log("custom");



    // Only run if URL contains "honeymooners-staging"
    if (!location.hostname.includes("honeymooners-staging")) {

        /* ORIGIN (ES/PT/EN): store canonical value "honeymoon" | "trip" into sessionStorage */
        (function () {
            const KEY = "hm_trip";
            const p = location.pathname
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // strip accents

            // Matches:
            //  - /es/sueno/luna-de-miel
            //  - /pt/sonho/lua-de-mel
            //  - /.../honeymoon
            const isHoney = /(honeymoon|lua-?de-?mel|luna-?de-?miel)/.test(p);

            // Matches:
            //  - /es/sueno/vacaciones
            //  - /pt/sonho/ferias
            //  - /.../trips
            const isTrips = /(dream\/trips|trips|sonho\/ferias|sueno\/vacaciones|ferias|vacaciones)/.test(p);

            const val = isHoney ? "honeymoon" : (isTrips ? "trip" : "");
            if (!val) return;

            sessionStorage.setItem(KEY, val);

            // Reinforce on click for dynamically injected links/buttons
            document.addEventListener("click", (e) => {
                if (e.target.closest("[data-link-custom-contact='true']")) {
                    sessionStorage.setItem(KEY, val);
                }
            }, true);
        })();

    }

}