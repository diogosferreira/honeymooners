export function companyGSAP() {
    const element = document.querySelector(".company-card");
    if (!element) return;



    gsap.fromTo(
        ".company-card",
        { opacity: 0 }, // Starting state
        {
            opacity: 1, // Ending state
            duration: 0.8, // Duration of each animation
            stagger: 0.1, // Delay between the start of each animation
            ease: "power3.inOut", // Easing function
        }
    );

}
