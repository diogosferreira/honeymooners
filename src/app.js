console.log('🚀 Honeymooners code loaded');

import { loader } from '../public/homepage/loader.js';
import { lockScrollLoader } from '../public/homepage/lock-scroll-load.js';
import { swiperTestimonials } from '../public/swiper/swiper-testimonials.js';
import { featureTabs } from '../public/dreams/feature-tabs.js';
import { destinationAnimation } from '../public/dreams/destination-animation.js';
import { listBullet } from '../public/dreams/list-bullet.js';
import { contact } from '../public/contacts/contact.js';
import { form } from '../public/contacts/form.js';
import { autoComplete } from '../public/contacts/autocomplete.js';
import { userLocation } from '../public/contacts/user-location.js';
import { dropdownScroll } from '../public/contacts/dropdown-scroll.js';
import { thankYouRedirect } from '../public/contacts/thank-you-redirect.js';
import { filters } from '../public/blog/filters.js';
import { travelWithUs } from '../public/travel-with-us/travel-with-us.js';
import { storyGSAP } from '../public/our-story/story-gsap-animations.js';
import { swiperTrips } from '../public/swiper/swiper-trips.js';
import { companyGSAP } from '../public/company/company-gsap-animations.js';
import { menu } from '../public/menu/menu.js';
import { GSAPTitles } from '../public/gsap/titles.js';
import { GSAPParallax } from '../public/gsap/parallax.js';
import { GSAPAnimations } from '../public/gsap/animations.js';
import { chooseSection } from '../public/homepage/choose-section.js';
import { map } from '../public/map/map-hover.js';
import { customContactLink } from '../public/contacts/custom-contact-link.js';


// =====================================================================
// DOM-READY GUARD (2026-09-16)
// This file used to ship as an ES module (type="module"), which the browser
// defers until parsing finishes. Every call below relied on that timing.
// The production build is a classic UMD script, which can execute earlier,
// before later footer scripts exist (notably `const lenis = new Lenis()`,
// used by loader()). Running init on DOMContentLoaded restores the exact
// original timing.
// To revert: call the functions directly again, as before.
// =====================================================================
function initHoneymooners() {
    gsap.registerPlugin(ScrollTrigger);

    GSAPTitles();

    thankYouRedirect();
    loader();
    customContactLink();
    lockScrollLoader();
    swiperTestimonials();
    featureTabs();
    destinationAnimation();
    listBullet();
    contact();
    form();
    autoComplete();
    userLocation();
    dropdownScroll();
    filters();
    travelWithUs();
    storyGSAP();
    swiperTrips();
    companyGSAP();
    menu();

    GSAPParallax();
    GSAPAnimations();
    chooseSection();
    map();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHoneymooners, { once: true });
} else {
    initHoneymooners();
}


// =====================================================================
// PREVENT-FLICKER SAFETY FALLBACK (2026-04-28)
// CSS in Webflow head sets visibility:hidden on animated elements.
// If GSAP fails to flip visibility for any reason (script error, slow load,
// dynamic content), this timeout forces all hidden animated elements to show
// after 5 seconds so users never see a permanently invisible block.
// To revert: remove this entire block.
// =====================================================================
setTimeout(function () {
    var sels = [
        "[opacity-gsap-top-90]",
        "[opacity-gsap-delay-05]",
        "[opacity-gsap-top-90-delay-05]",
        "[opacity-gsap-top-80]",
        "[gsap-move-from-left]",
        "[gsap-move-from-right]",
        "[text-split]",
        "[gsap-title-letter]"
    ];
    document.querySelectorAll(sels.join(",")).forEach(function (el) {
        if (getComputedStyle(el).visibility === "hidden") {
            el.style.visibility = "visible";
            el.style.opacity = "1";
        }
    });
}, 5000);


