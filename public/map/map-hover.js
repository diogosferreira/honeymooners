export function map() {
    const element = document.querySelector(".map-square-dot");
    if (!element) return;

    console.log("map");

    $(".map-square-dot").hover(
        function () {
            $(".map-square-dot")
                .not(this)
                .each(function () {
                    gsap.to(this, { opacity: 0, duration: 0.3, ease: "power1.inOut" });
                });
        },
        function () {
            $(".map-square-dot").each(function () {
                gsap.to(this, { opacity: 1, duration: 0.3, ease: "power1.inOut" });
            });
        }
    );
}
