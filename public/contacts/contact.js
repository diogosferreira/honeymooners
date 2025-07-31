export function contact() {
    const element = document.querySelector(".contact-form_wrapper");
    if (!element) return;


    //
    $(".radio-button-border").removeClass("is-active");




    if (window.location.hostname === "honeymooners-staging.webflow.io") {
        console.log("Estás no staging.");
        // Coloca aqui o código que deve correr apenas em staging

        console.log("aqui");


        const today = moment().startOf("day");

        const departureInput = $("[data-date-type='departure']");
        let selectedDepartureDate = null;

        // Inicializar campo de partida (data única)
        departureInput.daterangepicker(
            {
                singleDatePicker: true,
                showDropdowns: true,
                autoApply: true,
                autoUpdateInput: false,
                minDate: today,
                locale: { format: "DD/MM/YYYY" },
            },
            function (chosen_date) {
                selectedDepartureDate = chosen_date.clone().startOf("day");
                const formatted = chosen_date.format("DD/MM/YYYY");
                const isoFormatted = chosen_date.format("YYYY-MM-DD");

                this.element.val(formatted);
                $(`[data-date-submit='departure']`).val(isoFormatted);

                // Resetar chegada após escolher partida
                const arrivalInput = $("[data-date-type='arrival']");
                arrivalInput.val("");
                $("[data-date-submit='arrival']").val("");

                // Atualiza intervalo da chegada
                const arrivalPicker = arrivalInput.data("daterangepicker");
                if (arrivalPicker) {
                    arrivalPicker.setStartDate(selectedDepartureDate.clone().add(1, "day"));
                    arrivalPicker.setEndDate(selectedDepartureDate.clone().add(2, "day"));
                    arrivalPicker.minDate = selectedDepartureDate.clone().add(1, "day");
                    arrivalPicker.updateView();
                }
            }
        );


        console.log("apenas 1");
        $("[ms-code-input='date-range']").daterangepicker(
            {
                autoApply: true,
                autoUpdateInput: false,
                showDropdowns: true,
                locale: { format: "DD/MM/YYYY" },
                minDate: today.clone().add(1, "day"),
                startDate: today.clone().add(1, "day"),
                endDate: today.clone().add(2, "day"),
                singleDatePicker: false,
                showCustomRangeLabel: false,
                linkedCalendars: false, // Optional: disables syncing between calendars
                drops: "down",          // Optional: controls position
                opens: "center",        // Optional: controls alignment
                isInvalidDate: () => false,
                // 👇 this is the key to show only one calendar
                alwaysShowCalendars: true,
                // 👇 undocumented but works
                maxSpan: { days: 365 }, // This can be set if you want a limit
            },
            function (start, end) {
                const formatted = `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
                const isoFormatted = `${start.format("YYYY-MM-DD")} to ${end.format("YYYY-MM-DD")}`;

                this.element.val(formatted);
                $(`[data-date-submit='arrival']`).val(isoFormatted);
            }
        );
    } else {


        const today = moment().startOf("day");

        $("[ms-code-input='date']").each(function () {
            const $input = $(this);
            const type = $input.attr("data-date-type");

            $input.daterangepicker(
                {
                    singleDatePicker: true,
                    showDropdowns: true,
                    autoApply: true,
                    autoUpdateInput: false,
                    minDate: type === "departure" ? today : false,
                    locale: { format: "DD/MM/YYYY" },
                },
                function (chosen_date) {
                    const formatted = chosen_date.format("DD/MM/YYYY");
                    const isoFormatted = chosen_date.format("YYYY-MM-DD");

                    this.element.val(formatted);

                    const selectedType = this.element.attr("data-date-type");
                    if (selectedType) {
                        $(`[data-date-submit='${selectedType}']`).val(isoFormatted);
                    }

                    if (selectedType === "departure") {
                        const arrivalInput = $("[data-date-type='arrival']");
                        const arrivalPicker = arrivalInput.data("daterangepicker");

                        // Atualiza o minDate do calendário de chegada
                        arrivalPicker.minDate = chosen_date.clone().add(1, "day");
                        arrivalPicker.updateView();

                        // Verifica se já foi selecionada uma data de chegada
                        const currentArrival = arrivalInput.val();
                        if (currentArrival) {
                            const arrivalMoment = moment(currentArrival, "DD/MM/YYYY");
                            if (!arrivalMoment.isAfter(chosen_date)) {
                                // Limpa se a chegada for no mesmo dia ou anterior à nova partida
                                arrivalInput.val("");
                                $("[data-date-submit='arrival']").val("");
                            }
                        }
                    }
                }
            );
        });

    }





    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let enforceScroll = setInterval(() => window.scrollTo(0, 0), 10);
    lenis.stop();

    const targetElement = document.querySelector("[trip-value]");
    if (!targetElement) return;

    let lastValue = targetElement.textContent.trim();
    let handleSubmit;

    function attachSubmitValidation() {
        const submitBtn = document.querySelector(".is-contact-form-submit");
        const tripSelect = document.getElementById("tipo_viagem");
        if (!submitBtn || !tripSelect) return;

        handleSubmit = function (e) {
            const isFirstSelected =
                tripSelect.selectedIndex === 0 || tripSelect.value === "";
            if (isFirstSelected) {
                e.preventDefault();
                $(".form-error-message").show();
                gsap.to(window, {
                    scrollTo: {
                        y: ".form_form",
                        offsetY: 48,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });
            }
        };

        submitBtn.addEventListener("click", handleSubmit);
    }

    function detachSubmitValidation() {
        const submitBtn = document.querySelector(".is-contact-form-submit");
        if (submitBtn && handleSubmit) {
            submitBtn.removeEventListener("click", handleSubmit);
        }
    }

    const observer = new MutationObserver((mutationsList) => {
        const newValue = targetElement.textContent.trim().toLowerCase();

        // Aplica lógica de visibilidade do campo consoante o valor
        if (newValue !== lastValue) {
            if (
                ["trip", "trip type", "ferias", "férias", "vacaciones"].includes(
                    newValue
                )
            ) {
                attachSubmitValidation();
                $("[trip-field]").show();
                document
                    .querySelector('input[name="numero_passageiros"]')
                    .setAttribute("required", true);
            } else {
                detachSubmitValidation();
                $("[trip-field]").hide();
                document
                    .querySelector('input[name="numero_passageiros"]')
                    .removeAttribute("required");
            }
        }

        // Verifica alterações reais no DOM
        mutationsList.forEach((mutation) => {
            if (
                mutation.type === "childList" ||
                mutation.type === "characterData"
            ) {
                const currentText = targetElement.textContent.trim().toLowerCase();

                const allOptions = Array.from(
                    document.querySelectorAll(".form-dropdown-link-2")
                );
                const selectedIndex = allOptions.findIndex(
                    (opt) => opt.textContent.trim().toLowerCase() === currentText
                );

                const firstOption = allOptions[0]; // normalmente "select your trip"

                //console.log("DEBUG", { currentText, lastValue, selectedIndex });

                //if (currentText !== lastValue && selectedIndex !== -1) {
                const ignoreList = [
                    "select your trip",
                    "escolham a viagem de vocês",
                    "selecionem a vossa viagem",
                    "elijan su viaje",
                ]; // adicionar mais se necessário

                const isValidSelection = !ignoreList.some((item) =>
                    currentText.includes(item.toLowerCase())
                );

                if (currentText !== lastValue && isValidSelection) {
                    //console.log("altera");
                    lastValue = currentText;

                    clearInterval(enforceScroll);
                    lenis.start();

                    [
                        "[contact-animated-border]::before",
                        "[contact-animated-bg]",
                        "[contact-animated-color]",
                        "[contact-selector-background]",
                        ".text-field-desktop",
                        ".gradient-contact-anim",
                    ].forEach((selector) => {
                        $(selector.split("::")[0]).append(
                            `<style>${selector} { animation: none !important; }</style>`
                        );
                    });

                    $(".gradient-contact-anim").css("opacity", "0");
                    $("[contact-animated-color]").css("color", "#e3d0c8");

                    gsap.to("[contact-disabled-line]", {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power1.inOut",
                    });

                    gsap.to(".starts-here_wrapper", {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power1.inOut",
                    });

                    gsap.to(window, {
                        scrollTo: { y: ".section_form", offsetY: 0 },
                        duration: 1,
                        ease: "power1.inOut",
                    });
                }
            }
        });
    });

    observer.observe(targetElement, {
        characterData: true,
        childList: true,
        subtree: true,
    });

    // NUMERIC PHONE ————————————————————————————————————————————————————————
    // NUMERIC PHONE ————————————————————————————————————————————————————————
    // NUMERIC PHONE ————————————————————————————————————————————————————————

    const phoneInput = document.getElementById("Phone");

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Removes all non-digits
    });

    // CONTRY NUMBER AND CODE ————————————————————————————————————————————————————————
    // CONTRY NUMBER AND CODE ————————————————————————————————————————————————————————
    // CONTRY NUMBER AND CODE ————————————————————————————————————————————————————————

    $("input[ms-code-phone-number]").each(function () {
        var input = this;

        var iti = window.intlTelInput(input, {
            preferredCountries: [],
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

        $.get(
            "https://ipinfo.io",
            function (response) {
                var countryCode = response.country;
                iti.setCountry(countryCode);
            },
            "jsonp"
        );

        //input.addEventListener("change", formatPhoneNumber);
        //input.addEventListener("keyup", formatPhoneNumber);

        function formatPhoneNumber() {
            var formattedNumber = iti.getNumber(
                intlTelInputUtils.numberFormat.NATIONAL
            );
            input.value = formattedNumber;
            //
            var ddi = "+" + iti.getSelectedCountryData().dialCode;
            var phone = input.value;

            // Set values to the target inputs
            $("#ddi").val(ddi);
            $("#Phone").val(phone);
            $("#phone_number_ddi").val(ddi + phone);
        }

        //only allow numbers
        $("#phone-number-country").on("input", function () {
            this.value = this.value.replace(/\D/g, "");
        });

        //—— Initial values
        //————————————————————————————————————————————————————————
        //————————————————————————————————————————————————————————
        //————————————————————————————————————————————————————————
        setTimeout(function () {
            var ddi = "+" + iti.getSelectedCountryData().dialCode;
            var phone = input.value;
            $("#ddi").val(ddi);
            $("#Phone").val(phone);
            $("#phone_number_ddi").val(ddi + phone);
        }, 2000);
        // INITIAL END
        //————————————————————————————————————————————————————————
        //————————————————————————————————————————————————————————
        //————————————————————————————————————————————————————————

        var form = $(input).closest("form");
        form.on("submit", function () {
            //formatPhoneNumber();

            var ddi = "+" + iti.getSelectedCountryData().dialCode;
            var phone = input.value;

            $("#ddi").val(ddi);
            $("#Phone").val(phone);
            $("#phone_number_ddi").val(ddi + phone);
        });
    });




    // SUCCESSUL FORM SUBMIT
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————

    /*
    $(document).on('click', '.form-submit-trigger', function () {
        const pathname = window.location.pathname;
        const departureDate = $("input[name='data_de_partida_aproximada']").val().trim();
        console.log("Departure Date:", departureDate);

        let isDateWithin330 = false;

        if (departureDate) {
            const departure = moment(departureDate, "DD/MM/YYYY");
            const today = moment().startOf("day");
            const daysDiff = departure.diff(today, 'days');

            console.log("Days from today:", daysDiff);

            isDateWithin330 = daysDiff <= 330;
        }

        console.log("Is departure within 330 days?", isDateWithin330);

        const $radios = $("input[name='orcamento-minimo-adulto']");
        const $checked = $radios.filter(":checked");
        const index = $radios.index($checked);

        console.log("Selected index:", index, "Total radios:", $radios.length);

        const isLastTwo = index >= ($radios.length - 2);

        console.log("Is in last two options:", isLastTwo);

        // Your combined condition
        if (isDateWithin330 && isLastTwo) {
            if (!pathname.startsWith('/pt') && !pathname.startsWith('/br') && !pathname.startsWith('/es')) {
                window.open('https://info.honeymooners.travel/meetings/yourjourney/beginshere', '_blank');
            }
        }
    });
    */


}
