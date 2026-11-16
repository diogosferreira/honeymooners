// Audita o site publicado: dados estruturados, H1, title e meta description.
// node scripts/audit-aeo.mjs            paginas principais + amostra do blogue
// node scripts/audit-aeo.mjs --all      todas as paginas do sitemap
// Sai com codigo 1 se alguma pagina falhar, para servir de alarme.

const SITE = process.env.SITE || 'https://www.honeymooners.travel';
const CONCURRENCY = 8;
const SAMPLE_PER_LOCALE = 3;

const KEY_PATHS = [
    '/', '/our-company', '/our-story', '/love-letters', '/contact',
    '/dream/honeymoon', '/dream/trips', '/blog',
    '/pt', '/pt/pedir-proposta', '/br/pedir-proposta', '/es/pedir-propuesta',
];

async function sitemapUrls() {
    const res = await fetch(`${SITE}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const localeOf = (path) => (['pt', 'br', 'es'].includes(path.split('/')[1]) ? path.split('/')[1] : 'en');

function pickUrls(all) {
    if (process.argv.includes('--all')) return all;
    const keys = KEY_PATHS.map((p) => SITE + (p === '/' ? '' : p));
    const posts = {};
    for (const u of all) {
        const path = u.replace(SITE, '');
        if (!/\/blog\//.test(path)) continue;
        const loc = localeOf(path);
        (posts[loc] ||= []).push(u);
    }
    const sample = Object.values(posts).flatMap((list) => list.slice(0, SAMPLE_PER_LOCALE));
    return [...new Set([...keys, ...sample])];
}

function inspect(html) {
    const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
    const types = new Set();
    for (const block of ld) {
        for (const m of block.matchAll(/"@type"\s*:\s*"([^"]+)"/g)) types.add(m[1]);
    }
    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [, ''])[1].trim();
    // o Webflow escreve content antes de name, por isso as duas ordens contam
    const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
    const tag = meta.find((t) => /\bname=["']description["']/i.test(t)) || '';
    const desc = (tag.match(/\bcontent=["']([^"']*)["']/i) || [, ''])[1].trim();
    return { ld: ld.length, types: [...types], h1: (html.match(/<h1[\s>]/gi) || []).length, title, desc };
}

function problems(r) {
    const out = [];
    if (!r.ld) out.push('sem dados estruturados');
    if (r.h1 !== 1) out.push(`${r.h1} H1`);
    if (!r.title) out.push('sem title');
    else if (r.title.length < 15) out.push(`title curto (${r.title.length})`);
    if (!r.desc) out.push('sem meta description');
    return out;
}

async function audit(url) {
    try {
        const res = await fetch(url, { headers: { 'accept-encoding': 'gzip' } });
        if (!res.ok) return { url, erro: `HTTP ${res.status}` };
        const r = inspect(await res.text());
        return { url, ...r, falhas: problems(r) };
    } catch (e) {
        return { url, erro: e.message };
    }
}

async function run(urls) {
    const results = [];
    let i = 0;
    await Promise.all(
        Array.from({ length: CONCURRENCY }, async () => {
            while (i < urls.length) results.push(await audit(urls[i++]));
        })
    );
    return results.sort((a, b) => a.url.localeCompare(b.url));
}

const all = await sitemapUrls();
const urls = pickUrls(all);
console.log(`${SITE}  |  ${all.length} URLs no sitemap, ${urls.length} auditadas\n`);

const results = await run(urls);
const bad = results.filter((r) => r.erro || r.falhas.length);

for (const r of results) {
    const path = r.url.replace(SITE, '') || '/';
    if (r.erro) { console.log(`FALHA  ${path}\n       ${r.erro}`); continue; }
    const estado = r.falhas.length ? 'FALHA ' : 'ok    ';
    console.log(`${estado} ${path}`);
    if (r.falhas.length) console.log(`       ${r.falhas.join(', ')}`);
}

const comLd = results.filter((r) => r.ld > 0).length;
const tipos = [...new Set(results.flatMap((r) => r.types || []))].sort();
console.log(`\n${comLd}/${results.length} com dados estruturados`);
if (tipos.length) console.log(`tipos encontrados: ${tipos.join(', ')}`);
console.log(`${bad.length} pagina(s) com problemas`);

process.exit(bad.length ? 1 : 0);
