export function filters() {
    let currentCategory = "all";
    let currentQuery = "";

    function init() {
        const blogList = document.querySelector(".blog-posts_wrapper .w-dyn-items");
        if (!blogList) return;

        const dynList = blogList.closest(".w-dyn-list");

        function setup() {
            applyFilters(blogList, currentQuery, currentCategory);

            const searchInput = document.querySelector(".is-blog-search");
            if (searchInput) {
                searchInput.addEventListener("input", () => {
                    currentQuery = searchInput.value.trim();
                    applyFilters(blogList, currentQuery, currentCategory);
                });

                searchInput.removeAttribute("required");

                searchInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") e.preventDefault();
                });
            }

            // Move the "All" button into the same flex container as the category
            // buttons so it lines up with them visually. The All button starts in
            // a sibling `.filter-button-static` div (outside the CMS list).
            const allBtnLabel = document.querySelector("#view-all-btn");
            const filtersList = document.querySelector(".filters-list");
            if (allBtnLabel && filtersList) {
                const wrapper = document.createElement("div");
                wrapper.setAttribute("role", "listitem");
                wrapper.appendChild(allBtnLabel);
                filtersList.insertBefore(wrapper, filtersList.firstChild);
            }

            // Category filter buttons
            const categoryButtons = document.querySelectorAll("[data-blog-filter-category]");
            categoryButtons.forEach((btn) => {
                btn.addEventListener("change", () => {
                    setActiveCategory(btn);
                });
                // Some Webflow radios trigger click on label without firing 'change' reliably.
                const label = btn.closest(".filter-button");
                if (label) {
                    label.addEventListener("click", () => {
                        setActiveCategory(btn);
                    });
                }
            });

            function setActiveCategory(btn) {
                currentCategory = btn.getAttribute("data-blog-filter-category") || "all";
                categoryButtons.forEach((b) => {
                    const lbl = b.closest(".filter-button");
                    if (lbl) lbl.classList.toggle("is-active", b === btn);
                });
                applyFilters(blogList, currentQuery, currentCategory);
            }
        }

        // Finsweet List Load V2 integration:
        // If Finsweet is loading additional items, wait until done before sorting.
        // Detected via .is-list-loading class on the .w-dyn-list parent.
        // Falls back to immediate setup when Finsweet isn't present.
        if (dynList && dynList.classList.contains("is-list-loading")) {
            var debounceTimer;
            var observer = new MutationObserver(function () {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function () {
                    if (!dynList.classList.contains("is-list-loading")) {
                        observer.disconnect();
                        setup();
                    }
                }, 500);
            });
            observer.observe(dynList, { attributes: true, attributeFilter: ["class"] });
            observer.observe(blogList, { childList: true });
        } else {
            setup();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}

function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

function getSearchScore(title, query) {
    const t = normalize(title);
    const q = normalize(query);
    const words = t.split(/[\s,:;.!?()'"]+/).filter(Boolean);

    // 1. Exact word match (highest priority)
    if (words.includes(q)) return 1;

    // 2. Word starts with query
    for (const word of words) {
        if (word.startsWith(q)) return 2;
    }

    // 3. Title contains query as substring (lower priority — catches "oma" in "Roma")
    if (t.includes(q)) return 3;

    // 4. Fuzzy match (typo tolerance)
    for (const word of words) {
        const maxDist = q.length <= 5 ? 1 : 2;
        if (word.length >= q.length - 1 && word.length <= q.length + 1) {
            if (levenshtein(word, q) <= maxDist) return 4;
        }
        if (word.length > q.length + 1 && levenshtein(word.substring(0, q.length), q) <= 1) return 4;
    }

    return -1;
}

function applyFilters(list, query, category) {
    const items = Array.from(list.querySelectorAll(":scope > .w-dyn-item"));

    // Step 1: filter by category (if not "all")
    const itemsAfterCategory = items.map(item => {
        const matchCategory = category === "all" || itemHasCategory(item, category);
        return { item, matchCategory };
    });

    // Step 2: score by search query within category matches
    const scored = itemsAfterCategory.map(({ item, matchCategory }) => {
        if (!matchCategory) return { item, score: -1, matchCategory };
        if (!query) return { item, score: 0, matchCategory };

        const titleEl = item.querySelector('[data-blog-filter="title"]');
        const title = titleEl ? titleEl.textContent.trim() : "";
        const score = getSearchScore(title, query);
        return { item, score, matchCategory };
    });

    // Hide non-matching items
    scored.forEach(({ item, score }) => {
        item.style.display = score === -1 ? "none" : "";
    });

    // Sort matching items: by search score first, then featured, then date
    scored
        .filter(s => s.score !== -1)
        .sort((a, b) => {
            if (query && a.score !== b.score) return a.score - b.score;

            const aFeatured = a.item.querySelector(".featured-blog-toggle") !== null;
            const bFeatured = b.item.querySelector(".featured-blog-toggle") !== null;
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;

            if (aFeatured && bFeatured) {
                const aOrder = parseInt(a.item.querySelector("[filter-featured-order]")?.getAttribute("filter-featured-order")) || 999;
                const bOrder = parseInt(b.item.querySelector("[filter-featured-order]")?.getAttribute("filter-featured-order")) || 999;
                return aOrder - bOrder;
            }

            const aDate = new Date(a.item.querySelector("[filter-publish-date]")?.getAttribute("filter-publish-date") || 0);
            const bDate = new Date(b.item.querySelector("[filter-publish-date]")?.getAttribute("filter-publish-date") || 0);
            return bDate - aDate;
        })
        .forEach(({ item }) => list.appendChild(item));

    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}

function itemHasCategory(item, category) {
    const catEl = item.querySelector('[data-blog-filter="category"]');
    if (!catEl) return false;
    return catEl.textContent.trim().toLowerCase() === category.trim().toLowerCase();
}

function sortBlogItems(list) {
    const items = Array.from(list.querySelectorAll(":scope > .w-dyn-item"));

    items.sort((a, b) => {
        const aFeatured = a.querySelector(".featured-blog-toggle") !== null;
        const bFeatured = b.querySelector(".featured-blog-toggle") !== null;

        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;

        if (aFeatured && bFeatured) {
            const aOrder = parseInt(a.querySelector("[filter-featured-order]")?.getAttribute("filter-featured-order")) || 999;
            const bOrder = parseInt(b.querySelector("[filter-featured-order]")?.getAttribute("filter-featured-order")) || 999;
            return aOrder - bOrder;
        }

        const aDate = new Date(a.querySelector("[filter-publish-date]")?.getAttribute("filter-publish-date") || 0);
        const bDate = new Date(b.querySelector("[filter-publish-date]")?.getAttribute("filter-publish-date") || 0);
        return bDate - aDate;
    });

    items.forEach(item => list.appendChild(item));
    ScrollTrigger.refresh();
}
