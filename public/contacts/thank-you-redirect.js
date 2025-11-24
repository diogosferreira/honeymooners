export function thankYouRedirect() {
    const element = document.querySelector(".section_hero-thank-you");
    if (!element) return;

    if (location.hostname.includes("honeymooners-staging")) {

        const currentPath = window.location.pathname;

        // Run only on the base /thank-you (no lang folder)
        const lang = sessionStorage.getItem("site_lang") || "en";
        console.log("lang");
        //window.location.href = `/${lang}/thank-you`;



    }

}