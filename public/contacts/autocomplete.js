export function autoComplete() {

    const element = document.querySelector("#Aeroporto-de-partida");
    if (!element) return;


    if (window.location.hostname === "honeymooners-staging.webflow.io") {


        document.addEventListener("DOMContentLoaded", function () {
            const input = document.getElementById("Aeroporto-de-partida");

            if (!input) {
                console.error("❌ Elemento de input não encontrado.");
                return;
            }
            //    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            //    border: 1px solid #ccc;
            const style = document.createElement("style");
            style.textContent = `
      .autocomplete-dropdown {
        position: relative;
        background-color: white;
        border: 1px solid #98694F;
        max-height: 200px;
        overflow-y: auto;
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 1000;
        top: 1rem;
      }

      #results li {
        margin-bottom: 0px;
        color: var(--colors--dark-gold);
        }
  
      .autocomplete-item {
        padding: 8px 12px;
        cursor: pointer;
      }
  
      .autocomplete-item:hover {
        background-color: var(--colors--sand-background-image);
      }
  
      .autocomplete-wrapper {
        position: relative;
      }
    `;
            const wrapper = document.createElement("div");
            wrapper.className = "autocomplete-wrapper";
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            let dropdown = document.createElement("ul");
            dropdown.id = "results";
            dropdown.className = "autocomplete-dropdown";
            dropdown.setAttribute("data", "lenis-allow-scroll");
            //dropdown.setAttribute("clipped-border", "brand-gold-hover-blue-dark");
            //dropdown.setAttribute("clipped-corner", "");
            wrapper.appendChild(dropdown);
            document.head.appendChild(style);

            let airportData = [];
            let currentLanguage;

            if (window.location.href.includes('/pt') || window.location.href.includes('/br')) {
                currentLanguage = 'pt';
            } else if (window.location.href.includes('/es')) {
                currentLanguage = 'es';
            } else {
                currentLanguage = 'en';
            }

            fetch(
                "https://cdn.jsdelivr.net/gh/diogosferreira/honeymooners@b1792c00f9040c1821dcffd9dcab3d100b6e4330/airports_autocomplete_subset_translated_all.json"
            )
                .then((res) => res.json())
                .then((data) => {
                    airportData = data;
                })
                .catch((err) => console.error("❌ Failed to load airport data:", err));

            // Função para remover acentos e deixar tudo em minúsculas
            function normalize(str) {
                return str
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();
            }

            input.addEventListener("input", function () {
                const query = normalize(this.value.trim());
                dropdown.innerHTML = "";

                if (query.length < 2) {
                    dropdown.style.display = "none"; // ✅ hide when query too short
                    return;
                }

                const filtered = airportData.map((item) => {
                    const city = item.city_translations?.[currentLanguage] || item.city || "";
                    const country = item.country_translations?.[currentLanguage] || item.country || "";
                    const airport = item.airport || "";
                    const iata = item.iata || "";
                    return {
                        city,
                        country,
                        airport,
                        iata,
                        normalizedCity: normalize(city),
                    };
                });

                const primaryMatches = filtered.filter((item) =>
                    item.normalizedCity.startsWith(query)
                );

                const boundaryRegex = new RegExp(`\\b${query}`);
                const secondaryMatches = filtered.filter(
                    (item) =>
                        !item.normalizedCity.startsWith(query) &&
                        boundaryRegex.test(item.normalizedCity)
                );

                const sortedPrimary = primaryMatches.sort((a, b) => a.city.localeCompare(b.city));
                const sortedSecondary = secondaryMatches.sort((a, b) => a.city.localeCompare(b.city));

                const matches = [...sortedPrimary, ...sortedSecondary].slice(0, 10);

                if (matches.length === 0) {
                    dropdown.style.display = "none"; // ✅ hide when no matches
                    return;
                } else {
                    dropdown.style.display = "block"; // ✅ show when there are matches
                }

                matches.forEach((match) => {
                    const li = document.createElement("li");
                    li.textContent = `${match.city}, ${match.country} - ${match.airport} (${match.iata})`;
                    li.className = "autocomplete-item";
                    li.addEventListener("click", () => {
                        input.value = li.textContent;
                        input.setAttribute("data-iata", match.iata);
                        input.setAttribute("data-city", match.city);
                        input.setAttribute("data-country", match.country);
                        dropdown.innerHTML = "";
                        dropdown.style.display = "none"; // ✅ hide after selection
                    });
                    dropdown.appendChild(li);
                });
            });


            document.addEventListener("click", function (e) {
                if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.innerHTML = "";
                    dropdown.style.display = "none"; // ✅ hide when clicking outside
                }
            });
        });


    }

}