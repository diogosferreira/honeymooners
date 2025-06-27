export function menu() {
    const element = document.querySelector(".nav_fixed");
    if (!element) return;

    var whiteMenu = false;
    if ($(".menu-button[white-border-button-menu='white']").length > 0) {
        whiteMenu = true;
    }

    //MENU HIDE AND SHOW
    //——————————————————————————————————————————
    //——————————————————————————————————————————
    if ($(window).width() < 991) {
        $(".nav_button").on("click", function () {
            $(".menu-mobile-icon").toggleClass("is-open");
        });
    }

    // ScrollTrigger for showing/hiding nav and animating .nav_background opacity
    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                // Animate opacity of .nav_background to 1
                gsap.to(".nav_background", {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });

                // DESKTOP
                if ($(window).width() > 990) {
                    $('[color-menu="white"]').css("color", "#726c65");
                    //$('[color="white"]').css("color", "#726c65");
                    $(".menu-button").addClass("is-scrolled");
                } else {
                    $(".menu-mobile-icon").css("color", "#98694f");
                }

                // Show/hide navbar based on scroll direction
                if (self.direction === -1) {
                    // Show navbar on scroll up
                    gsap.to(".nav_fixed", {
                        yPercent: 0,
                        duration: 0.9,
                        ease: "power2.out",
                    });
                } else {
                    // Hide navbar on scroll down
                    gsap.to(".nav_fixed", {
                        yPercent: -100,
                        duration: 0.9,
                        ease: "power2.out",
                    });
                }
            } else {
                // Animate opacity of .nav_background to 0
                gsap.to(".nav_background", {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });

                // Always show navbar if less than 100px scrolled
                gsap.to(".nav_fixed", {
                    yPercent: 0,
                    duration: 0.9,
                    ease: "power2.out",
                });

                //Menu color DESKTOP
                if ($(window).width() > 990) {
                    $('[color-menu="white"]').css("color", "white");
                    $(".menu-button").removeClass("is-scrolled");
                } else {
                    // MENU ICON
                    if (whiteMenu) {
                        $(".menu-mobile-icon").css("color", "white");
                    }
                }
            }
        },
    });



}
