export function featureTabs() {
    const element = document.querySelector(".feature-dropdown-toggle");
    if (!element) return;

    $(".w-condition-invisible").remove();

    // Hover animation
    $(".feature-dropdown-toggle").hover(
        function () {
            if (!$(this).hasClass("open")) {
                gsap.to($(this).find(".feature-dropdown-base-line"), {
                    backgroundColor: "#0c5a7c",
                    duration: 0.3,
                    ease: "power1.inOut",
                });
            }
        },
        function () {
            if (!$(this).hasClass("open")) {
                gsap.to($(this).find(".feature-dropdown-base-line"), {
                    backgroundColor: "",
                    duration: 0.3,
                    ease: "power1.inOut",
                });
            }
        }
    );

    // Click animation
    $(".feature-dropdown-toggle").on("click", function () {
        gsap.to(".feature-dropdown-base-line", {
            backgroundColor: "",
            duration: 0.3,
            ease: "power1.inOut",
        });

        const currentToggle = $(this);
        const content = currentToggle.siblings(".feature-dropdown-content");
        const timeline = currentToggle.find(".feature-dropdown-time-line");

        // If the clicked content is already open, do nothing
        if (content.hasClass("open")) {
            return;
        }

        // Collapse all other .feature-dropdown-content elements
        $(".feature-dropdown-content")
            .not(content)
            .each(function () {
                gsap.to($(this), { height: 0, duration: 1, ease: "power1.inOut" });
                $(this).removeClass("open");
            });

        // Remove 'open' class from other toggles
        $(".feature-dropdown-toggle").not(currentToggle).removeClass("open");

        // Immediately set the width of all other .feature-dropdown-time-line elements to 0%
        $(".feature-dropdown-time-line")
            .not(timeline)
            .each(function () {
                gsap.killTweensOf(this);
                gsap.set(this, { width: "0%" });
            });

        // Expand the clicked content
        const fullHeight = content.get(0).scrollHeight;
        gsap.to(content, {
            height: fullHeight,
            duration: 1,
            ease: "power1.inOut",
        });
        content.addClass("open");
        currentToggle.addClass("open");

        // Reset the width of the current timeline
        gsap.set(timeline, { width: "0%" });
        gsap.to(timeline, {
            width: "100%",
            duration: 8.5,
            ease: "linear",
            onComplete: function () {
                // Collapse the current content when the animation completes
                gsap.to(content, { height: 0, duration: 1, ease: "power1.inOut" });
                content.removeClass("open");
                currentToggle.removeClass("open");

                // Find the next toggle and trigger a click
                const nextToggle = currentToggle
                    .parent()
                    .next()
                    .find(".feature-dropdown-toggle");

                if (nextToggle.length) {
                    nextToggle.trigger("click");
                } else {
                    $(".feature-dropdown-toggle").first().trigger("click");
                }
            },
        });

        // Animate background image opacity
        const newImageSrc = content
            .find(".custom-feature-image-reference")
            .attr("src");
        const backgroundDiv = $(".custom-image_background");

        // Animate opacity to 0
        gsap.to(backgroundDiv, {
            opacity: 0,
            duration: 0.5,
            onComplete: function () {
                // Change background image once opacity is 0
                backgroundDiv.css("background-image", `url(${newImageSrc})`);
                // Animate opacity back to 1
                gsap.to(backgroundDiv, {
                    opacity: 1,
                    duration: 0.5,
                });
            },
        });
    });

    $(".feature-dropdown-toggle").first().click();
}