export function GSAPTitles() {
    const element = document.querySelector("[text-split]");

    if (!element) return;



    initSplitText();

    function initSplitText() {
        var splitChars = new SplitType("[text-split]", {
            type: "chars",
            //charsClass: "single-char",
        });
        gsap.set("[text-split]", { opacity: 1 });
    }

    //MAIN TITLES
    $("[gsap-title-letter]").each(function (index) {
        let triggerElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 90%",
                //end: "100% 0%",
                onEnter: () => tl.play(),
            },
        });

        tl.to($(this).find(".char"), {
            duration: 1.1,
            y: "0%",
            ease: "power3.out",
            stagger: { amount: 0.15 },
        });
    });

    //NUM count
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————

    function numberWithCommas(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    $("[count-up]").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 60%",
                //end: "100% 0%",
            },
        });
        tl.from(
            targetElement,
            {
                duration: 2.5,
                ease: Expo.easeOut,
                innerText: 0,
                roundProps: "innerText",
                stagger: 0,
                onUpdate: function () {
                    this.targets().forEach((target) => {
                        const val = gsap.getProperty(target, "innerText");
                        target.innerText = numberWithCommas(val);
                    });
                },
            },
            "<"
        );
    });

    //TRACKING
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————


    $("[tracking-anim-dream]").each(function () {
        const element = this;

        // Get the original letter-spacing value from the `style` attribute or set a default
        const originalTracking = parseFloat($(element).css("letter-spacing")) || 0;

        // Ensure the element starts with `letter-spacing: 0em`
        gsap.set(element, { letterSpacing: "0em" });

        // ScrollTrigger animation
        gsap.to(element, {
            letterSpacing: "0.2em",
            ease: "power1.inOut", // Add ease-in-out effect
            scrollTrigger: {
                trigger: element,
                start: "bottom bottom", // Start animation when top of element hits bottom of viewport
                end: "bottom top", // End animation when top of element hits the middle of viewport
                scrub: true, // Smooth scrubbing
            },
        });
    });

    //COLOR CHANGE
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————

    $("[animate-color-sand-dark-gold]").each(function () {
        let element = $(this);

        gsap.fromTo(
            element,
            { color: "#e3d0c8" }, // Starting color
            {
                color: "#7c4331", // Target color
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%", // Adjust as needed
                    end: "top 40%", // Adjust as needed
                    scrub: true,
                },
            }
        );
    });

}
