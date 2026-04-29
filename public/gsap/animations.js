// =====================================================================
// PREVENT-FLICKER PATTERN (2026-04-28, updated)
// CSS in Webflow head sets visibility:hidden on these attributes.
// We use `gsap.set({autoAlpha:0})` to FORCE the inline FROM state, then
// `gsap.to({autoAlpha:1, scrollTrigger:...})` for the animation. This
// pattern is more reliable than fromTo+scrollTrigger because GSAP can
// skip applying inline FROM if it matches the computed style (CSS hidden),
// causing elements to render in TO state at page load.
// To revert: see commit history; original was gsap.fromTo with opacity.
// =====================================================================

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



    //opacity
    $("[opacity-gsap-top-90]").each(function () {
        gsap.set(this, { autoAlpha: 0 });
        gsap.to(this, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: this,
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });
    });

    //opacity delay 0.5
    $("[opacity-gsap-delay-05]").each(function () {
        gsap.set(this, { autoAlpha: 0 });
        gsap.to(this, {
            autoAlpha: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power2.inOut",
        });
    });

    //opacity top 90 + delay 0.5
    $("[opacity-gsap-top-90-delay-05]").each(function () {
        gsap.set(this, { autoAlpha: 0 });
        gsap.to(this, {
            autoAlpha: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: this,
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });
    });

    //opacity top 80
    $("[opacity-gsap-top-80]").each(function () {
        gsap.set(this, { autoAlpha: 0 });
        gsap.to(this, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: this,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });

    //move from left
    // Each element gets its own scrollTrigger so trigger position is correct
    // for that specific element (was using a single trigger for all matches).
    $("[gsap-move-from-left]").each(function () {
        gsap.set(this, { x: "-20%", autoAlpha: 0 });
        gsap.to(this, {
            x: "0%",
            autoAlpha: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: this,
                start: "top bottom",
                end: "top 40%",
                scrub: true,
            },
        });
    });

    //move from right
    $("[gsap-move-from-right]").each(function () {
        gsap.set(this, { x: "20%", autoAlpha: 0 });
        gsap.to(this, {
            x: "0%",
            autoAlpha: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: this,
                start: "top bottom",
                end: "top 40%",
                scrub: true,
            },
        });
    });
}