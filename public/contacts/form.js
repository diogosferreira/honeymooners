export function form() {
    const element = document.querySelector(".contact-form_wrapper");
    if (!element) return;

    console.log("form");

    $(".radio-button-border").on("click", function () {
        $(this)
            .addClass("is-active")
            .siblings(".radio-button-border")
            .removeClass("is-active");
    });

}
