export function userLocation() {
    const element = document.querySelector(".contact-form_wrapper");
    if (!element) return;




    const path = window.location.pathname;

    const ptRanges = ["até 2000€", "2000–3000€", "3000–5000€", "+5000€"];
    const euroRanges = ["2000–3000€", "3000–5000€", "5000–10000€", "+10000€"];
    const ukRanges = ["2000–3000£", "3000–5000£", "5000–10000£", "+10000£"];
    const euroInternationalRanges = ["2000–3000€", "3000–5000€", "5000–10000€", "+10000€"];

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
    const CADRanges = ["2000-3000CAD", "3000–5000CAD", "5000–10000CAD", "+10000CAD"];


    let newValues = fallbackRanges;

    if (path.startsWith("/pt")) {
        newValues = ptRanges;
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
            const countryCode = data.country_code;
            let newValues;

            console.log("User country:", country);

            // ✅ Specific country rules
            if (country === "Ireland") {
                newValues = euroInternationalRanges;
            } else if (country === "Portugal") {
                newValues = ptRanges;
            } else if (country === "Brazil") {
                newValues = brlRanges;
            } else if (country === "Mexico") {
                newValues = fallbackRanges;
            } else if (country === "United States") {
                newValues = fallbackRanges;
            } else if (country === "Canada") {
                newValues = CADRanges;
            } else if (country === "United Kingdom") {
                newValues = ukRanges;
            }

            // General region rules
            else if (
                // EU/Europe fallback (excluding UK)
                ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "RO", "SK", "SI", "ES", "SE", "NO", "IS", "LI", "CH"].includes(countryCode)
            ) {
                newValues = euroInternationalRanges;
            } else {
                // Rest of the world → USD
                newValues = fallbackRanges;
            }

            //console.log("Selected ranges:", newValues);
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
