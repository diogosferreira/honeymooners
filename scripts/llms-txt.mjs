// Gera o conteudo do llms.txt a partir do sitemap publicado, nos quatro idiomas.
// node scripts/llms-txt.mjs > llms.txt
// node scripts/llms-txt.mjs --limit 40      no maximo 40 guias por idioma
// O Webflow nao expoe o llms.txt na API: o resultado e para colar em Site settings.

const SITE = process.env.SITE || 'https://www.honeymooners.travel';
const CONCURRENCY = 8;
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg > -1 ? Number(process.argv[limitArg + 1]) : 0;

const INTRO = `# Honeymooners

> Honeymooners is a global luxury travel agency specializing in honeymoons and once-in-a-lifetime trips for couples and families, with custom itineraries, personalized experiences and full client support. Founded by Joana & André.

Honeymooners books 8-figures of travel annually and has planned thousands of honeymoons worldwide. The agency designs tailor-made romantic and luxury journeys, from the Maldives, Bora Bora and the Polynesian islands to Italy, Greece, Africa and beyond. Headquartered in New York, with offices across the Americas, Europe, the Middle East, Africa, Asia and Oceania. Primary markets: United States and Portugal (service in EN, PT, PT-BR and ES).`;

const LOCALES = { en: 'English', pt: 'Portugues', br: 'Portugues do Brasil', es: 'Espanol' };

const localeOf = (path) => (['pt', 'br', 'es'].includes(path.split('/')[1]) ? path.split('/')[1] : 'en');

async function sitemapUrls() {
    const res = await fetch(`${SITE}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap ${res.status}`);
    return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, SITE));
}

async function meta(url) {
    try {
        const html = await (await fetch(url)).text();
        const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [, ''])[1].trim();
        const tag = ([...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
            .find((t) => /\bname=["']description["']/i.test(t))) || '';
        const desc = (tag.match(/\bcontent=["']([^"']*)["']/i) || [, ''])[1].trim();
        return { url, title, desc };
    } catch {
        return { url, title: '', desc: '' };
    }
}

async function fetchAll(urls) {
    const out = [];
    let i = 0;
    await Promise.all(
        Array.from({ length: CONCURRENCY }, async () => {
            while (i < urls.length) out.push(await meta(urls[i++]));
        })
    );
    return new Map(out.map((m) => [m.url, m]));
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', apos: "'" };

const clean = (s = '') =>
    s
        .replace(/&(#39|amp|lt|gt|quot|nbsp|apos);/g, (_, e) => ENTIDADES[e])
        .replace(/\s*[|–]\s*Honeymooners\s*$/i, '')
        .replace(/\s*\u2014\s*/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();

const line = (m) => (m.desc ? `- [${clean(m.title)}](${m.url}): ${clean(m.desc)}` : `- [${clean(m.title)}](${m.url})`);

const all = await sitemapUrls();
const byLocale = {};
for (const u of all) {
    const path = u.replace(SITE, '') || '/';
    const loc = localeOf(path);
    const grupo = /\/blog\//.test(path) ? 'guias' : 'paginas';
    ((byLocale[loc] ||= { paginas: [], guias: [] })[grupo]).push(u);
}

const wanted = [];
for (const loc of Object.keys(LOCALES)) {
    const g = byLocale[loc];
    if (!g) continue;
    g.guias.sort();
    if (LIMIT > 0) g.guias = g.guias.slice(0, LIMIT);
    wanted.push(...g.paginas, ...g.guias);
}

process.stderr.write(`a ler ${wanted.length} paginas...\n`);
const metas = await fetchAll(wanted);

const partes = [INTRO];
for (const [loc, nome] of Object.entries(LOCALES)) {
    const g = byLocale[loc];
    if (!g) continue;
    if (g.paginas.length) {
        partes.push(`## Key pages (${nome})`);
        partes.push(g.paginas.map((u) => line(metas.get(u))).join('\n'));
    }
    if (g.guias.length) {
        partes.push(`## Destination guides (${nome})`);
        partes.push(g.guias.map((u) => `- [${clean(metas.get(u).title)}](${u})`).join('\n'));
    }
}

console.log(partes.join('\n\n'));
process.stderr.write(`feito: ${wanted.length} entradas\n`);
