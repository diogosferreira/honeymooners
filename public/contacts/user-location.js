export function userLocation() {
    const element = document.querySelector(".contact-form_wrapper");
    if (!element) return;




    const path = window.location.pathname;



    //const ptRanges = ["até 2000€", "2000–3000€", "3000–5000€", "+5000€"];
    //const ptRanges = ["1000-2000€", "2000–3000€", "3000–5000€", "+5000€"];
    //const euroRanges = ["2000–3000€", "3000–5000€", "5000–10000€", "+10000€"];
    /*const brlRanges = [
        "R$15.000-20.000",
        "R$20.000–30.000",
        "R$30.000–50.000",
        "+R$50.000",
    ];*/


    const ptRanges = ["1500-2500€", "2500–4000€", "4000–6000€", "+6000€"];
    const ukRanges = ["3000-5000£", "5000–8000£", "8000–12000£", "+12000£"];
    const euroInternationalRanges = ["3000-5000€", "5000–8000€", "8000–12000€", "+12000€"];


    const brlRanges = [
        "R$20.000-30.000",
        "R$30.000–40.000",
        "R$40.000–50.000",
        "+R$50.000",
    ];

    const esRanges = [
        "2000-3500USD",
        "3500–5000USD",
        "5000–7500USD",
        "+7500USD",
    ];

    const fallbackRanges = ["3000-5000$", "5000–8000$", "8000–12000$", "+12000$"];
    const CADRanges = ["CAD$4000-6000", "CAD$6000–9000", "CAD$9000–12000CAD", "+12000CAD"];


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

            //console.log("User country:", country);

            // ✅ Specific country rules
            if (country === "Ireland") {
                newValues = euroInternationalRanges;
                updateOptions(newValues);
            } else if (country === "Portugal") {
                newValues = ptRanges;
                updateOptions(newValues);
            } else if (country === "Brazil") {
                newValues = brlRanges;
                updateOptions(newValues);
            } else if (country === "Mexico") {
                newValues = fallbackRanges;
                updateOptions(newValues);
            } else if (country === "United States") {
                newValues = fallbackRanges;
                updateOptions(newValues);
            } else if (country === "Canada") {
                newValues = CADRanges;
                updateOptions(newValues);
            } else if (country === "United Kingdom") {
                newValues = ukRanges;
                updateOptions(newValues);
            }

            // General region rules
            else if (
                // EU/Europe fallback (excluding UK)
                ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "RO", "SK", "SI", "ES", "SE", "NO", "IS", "LI", "CH"].includes(countryCode)
            ) {
                newValues = euroInternationalRanges;
                updateOptions(newValues);
            } else {
                // Rest of the world → USD
                newValues = fallbackRanges;
                updateOptions(newValues);
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
