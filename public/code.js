import { loader } from './homepage/loader.js';
import { lockScrollLoader } from './homepage/lock-scroll-load.js';
import { swiperTestimonials } from './swiper/swiper-testimonials.js';
import { featureTabs } from './dreams/feature-tabs.js';
import { destinationAnimation } from './dreams/destination-animation.js';
import { listBullet } from './dreams/list-bullet.js';
import { contact } from './contacts/contact.js';
import { form } from './contacts/form.js';
import { userLocation } from './contacts/user-location.js';
import { dropdownScroll } from './contacts/dropdown-scroll.js';
import { filters } from './blog/filters.js';
import { travelWithUs } from './travel-with-us/travel-with-us.js';
import { storyGSAP } from './our-story/story-gsap-animations.js';
import { swiperTrips } from './swiper/swiper-trips.js';
import { companyGSAP } from './company/company-gsap-animations.js';
import { menu } from './menu/menu.js';
import { GSAPTitles } from './gsap/titles.js';
import { GSAPParallax } from './gsap/parallax.js';
import { GSAPAnimations } from './gsap/animations.js';
import { chooseSection } from './homepage/choose-section.js';
import { map } from './map/map-hover.js';


gsap.registerPlugin(ScrollTrigger);



document.addEventListener("DOMContentLoaded", function () {
    GSAPTitles();
    console.log("GSAPTitles();");
});


loader();
lockScrollLoader();
swiperTestimonials();
featureTabs();
destinationAnimation();
listBullet();
contact();
form();
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


