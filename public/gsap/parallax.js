export function GSAPParallax() {
    // Array of all parallax attribute selectors you use
    const parallaxSelectors = [
        "[parallax-2]",
        "[parallax-5]",
        "[parallax-10]",
        "[parallax-15]",
        "[parallax-15-0]",
        "[parallax-20]",
        "[parallax-25]",
        "[parallax-50]",
    ];

    // Check if at least one exists
    const hasAny = parallaxSelectors.some(selector => $(selector).length > 0);
    if (!hasAny) return;





    $("[parallax-2]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "2%" },
            {
                y: "-2%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-5]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "5%" },
            {
                y: "-5%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-10]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "10%" },
            {
                y: "-10%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-15]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "15%" },
            {
                y: "-15%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-15-0]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "15%" },
            {
                y: "0%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-20]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "20%" },
            {
                y: "-20%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-25]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "25%" },
            {
                y: "-25%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

    $("[parallax-50]").each(function () {
        gsap.fromTo(
            $(this),
            { y: "50%" },
            {
                y: "-50%",
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });

}
