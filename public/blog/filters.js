export function filters() {
    const element = document.querySelector(".filter-radio-button");
    if (!element) return;


    $("[filter-button]").on("click", function () {
        $("[all-filter-button]").removeClass("is-active");
    });

    $("[all-filter-button]").on("click", function () {
        $("[all-filter-button]").addClass("is-active");
        $("[filter-button]").removeClass("is-active");
    });

}
