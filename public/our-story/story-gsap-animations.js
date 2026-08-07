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
        // Set initial position immediately to avoid jump on load before the
        // scrollTrigger evaluates its progress.
        gsap.set("[parallax-story]", { y: "25%" });
        gsap.to("[parallax-story]", {
            y: "-25%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".section_our-story",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }

    // Only fade — no y transform here, otherwise it fights the parallax on the
    // same elements (both attributes are on the same nodes).
    gsap.set("[story-hero-element]", { autoAlpha: 0 });
    gsap.to("[story-hero-element]", {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.inOut",
    });

}
