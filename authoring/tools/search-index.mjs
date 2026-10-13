const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const text = html => String(html || '')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

export function buildSearchIndex(cfg, fragments) {
  const items = [];
  for (const page of cfg.pages.filter(p => p.status === 'published' && !['404', 'suche'].includes(p.id))) {
    const html = fragments[page.id] || '';
    const basePageTerms = [page.title, page.primaryTask, page.description].join(' ');
    const pageTerms = [basePageTerms, ...(page.searchAliases || [])].join(' ');
    items.push({ title: page.title, page: page.title, href: page.href, excerpt: page.description, terms: pageTerms, keywords: (page.searchAliases || []).join(' '), level: 'page' });
    const headings = [...html.matchAll(/<h([2-4])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)].map(match => ({
      level: Number(match[1]),
      attrs: match[2],
      title: text(match[3]),
      start: match.index,
      end: match.index + match[0].length,
      id: (match[2].match(/\bid="([^"]+)"/i) || [])[1] || ''
    })).filter(heading => heading.id && heading.title && !/^Quellen zu dieser Seite$/i.test(heading.title));
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      let end = html.length;
      for (let j = i + 1; j < headings.length; j++) {
        if (headings[j].level <= heading.level) { end = headings[j].start; break; }
      }
      const body = text(html.slice(heading.end, end));
      const excerpt = body.length > 220 ? body.slice(0, 217).replace(/\s+\S*$/, '') + '…' : body;
      const aliases = (page.sectionSearchAliases || {})[heading.id] || [];
      items.push({
        title: heading.title,
        page: page.title,
        href: `${page.href}#${heading.id}`,
        excerpt,
        terms: [heading.title, basePageTerms, body, ...aliases].join(' '),
        keywords: aliases.join(' '),
        level: 'section'
      });
    }
    for (const match of html.matchAll(/<summary\b([^>]*)>([\s\S]*?)<\/summary>/gi)) {
      const id = (match[1].match(/\bid="([^"]+)"/i) || [])[1] || '';
      const title = text(match[2]);
      if (!id || !title) continue;
      const closing = html.indexOf('</details>', match.index + match[0].length);
      const body = text(html.slice(match.index + match[0].length, closing === -1 ? html.length : closing));
      const excerpt = body.length > 220 ? body.slice(0, 217).replace(/\s+\S*$/, '') + '…' : body;
      const aliases = (page.sectionSearchAliases || {})[id] || [];
      items.push({ title, page: page.title, href: `${page.href}#${id}`, excerpt, terms: [title, basePageTerms, body, ...aliases].join(' '), keywords: aliases.join(' '), level: 'section' });
    }
  }
  return items.map((item, index) => `<li class="puk-site-result" data-search-item data-search-order="${index}" data-search-level="${item.level}" data-search-title="${esc(item.title)}" data-search-keywords="${esc(item.keywords || '')}" data-search-text="${esc(item.terms)}" hidden><h2 class="puk-web-h3"><a href="${esc(item.href)}" aria-label="${esc(`${item.title}: Fundstelle auf der Seite ${item.page} öffnen`)}">${esc(item.title)}</a></h2>${item.level === 'section' ? `<p class="puk-site-result__context">Auf der Seite «${esc(item.page)}»</p>` : ''}<p>${esc(item.excerpt)}</p></li>`).join('\n');
}

export function injectSearchIndex(cfg, fragments) {
  if (!fragments.suche) return;
  const marker = '<!-- GENERATED_SEARCH_INDEX -->';
  if (!fragments.suche.includes(marker)) throw new Error(`Suchindex-Platzhalter fehlt: ${marker}`);
  fragments.suche = fragments.suche.replace(marker, buildSearchIndex(cfg, fragments));
}
