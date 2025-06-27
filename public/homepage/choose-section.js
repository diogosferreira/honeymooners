export function chooseSection() {
    const element = document.querySelector(".choose_wrapper");
    if (!element) return;



    document
        .querySelectorAll(".choose-button-hover-trigger")
        .forEach((button) => {
            button.addEventListener("mouseenter", function () {
                const parent = button.closest(".choose_wrapper");

                // Change styles using jQuery
                $(button)
                    .closest(".choose_wrapper")
                    .find(".choose-image")
                    .css("border-color", "var(--colors--blue-dark)");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".vertical-line-choose")
                    .css("background-color", "var(--colors--blue-dark)");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".square")
                    .css("background-color", "var(--colors--blue-dark)");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".choose-line")
                    .css("background-color", "var(--colors--blue-dark)");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".text-color-sand-details")
                    .css("color", "var(--colors--blue-dark)");
            });

            button.addEventListener("mouseleave", function () {
                const parent = button.closest(".choose_wrapper");

                // Reset styles on mouseleave
                $(button)
                    .closest(".choose_wrapper")
                    .find(".choose-image")
                    .css("border-color", "");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".vertical-line-choose")
                    .css("background-color", "");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".square")
                    .css("background-color", "");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".choose-line")
                    .css("background-color", "");
                $(button)
                    .closest(".choose_wrapper")
                    .find(".text-color-sand-details")
                    .css("color", "");
            });
        });
}
