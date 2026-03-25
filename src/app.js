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


gsap.registerPlugin(ScrollTrigger);



document.addEventListener("DOMContentLoaded", function () {
    GSAPTitles();
});

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


