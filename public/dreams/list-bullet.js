export function listBullet() {
    const element = document.querySelector(".bullet-point-square");
    if (!element) return;


    console.log("list bullet");


    $("[bullet-points_wrapper]").each(function () {
        const bullet = $(this).find(".bullet-point-square").clone();
        $(this).find(".text-rich-text ul li").prepend(bullet);
    });

}