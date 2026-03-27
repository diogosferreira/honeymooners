export function filters() {
    function init() {
        const blogList = document.querySelector(".blog-posts_wrapper .w-dyn-items");
        if (!blogList) return;

        sortBlogItems(blogList);

        const searchInput = document.querySelector(".is-blog-search");
        if (searchInput) {
            searchInput.addEventListener("input", () => {
                searchBlogItems(blogList, searchInput.value.trim());
            });

            searchInput.removeAttribute("required");

            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") e.preventDefault();
            });
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

    if (t.includes(q)) return 1;

    const words = t.split(/\s+/);
    for (const word of words) {
        if (word.startsWith(q)) return 2;
    }

    for (const word of words) {
        const maxDist = q.length <= 5 ? 1 : 2;
        if (word.length >= q.length - 1 && word.length <= q.length + 1) {
            if (levenshtein(word, q) <= maxDist) return 3;
        }
        if (word.length > q.length + 1 && levenshtein(word.substring(0, q.length), q) <= 1) return 3;
    }

    return -1;
}

function searchBlogItems(list, query) {
    const items = Array.from(list.querySelectorAll(":scope > .w-dyn-item"));

    if (!query) {
        items.forEach(item => { item.style.display = ""; });
        sortBlogItems(list);
        ScrollTrigger.refresh();
        return;
    }

    const scored = items.map(item => {
        const titleEl = item.querySelector('[data-blog-filter="title"]');
        const title = titleEl ? titleEl.textContent.trim() : "";
        const score = getSearchScore(title, query);
        return { item, score };
    });

    scored.forEach(({ item, score }) => {
        item.style.display = score === -1 ? "none" : "";
    });

    scored
        .filter(s => s.score !== -1)
        .sort((a, b) => {
            if (a.score !== b.score) return a.score - b.score;

            const aFeatured = a.item.querySelector(".featured-blog-toggle") !== null;
            const bFeatured = b.item.querySelector(".featured-blog-toggle") !== null;
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;

            return 0;
        })
        .forEach(({ item }) => list.appendChild(item));

    ScrollTrigger.refresh();
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
