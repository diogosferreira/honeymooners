export function destinationAnimation() {
    const element = document.querySelector(".destination_component");
    if (!element) return;



    //REmove the other
    if (window.location.pathname.includes("/trips")) {
        $("[honeymoon-main-image]").remove();
    } else {
        $("[trips-main-image]").remove();
    }

    $(".destination_component").each(function () {
        const component = $(this);

        // When there is no .destination-main-image, the scrub animations have
        // nothing to fade against — force the title to white immediately so it
        // stays readable on the sticky background image.
        if (component.find(".destination-main-image").length === 0) {
            gsap.set(component.find(".destination-title_wrapper, .destination-title_wrapper *"), {
                color: "#ffffff",
            });
            return; // skip the scroll-linked animations for this component
        }

        gsap.fromTo(
            component.find(".destination-main-image"),
            { opacity: 0 },
            {
                opacity: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: this,
                    start: "top 12%",
                    end: "top top",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            component.find(".destination-main-image-overlay"),
            { opacity: 0 },
            {
                opacity: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: this,
                    start: "top top",
                    end: "bottom-=10% bottom",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            component.find(".dream-descriptions_wrapper"),
            { opacity: 0 },
            {
                opacity: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: this,
                    start: "bottom-=25% bottom",
                    end: "bottom-=10% bottom",
                    scrub: true,
                },
            }
        );

        gsap.to(component.find(".destination-title_wrapper, .destination-title_wrapper *"), {
            color: "#ffffff",
            ease: "power1.out",
            scrollTrigger: {
                trigger: this,
                start: "top top",
                end: "bottom-=10% bottom",
                scrub: true,
            },
        });
    });
}
