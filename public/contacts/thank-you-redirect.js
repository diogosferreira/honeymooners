export function thankYouRedirect() {
    const element = document.querySelector(".section_hero-thank-you");
    if (!element) return;

    if (location.hostname.includes("honeymooners-staging")) {

        // Redirect logic on bare /thank-you (no lang folder)
        const currentPath = window.location.pathname;
        if (currentPath === "/thank-you") {
            const lang = sessionStorage.getItem("site_lang");
            if (lang && allowedLangs.includes(lang)) {
                // avoid redirect loop if already on the correct path
                const target = `/${lang}/thank-you`;
                if (window.location.pathname !== target) {
                    window.location.href = target;
                }
            }
            // else: no valid lang saved -> assume EN and do nothing
        }



    }

}