export function GSAPAnimations() {
    // Array of all attribute selectors used in this function
    const selectors = [
        "[opacity-gsap-top-90]",
        "[opacity-gsap-delay-05]",
        "[opacity-gsap-top-90-delay-05]",
        "[opacity-gsap-top-80]",
        "[gsap-move-from-left]",
        "[gsap-move-from-right]",
    ];

    // Check if at least one exists
    const hasAny = selectors.some(selector => $(selector).length > 0);
    if (!hasAny) return;

    console.log("GSAPAnimations");

    //opacity
    $("[opacity-gsap-top-90]").each(function () {
        gsap.fromTo(
            $(this),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: this,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    //opacity delay 0.5
    $("[opacity-gsap-delay-05]").each(function () {
        gsap.fromTo(
            $(this),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.5,
                delay: 0.5,
                ease: "power2.inOut",
            }
        );
    });

    //opacity top 90 + delay 0.5
    $("[opacity-gsap-top-90-delay-05]").each(function () {
        gsap.fromTo(
            $(this),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.5,
                delay: 0.5,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: this,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    //opacity top 80
    $("[opacity-gsap-top-80]").each(function () {
        gsap.fromTo(
            $(this),
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: this,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    //move from left
    gsap.fromTo(
        "[gsap-move-from-left]",
        { x: "-20%" },
        {
            x: "0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "[gsap-move-from-left]",
                start: "top bottom",
                end: "top 40%",
                scrub: true,
            },
        }
    );

    //move from right
    gsap.fromTo(
        "[gsap-move-from-right]",
        { x: "20%" },
        {
            x: "0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "[gsap-move-from-right]",
                start: "top bottom",
                end: "top 40%",
                scrub: true,
            },
        }
    );
}