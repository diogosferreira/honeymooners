export function userLocation() {
    const element = document.querySelector(".contact-form_wrapper");
    if (!element) return;




    const path = window.location.pathname;

    const euroRanges = ["até 2000€", "2000–3000€", "3000–5000€", "+5000€"];
    const euroInternationalRanges = ["up 2000€", "2000–3000€", "3000–5000€", "+5000€"];

    const brlRanges = [
        "R$15.000-20.000",
        "R$20.000–30.000",
        "R$30.000–50.000",
        "+R$50.000",
    ];
    const esRanges = [
        "2000-3000 USD",
        "3000–5000 USD",
        "5000–10000 USD",
        "+10000 USD",
    ];
    const fallbackRanges = ["2000-3000$", "3000–5000$", "5000–10000$", "+10000$"];

    let newValues = fallbackRanges;

    if (path.startsWith("/pt")) {
        newValues = euroRanges;
        updateOptions(newValues);
    } else if (path.startsWith("/br")) {
        newValues = brlRanges;
        updateOptions(newValues);
    } else if (path.startsWith("/es")) {
        newValues = esRanges;
        updateOptions(newValues);
    } else {
        newValues = fallbackRanges;
        updateOptions(newValues);
    }



    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const country = data.country_name;
            //console.log("Visitor country:", country);

            if (country === "Ireland") {
                newValues = euroInternationalRanges;
            } else if (country === "Portugal") {
                //console.log("Olá Portugal!");
            }
        });



    function updateOptions(values) {
        document
            .querySelectorAll(".radio-button-border")
            .forEach((radioButton, index) => {
                const label = radioButton.querySelector(".form_radio-label");
                const input = radioButton.querySelector('input[type="radio"]');

                if (values[index]) {
                    label.textContent = values[index];
                    input.value = values[index];
                }
            });
    }

}
