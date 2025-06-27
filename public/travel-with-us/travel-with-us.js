export function travelWithUs() {
    const element = document.querySelector(".travel_component");
    if (!element) return;

    $(".travel_component").on("mouseenter", function () {
        $(this).addClass("hovered");
    });

    $(".travel_component").on("mouseleave", function () {
        $(this).removeClass("hovered");
    });

}
