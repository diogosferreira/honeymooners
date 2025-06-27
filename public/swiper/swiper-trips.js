export function swiperTrips() {
    const element = document.querySelector(".story_component");
    if (!element) return;


    // Count the number of elements with the class '.testimonial-share_component'
    const testimonialCount = document.querySelectorAll(".story_component").length;

    // Find the element with the attribute 'carroussel-total' and update its text content
    const totalElement = document.querySelector("[carroussel-total]");
    if (totalElement) {
        totalElement.textContent = testimonialCount;
    } else {
        //console.warn("Element with [carroussel-total] attribute not found.");
    }

    var swiper_base = new Swiper(".swiper-trips", {
        slidesPerView: 1.2,
        speed: 700,
        spaceBetween: 70,
        centeredSlides: false,
        loop: false,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 1,
            },
            1024: {
                spaceBetween: 70,
            },
        },
        on: {
            init: function () {
                updateProgressBar(this.activeIndex + 1, this);
                updateCarrousselCurrent(this.activeIndex + 1);
            },
            slideChange: function () {
                updateProgressBar(this.activeIndex + 1, this);
                updateCarrousselCurrent(this.activeIndex + 1);
            },
        },
    });

    function updateProgressBar(currentSlide, swiper) {
        const progressBar = document.querySelector(".carroussel-current-line");
        if (progressBar) {
            // Calculate the effective total slides to reach 100% at the last slide
            const totalSlides =
                swiper.slides.length - swiper.params.slidesPerView + 1;
            const progressWidth = (currentSlide / totalSlides) * 100;
            progressBar.style.width = `${Math.min(progressWidth, 100)}%`; // Ensure it doesn’t exceed 100%
        } else {
        }
    }

    function updateCarrousselCurrent(index) {
        const element = document.querySelector("[carroussel-current]");
        if (element) {
            element.setAttribute("carroussel-current", index);
            element.textContent = `${index}`; // Update text content for visibility
            //console.log("Current slide:", index); // For debugging
        } else {
            //console.warn("Element with [carroussel-current] attribute not found.");
        }
    }
}
