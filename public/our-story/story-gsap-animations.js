export function storyGSAP() {
    const element = document.querySelector(".section_our-story");
    if (!element) return;


    gsap.fromTo(
        "[story-image]",
        { scale: 0.2 },
        {
            scale: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "[story-image]",
                start: "top bottom",
                end: "top 30%",
                scrub: true,
            },
        }
    );

    if ($(window).width() > 991) {
        gsap.fromTo(
            "[parallax-story]",
            { y: "50%" },
            {
                y: "-25%",
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".section_our-story",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }

    gsap.fromTo(
        "[story-hero-element]",
        { opacity: 0, y: 0 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.inOut",
        }
    );

}
