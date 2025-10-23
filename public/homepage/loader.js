export function loader() {
    const element = document.querySelector(".section_loader");
    if (!element) return;

    // Prevent the browser from automatically restoring scroll position
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    // Force scroll to the top on page load
    window.scrollTo(0, 0);

    // Stop Lenis and GSAP animations temporarily
    lenis.stop();
    gsap.globalTimeline.pause();

    // Keep forcing the scroll to (0,0) briefly to prevent any scroll-jump on load
    let intervalId = setInterval(() => {
        window.scrollTo(0, 0);
    }, 10); // Ensure a small interval for frequent execution

    setTimeout(function () {
        clearInterval(intervalId);

        // Resume GSAP animations and restart Lenis
        gsap.globalTimeline.resume();

        // Animate all elements with the count-up attribute
        $("[loader-numbers]").each(function () {
            let targetElement = $(this);

            // Animate count-up from 0 to 100
            gsap.to(
                {},
                {
                    duration: 2.5,
                    ease: "power1.inOut", // Smooth easing
                    onUpdate: function () {
                        // Use a progress-based approach to calculate the number
                        const progress = this.progress() * 100;
                        const roundedValue = Math.round(progress);

                        // Update number text
                        targetElement.text(numberWithCommas(roundedValue));
                    },
                    onComplete: function () {
                        // Ensure the final value is set in the DOM
                        targetElement.text(numberWithCommas(100));


                        if (window.location.hostname === "honeymooners-staging.webflow.io") {
                            //console.log("now");
                            $('#hero_video_home')[0].play();
                        }


                        // Animate .section_loader out of view and run code after animation completes
                        gsap.to(".section_loader", {
                            y: "-100%",
                            duration: 0.5, // Animation duration in seconds
                            delay: 0.3,
                            ease: "power1.inOut", // Smooth easing
                            onComplete: function () {
                                $(".section_loader").remove();
                            },
                        });
                        setTimeout(function () {
                            lenis.start();
                        }, 350);
                    },
                }
            );
        });

        gsap.fromTo(
            ".loader-line",
            { height: "0%" },
            {
                height: "100%",
                duration: 1.5,
                ease: "power1.in",
                onComplete: function () {
                    gsap.fromTo(
                        ".loader-text-filled.is-bottom",
                        { height: "0%" },
                        {
                            height: "100%",
                            duration: 1,
                            ease: "power1.out",
                        }
                    );

                    gsap.fromTo(
                        ".loader-text-filled.is-top",
                        { height: "110%" },
                        {
                            height: "0%",
                            duration: 1,
                            ease: "power1.out",
                        }
                    );
                },
            }
        );




        // Helper function to add commas to numbers
        function numberWithCommas(n) {
            const parts = n.toString().split(".");
            return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }, 300);

}
