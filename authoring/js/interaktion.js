/* PUK Website-Profil · Interaktion ohne React (06.10.2026)
   Akkordeon, Reiter, Dropdown-Menü, Dialog und Erklärmuster G (Modell in Schritten) für statische Websites.
   Keine Abhängigkeiten, keine Inline-Skripte nötig: als script-Element mit src="components/interaktion.js" und defer einbinden.
   Ohne Skript bleiben alle Inhalte sichtbar (progressive Verbesserung).
   Markup und Regeln: templates/website/interaktion/README.md, Abschnitt «Interaktionskonzept». */
(function () {
  'use strict';
  var uid = 0;
  function id(el, prefix) { if (!el.id) el.id = prefix + '-' + (++uid); return el.id; }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* Akkordeon: <div class="puk-acc" data-puk-accordion [data-multiple]>
       <div class="puk-acc__item" [data-open]><h3 class="puk-acc__heading">Frage</h3><div class="puk-acc__panel">…</div></div> */
  function accordion(root) {
    var multiple = root.hasAttribute('data-multiple');
    var buttons = [];
    [].forEach.call(root.querySelectorAll(':scope > .puk-acc__item'), function (item) {
      var heading = item.querySelector('.puk-acc__heading'), panel = item.querySelector('.puk-acc__panel');
      if (!heading || !panel) return;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'puk-acc__button';
      var label = document.createElement('span'); label.className = 'puk-acc__label';
      while (heading.firstChild) label.appendChild(heading.firstChild);
      btn.appendChild(label);
      var chev = document.createElement('span'); chev.className = 'puk-acc__chevron'; chev.setAttribute('aria-hidden', 'true');
      btn.appendChild(chev); heading.appendChild(btn);
      var open = item.hasAttribute('data-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-controls', id(panel, 'puk-acc-panel'));
      panel.setAttribute('role', 'region'); panel.setAttribute('aria-labelledby', id(btn, 'puk-acc-kopf'));
      panel.hidden = !open;
      buttons.push(btn);
      btn.addEventListener('click', function () {
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';
        if (willOpen && !multiple) buttons.forEach(function (b) { if (b !== btn) set(b, false); });
        set(btn, willOpen);
      });
    });
    function set(b, open) { b.setAttribute('aria-expanded', String(open)); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; }
    root.addEventListener('keydown', function (e) {
      var i = buttons.indexOf(document.activeElement); if (i < 0) return;
      var n = { ArrowDown: (i + 1) % buttons.length, ArrowUp: (i - 1 + buttons.length) % buttons.length, Home: 0, End: buttons.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault(); buttons[n].focus();
    });
  }

  /* Reiter: <div class="puk-tabs" data-puk-tabs aria-label="…">
       <section class="puk-tabs__panel" [data-label="…"]><h3 class="puk-tabs__heading">…</h3>…</section> … */
  function tabs(root) {
    var panels = [].slice.call(root.querySelectorAll(':scope > .puk-tabs__panel'));
    if (panels.length < 2) return;
    var list = document.createElement('div');
    list.className = 'puk-tabs__list'; list.setAttribute('role', 'tablist');
    if (root.getAttribute('aria-label')) { list.setAttribute('aria-label', root.getAttribute('aria-label')); root.removeAttribute('aria-label'); }
    var tabsEls = panels.map(function (panel, i) {
      var heading = panel.querySelector('.puk-tabs__heading');
      var label = panel.getAttribute('data-label') || (heading ? heading.textContent.trim() : 'Reiter ' + (i + 1));
      var tab = document.createElement('button');
      tab.type = 'button'; tab.className = 'puk-tabs__tab'; tab.setAttribute('role', 'tab'); tab.textContent = label;
      tab.setAttribute('aria-controls', id(panel, 'puk-tab-panel'));
      panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', id(tab, 'puk-tab')); panel.tabIndex = 0;
      if (heading) heading.classList.add('puk-sr');
      list.appendChild(tab);
      tab.addEventListener('click', function () { select(i, false); });
      return tab;
    });
    root.insertBefore(list, panels[0]);
    function select(i, focus) {
      tabsEls.forEach(function (t, j) { var on = j === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[j].hidden = !on; });
      if (focus) { tabsEls[i].focus(); if (tabsEls[i].scrollIntoView) tabsEls[i].scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    }
    list.addEventListener('keydown', function (e) {
      var i = tabsEls.indexOf(document.activeElement); if (i < 0) return;
      var n = { ArrowRight: (i + 1) % tabsEls.length, ArrowLeft: (i - 1 + tabsEls.length) % tabsEls.length, Home: 0, End: tabsEls.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault(); select(n, true);
    });
    var start = panels.findIndex(function (p) { return p.hasAttribute('data-selected'); });
    select(start < 0 ? 0 : start, false);
  }

  /* Dropdown-Menü: <div class="puk-disclosure" data-puk-disclosure>
       <span class="puk-disclosure__label">Themen</span><ul class="puk-disclosure__panel"><li><a class="puk-disclosure__link" href="…">…</a></li></ul></div>
     Ist die Schaltfläche per CSS ausgeblendet (Hauptnavigation des Starters auf breiten Bildschirmen, .puk-site-menu),
     verhält sich die Liste wie eine normale Navigation: keine Pfeiltasten, kein Escape. */
  function disclosure(root) {
    var label = root.querySelector('.puk-disclosure__label'), panel = root.querySelector('.puk-disclosure__panel');
    if (!label || !panel) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'puk-disclosure__button';
    btn.appendChild(document.createTextNode(label.textContent.trim()));
    var chev = document.createElement('span'); chev.className = 'puk-disclosure__chevron'; chev.setAttribute('aria-hidden', 'true'); btn.appendChild(chev);
    label.replaceWith(btn);
    if (panel.querySelector('[aria-current="page"]')) btn.setAttribute('data-current', 'true');
    btn.setAttribute('aria-controls', id(panel, 'puk-menu'));
    var links = function () { return [].slice.call(panel.querySelectorAll('a')); };
    var active = function () { return btn.getClientRects().length > 0; };
    function set(open, focusBtn) {
      btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open;
      if (!open && focusBtn) btn.focus();
    }
    set(false);
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); set(true); var l = links(); if (l[0]) l[0].focus(); }
    });
    panel.addEventListener('keydown', function (e) {
      if (!active()) return;
      var l = links(), i = l.indexOf(document.activeElement);
      var n = { ArrowDown: Math.min(i + 1, l.length - 1), ArrowUp: i - 1, Home: 0, End: l.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault();
      if (n < 0) btn.focus(); else l[n].focus();
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && active() && btn.getAttribute('aria-expanded') === 'true') { e.preventDefault(); set(false, true); } });
    document.addEventListener('pointerdown', function (e) { if (!root.contains(e.target)) set(false); });
    root.addEventListener('focusout', function (e) { if (e.relatedTarget && !root.contains(e.relatedTarget)) set(false); });
  }

  /* Dialog: <button data-puk-dialog-open="id">…</button>
       <dialog class="puk-dialog" id="id" aria-labelledby="titel">… <button data-puk-dialog-close>…</button></dialog>
       data-static am dialog verhindert das Schliessen per Klick auf den Hintergrund. */
  function dialogs(scope) {
    [].forEach.call(scope.querySelectorAll('[data-puk-dialog-open]'), function (trigger) {
      if (trigger.hasAttribute('data-enhanced')) return; trigger.setAttribute('data-enhanced', '');
      var dlg = document.getElementById(trigger.getAttribute('data-puk-dialog-open'));
      if (!dlg || typeof dlg.showModal !== 'function') { trigger.hidden = true; return; }
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', function () { dlg._pukOpener = trigger; document.documentElement.classList.add('puk-scroll-lock'); dlg.showModal(); });
      if (dlg.hasAttribute('data-enhanced')) return; dlg.setAttribute('data-enhanced', '');
      dlg.addEventListener('close', function () {
        document.documentElement.classList.remove('puk-scroll-lock');
        if (dlg._pukOpener) dlg._pukOpener.focus();
      });
      dlg.addEventListener('click', function (e) {
        if (e.target.closest('[data-puk-dialog-close]')) { dlg.close(); return; }
        if (e.target === dlg && !dlg.hasAttribute('data-static')) {
          var r = dlg.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
        }
      });
    });
  }


  /* Erklärmuster G «Modell in Schritten»: <figure data-vis-build> mit .puk-vis-build, .puk-vis-build__steps li,
     [data-step]-Gruppen in der Grafik und .puk-vis-build__controls (Buttons data-act="toggle|prev|next", Status).
     Grundzustand ist immer das ganze Modell. */
  function visBuild(fig) {
    var build = fig.querySelector('.puk-vis-build'), ctr = fig.querySelector('.puk-vis-build__controls');
    if (!build || !ctr) return;
    var items = [].slice.call(build.querySelectorAll('.puk-vis-build__steps li')), parts = [].slice.call(build.querySelectorAll('[data-step]'));
    var n = items.length, k = 1;
    var tog = ctr.querySelector('[data-act=toggle]'), prev = ctr.querySelector('[data-act=prev]'), next = ctr.querySelector('[data-act=next]'), st = ctr.querySelector('.puk-vis-build__status');
    ctr.setAttribute('data-enhanced', '');
    function render(announce) {
      var steps = build.getAttribute('data-mode') === 'steps';
      items.forEach(function (li, i) { li.classList.toggle('is-later', steps && i >= k); if (steps && i === k - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
      parts.forEach(function (p) { p.classList.toggle('is-later', steps && +p.getAttribute('data-step') > k); });
      prev.hidden = next.hidden = !steps; prev.disabled = k <= 1; next.disabled = k >= n;
      tog.textContent = steps ? 'Ganzes Modell zeigen' : 'Schritt für Schritt aufbauen';
      if (announce) st.textContent = steps ? 'Schritt ' + k + ' von ' + n + ': ' + items[k - 1].querySelector('h3').textContent.replace(/^Teil \d+: /, '') : 'Ganzes Modell sichtbar';
    }
    tog.addEventListener('click', function () { var s = build.getAttribute('data-mode') === 'steps'; build.setAttribute('data-mode', s ? 'all' : 'steps'); k = 1; render(true); });
    prev.addEventListener('click', function () { if (k > 1) { k--; render(true); } if (k <= 1) tog.focus(); });
    next.addEventListener('click', function () { if (k < n) { k++; render(true); } if (k >= n) prev.focus(); });
    render(false);
  }

  /* Lokale Listen durchsuchen, ohne Inhalte nachzuladen. Ohne JavaScript bleiben
     alle Einträge sichtbar. Mehrere Suchwörter werden als UND-Suche behandelt. */
  function filterList(root) {
    var input = root.querySelector('[data-filter-input]');
    var selector = root.getAttribute('data-filter-selector') || '[data-filter-item]';
    var items = [].slice.call(root.querySelectorAll(selector));
    var status = root.querySelector('[data-filter-status]');
    var empty = root.querySelector('[data-filter-empty]');
    if (!input || !items.length) return;
    root.setAttribute('data-filter-enhanced', '');
    function normalized(value) {
      return String(value || '').toLocaleLowerCase('de-CH').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    function renderFilter() {
      var terms = normalized(input.value).trim().split(/\s+/).filter(Boolean);
      var visible = 0;
      items.forEach(function (item) {
        var match = !terms.length || terms.every(function (term) { return normalized(item.textContent).indexOf(term) !== -1; });
        item.hidden = !match;
        if (match) {
          visible++;
          if (terms.length) [].forEach.call(item.querySelectorAll('details'), function (details) { details.open = true; });
        }
      });
      if (status) status.textContent = terms.length ? visible + ' von ' + items.length + ' Treffern sichtbar.' : items.length + ' Einträge verfügbar.';
      if (empty) empty.hidden = visible !== 0;
    }
    input.addEventListener('input', renderFilter);
    renderFilter();
  }

  /* Abschnittssuche: Der Build legt einen lokalen Index in data-Attributen an.
     Es werden keine Eingaben übertragen oder gespeichert. Ohne JavaScript bleibt
     das kurze Seitenverzeichnis sichtbar. */
  function siteSearch(root) {
    var input = root.querySelector('[data-search-input]');
    var status = root.querySelector('[data-search-status]');
    var empty = root.querySelector('[data-search-empty]');
    var directory = root.querySelector('[data-search-directory]');
    var results = root.querySelector('[data-search-results]');
    var items = [].slice.call(root.querySelectorAll('[data-search-item]'));
    var limit = +(root.getAttribute('data-search-limit') || 20);
    if (!input || !results || !items.length) return;
    root.setAttribute('data-search-enhanced', '');
    function normalized(value) {
      return String(value || '').normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    }
    var stopwords = new Set(('aber als am an auf aus bei bin bis brauche das dass dem den der des die darf dich dir ein eine einer einem einen er erlebt es fuer finde gefunden gegen geht gibt hat haben helfen ich ihm ihn im in ist ja kann koennen lassen man mein meine meiner meinem meinen mich mir mit nach noch oder partner partnerin sage schon sich sie sind so sohn soll sprechen tochter um und uns unser unsere von vor warum was welche welcher welches wenn wer wie wir wo zu zum zur').split(' '));
    var synonymSets = [
      ['umbringen', 'umzubringen', 'selbstmord', 'selbsttoetung', 'suizid', 'suizidal', 'suizidgedanken', 'sterben', 'leben nehmen', 'das leben nehmen', 'sich das leben nehmen', 'nicht mehr leben', 'nicht weiterleben', 'nicht weiter leben', 'nicht mehr da sein', 'nicht mehr aufwachen', 'sterben wollen', 'will sterben', 'moechte sterben', 'tot sein', 'selbstmordgedanken', 'selbstmordversuch', 'suizidversuch', 'suizidalitaet', 'suizidgefahr', 'suizidandrohung', 'suiziddrohung', 'lebensmuede', 'lebensmuedigkeit', 'todeswunsch', 'abschiedsbrief', 'ueberdosis', 'tabletten genommen', 'zu viele tabletten', 'selbstmordversuche', 'suizidversuche', 'suiziddrohungen', 'suizidandrohungen', 'todeswuensche', 'abschiedsbriefe', 'ueberdosen', 'lebensmueder', 'ist lebensmuede', 'tabletten geschluckt'],
      ['arzt', 'aerztin', 'behandler', 'behandlerin', 'therapeut', 'therapeutin', 'fachperson', 'fachpersonen', 'behandlungsteam'],
      ['ablehnen', 'abgelehnt', 'lehnt', 'verweigern', 'verweigert', 'keine', 'will', 'moechte', 'nicht wollen', 'will nicht', 'moechte nicht'],
      ['normal', 'stabil', 'stabiler', 'ruhig', 'ruhiger', 'unauffaellig', 'anders'],
      ['hilfe', 'unterstuetzung', 'beratung', 'angehoerigenberatung', 'entlastung'],
      ['streit', 'konflikt', 'konflikte', 'eskalation', 'eskaliert', 'kippt'],
      ['erschoepft', 'ueberfordert', 'belastet', 'kraft', 'am ende', 'keine kraft', 'kann nicht mehr', 'ich kann nicht mehr'],
      ['kind', 'kinder', 'jugendliche'],
      ['einweisen', 'einweisung', 'fuersorgerisch', 'fuersorgerische', 'fu'],
      ['medikament', 'medikamente', 'tabletten', 'antidepressivum'],
      ['pause', 'pausieren', 'kontaktpause', 'abstand'],
      ['selbstverletzung', 'selbstverletzen', 'verletzt', 'ritzen'],
      ['angehoerigengruppe', 'selbsthilfegruppe', 'gruppe', 'austausch'],
      ['gespraech', 'reden', 'kommunikation'],
      ['genesung', 'recovery', 'remission', 'besser', 'bessern', 'verbessern'],
      ['kosten', 'bezahlt', 'bezahlen', 'krankenkasse', 'finanzierung'],
      ['gewalt', 'gewalttaetig', 'schlaegt', 'schlagen', 'geschlagen', 'bedroht', 'bedrohen', 'bedrohung', 'gewuergt', 'wuergt', 'frauenhaus', 'angst vor ihm', 'angst vor ihr', 'angst vor meinem partner', 'angst vor meiner partnerin', 'angst vor meinem mann', 'angst vor meiner frau', 'bedroht mich', 'mich bedroht', 'morddrohung', 'todesdrohung', 'wuergen', 'angst vor meinem sohn', 'angst vor meiner tochter', 'angst vor meinem vater', 'angst vor meiner mutter', 'angst vor meinem bruder', 'angst vor meiner schwester', 'mit dem tod bedroht', 'mit dem tod gedroht', 'droht mit dem tod', 'drohte mit dem tod', 'droht mit mord', 'mit mord gedroht', 'mit mord bedroht', 'angst vor meinem ex', 'angst vor meiner ex']
    ];
    /* Tötungsverben («umbringen», «töten», «bringt … mich … um»): Wer gemeint ist, entscheidet die Gruppe (D30-01, D30-09, D30-13, D30-16).
       Suizid hat Vorrang (D30-17, Variante F der Prüfsitzung): Eine Fehlleitung von Suizidsorge auf «Gewalt» wiegt schwerer
       als umgekehrt.
       1. Steht «sich» irgendwo in der Anfrage → Suizid, auch beim erweiterten Suizid («sich und die Kinder»).
       2. Sonst das nächste Objekt vor dem Verb im Teilsatz (Grenze: «dass», «wenn», «weil», «warum» usw.):
          «mich» geht anderen Objekten vor: Es entscheidet das nächste Subjekt davor im Teilsatz («ich» → Suizid; «er», «sie»,
          «du», «jemand», «mein Mann», «mein Kind» … → Gewalt), sonst ein Subjekt direkt danach («mich mein Mann») → Gewalt,
          sonst ein Subjekt in einem früheren Teilsatz, sonst bei einem Drohwort Gewalt, sonst Suizid;
          «uns», «dich», «ihn», «euch», «die Kinder», «das Kind», «meine Familie» → Gewalt.
       3. Sonst «sie» oder eine Person als Objekt («meine Mutter», «meinen Vater») → Gewalt, aber nur mit einem Subjekt davor
          im Teilsatz («er will meine Mutter umbringen»); ohne Subjekt («Tochter umbringen») gilt die übliche Suche.
       «bringe ich mich um» und «bringt sie sich um» bleiben bewusst aussen vor (Druck durch Suizidandrohung, Ersttreffer
       «Zugewandt und klar sprechen» › «Wenn Worte treffen», festgelegt in R25-010). */
    var killVerbs = { umbringen: 1, umzubringen: 1, umbringt: 1, umbringe: 1, umbringst: 1, umbrachte: 1, toeten: 1, toete: 1, toetet: 1, umgebracht: 1, getoetet: 1 };
    var persons = { mann: 1, partner: 1, partnerin: 1, frau: 1, freund: 1, freundin: 1, sohn: 1, tochter: 1, vater: 1, mutter: 1, bruder: 1, schwester: 1, ex: 1,
      kind: 1, kinder: 1, ehemann: 1, ehefrau: 1, exmann: 1, exfrau: 1, expartner: 1, expartnerin: 1, lebenspartner: 1, lebenspartnerin: 1,
      eltern: 1, mama: 1, papa: 1, stiefvater: 1, stiefmutter: 1, familie: 1 };
    var thirdParty = Object.assign({ er: 1, sie: 1, du: 1, jemand: 1, man: 1 }, persons);
    var plainObjects = { mich: 1, uns: 1, dich: 1, ihn: 1, euch: 1, kinder: 1, kind: 1, familie: 1 };
    var clauseWords = { dass: 1, wenn: 1, weil: 1, ob: 1, falls: 1, obwohl: 1, nachdem: 1, seit: 1, seitdem: 1, bevor: 1,
      damit: 1, warum: 1, wieso: 1, weshalb: 1, was: 1, wie: 1, aber: 1, denn: 1, sonst: 1 };
    var threatWords = { droht: 1, drohen: 1, gedroht: 1, drohte: 1, drohung: 1, drohungen: 1 };
    var nominativeArticles = { mein: 1, meine: 1, dein: 1, deine: 1, sein: 1, seine: 1, ihr: 1, ihre: 1, unser: 1, unsere: 1, der: 1, die: 1, das: 1, ein: 1, eine: 1 };
    var nominativeSubjects = { er: 1, du: 1, jemand: 1, man: 1 };
    function clauseStart(words, index) {
      for (var i = index - 1; i >= 0; i--) if (clauseWords[words[i]]) return i + 1;
      return 0;
    }
    /* «mich»: zuerst das nächste Subjekt davor im Teilsatz, dann ein Subjekt direkt danach («dass mich mein Mann …»),
       dann ein Subjekt in einem früheren Teilsatz, zuletzt ein Drohwort (D30-18, D30-19). */
    var attemptWords = { versucht: 1, versuchte: 1, versuch: 1, plant: 1, geplant: 1 };
    var controlWords = { haelt: 1, halten: 1, abhalten: 1, abgehalten: 1, ab: 1, hindert: 1, hindern: 1, gehindert: 1, daran: 1, davon: 1, dazu: 1,
      bittet: 1, bitten: 1, gebeten: 1, bat: 1, zwingt: 1, zwingen: 1, gezwungen: 1, treibt: 1, treiben: 1, getrieben: 1,
      ueberredet: 1, ueberreden: 1, angefleht: 1, anfleht: 1, fleht: 1, draengt: 1, gedraengt: 1, ermutigt: 1, aufgefordert: 1, fordert: 1 };
    function michIntent(words, objectIndex) {
      var start = clauseStart(words, objectIndex), i;
      /* Reflexives «mich» im Infinitiv («meine Familie hält mich davon ab, mich umzubringen») oder verneint
         («er bittet mich, mich nicht umzubringen») → Suizid, sofern kein Drohwort und kein «versucht», «plant» vorkommt
         (D30-20, Variante I der Prüfsitzung). */
      var killVerb = -1;
      for (i = objectIndex + 1; i <= objectIndex + 4 && i < words.length; i++) if (killVerbs[words[i]]) { killVerb = i; break; }
      if (killVerb !== -1 && !words.some(function (word) { return threatWords[word] || attemptWords[word]; })) {
        var zuInfinitive = words[killVerb] === 'umzubringen' || (words[killVerb] === 'toeten' && words[killVerb - 1] === 'zu');
        var negated = words.slice(objectIndex + 1, killVerb).some(function (word) { return word === 'nicht' || word === 'nie'; });
        /* (a) nur mit einem Steuerverb zwischen dem früheren «mich» und diesem («hält mich davon ab, mich …», «bittet mich, mich …»);
           «er hat mich geschlagen und will mich umzubringen» bleibt Gewalt (Codex P1 auf #689) */
        var steered = false;
        for (i = objectIndex - 1; i >= Math.max(0, objectIndex - 5); i--) {
          if (words[i] === 'und' || clauseWords[words[i]]) break;
          if (words[i] === 'mich') {
            for (var k = Math.max(0, i - 2); k < objectIndex; k++) if (controlWords[words[k]]) steered = true;
            break;
          }
        }
        if ((zuInfinitive && steered) || negated) return 'suizid';
      }
      for (i = objectIndex - 1; i >= start; i--) {
        if (words[i] === 'ich') return 'suizid';
        if (thirdParty[words[i]]) return 'gewalt';
      }
      var next = objectIndex + 1;
      if (nominativeSubjects[words[next]] || persons[words[next]]) return 'gewalt';
      /* Artikel und bis zu zwei Beiwörter vor der Person («dass mich mein eigener Mann …», Codex P1 auf #689) */
      if (nominativeArticles[words[next]]) {
        for (i = next + 1; i <= next + 3 && i < words.length; i++) {
          if (persons[words[i]]) return 'gewalt';
          if (killVerbs[words[i]] || clauseWords[words[i]] || words[i] === 'und') break;
        }
      }
      for (i = start - 1; i >= 0; i--) {
        if (words[i] === 'ich') return 'suizid';
        if (thirdParty[words[i]]) return 'gewalt';
      }
      return words.some(function (word) { return threatWords[word]; }) ? 'gewalt' : 'suizid';
    }
    function verbIntent(words, verb) {
      var start = clauseStart(words, verb), i;
      /* «mich» im Teilsatz geht anderen Objekten vor («ich will mich wegen meiner Familie umbringen», D30-19). */
      for (i = verb - 1; i >= start; i--) if (words[i] === 'mich') return michIntent(words, i);
      for (i = verb - 1; i >= start; i--) if (plainObjects[words[i]]) return 'gewalt';
      for (i = verb - 1; i >= start; i--) {
        if (words[i] === 'sie' || persons[words[i]]) {
          for (var j = i - 1; j >= start; j--) if (words[j] === 'ich' || thirdParty[words[j]]) return 'gewalt';
          return null;
        }
      }
      return null;
    }
    function killIntent(words) {
      var verbs = [], i;
      for (i = 0; i < words.length; i++) if (killVerbs[words[i]]) verbs.push(i);
      if (!verbs.length) {
        var bringt = words.indexOf('bringt');
        var um = bringt === -1 ? -1 : words.indexOf('um', bringt + 1);
        if (um === -1) return null;
        /* nur «… bringt mich um» (Drohung gegen die eigene Person); «bringt sie sich um» bleibt bei der bisherigen Wertung (R25-010) */
        for (i = bringt + 1; i < um; i++) if (words[i] === 'mich') return michIntent(words, i);
        return null;
      }
      if (words.indexOf('sich') !== -1) return 'suizid';
      /* Jedes Tötungsverb wird gewertet; ergibt eines Suizid, gilt Suizid («er will mich umbringen und ich will mich töten»,
         Codex P1 auf #689). */
      var intents = verbs.map(function (verb) { return verbIntent(words, verb); });
      if (intents.indexOf('suizid') !== -1) return 'suizid';
      return intents.indexOf('gewalt') !== -1 ? 'gewalt' : null;
    }

    var synonyms = {};
    var phraseGroups = [];
    var suicideWords = {};
    synonymSets.forEach(function (set) {
      var values = set.map(normalized);
      values.forEach(function (value) {
        if (value.indexOf(' ') === -1) synonyms[value] = values;
        else phraseGroups.push({ phrase: value, group: values });
      });
    });
    /* eindeutige Suizidwörter; «sterben» und «umbringen» sind mehrdeutig und laufen über Phrasen und die Regel für Tötungsverben */
    synonyms.suizid.forEach(function (value) {
      if (value.indexOf(' ') === -1 && value !== 'sterben' && value !== 'umbringen' && value !== 'umzubringen') suicideWords[value] = 1;
    });
    function queryGroups(query) {
      var normalizedQuery = normalized(query);
      var paddedQuery = ' ' + normalizedQuery + ' ';
      var phraseHits = phraseGroups.filter(function (entry) {
        return paddedQuery.indexOf(' ' + entry.phrase + ' ') !== -1;
      }).sort(function (a, b) { return b.phrase.length - a.phrase.length; });
      var phraseHit = phraseHits[0];
      /* Eine erkannte Mehrwort-Intention hat Vorrang vor einzelnen, mehrdeutigen
         Wörtern. So wird etwa «will nicht mehr leben» als Sicherheitsfrage und
         nicht als Kombination aus Ablehnung, «mehr» und «leben» bewertet. */
      var words = normalizedQuery.split(/\s+/).filter(Boolean);
      /* Suizid-Vorrang: Eine Suizid-Phrase («will sterben») oder ein eindeutiges Suizidwort («Suizidgedanken») in der Anfrage
         geht jeder anderen Phrase und der Gewalt-Wertung vor (D30-17, Codex P1 auf #689). */
      var suicideGroup = synonyms.suizid;
      /* verneinte Phrase («ich will nicht tot sein») zählt nicht */
      var suicideSignal = phraseHits.some(function (entry) {
        if (entry.group !== suicideGroup) return false;
        var before = paddedQuery.slice(0, paddedQuery.indexOf(' ' + entry.phrase + ' ')).trim().split(' ').pop();
        return before !== 'nicht' && before !== 'nie';
      }) ||
        words.some(function (word) { return suicideWords[word]; });
      var intent = killIntent(words);
      if (intent === 'gewalt' && suicideSignal) intent = 'suizid';
      if (intent) return [synonyms[intent]];
      if (phraseHit && phraseHit.group !== suicideGroup && suicideSignal) return [suicideGroup];
      if (phraseHit) return [phraseHit.group];
      var meaningful = words.filter(function (word) { return !stopwords.has(word) && word !== 'droht' && word !== 'drohen' && word !== 'sprechen'; });
      if (!meaningful.length) meaningful = words;
      var seen = {};
      return meaningful.map(function (word) { return synonyms[word] || [word]; }).filter(function (group) {
        var key = group.join('|');
        if (seen[key]) return false;
        seen[key] = true;
        return true;
      });
    }
    function matches(field, group) {
      return group.some(function (term) { return field.indexOf(term) !== -1; });
    }
    function score(item, query, groups, relaxed) {
      /* Zwischenspeicher (W3C-12): setzt voraus, dass sich die data-search-Attribute nach dem Laden nicht ändern. */
      var cached = item.__pukSearch || (item.__pukSearch = { title: normalized(item.getAttribute('data-search-title')), haystack: normalized(item.getAttribute('data-search-text')), keywords: normalized(item.getAttribute('data-search-keywords')) });
      var title = cached.title, haystack = cached.haystack, keywords = cached.keywords;
      var hitCount = groups.filter(function (group) { return matches(haystack, group); }).length;
      var required = relaxed && groups.length > 1 ? Math.max(1, Math.min(groups.length - 1, Math.ceil(groups.length * .6))) : groups.length;
      if (hitCount < required) return -1;
      var value = item.getAttribute('data-search-level') === 'section' ? 20 : 0;
      if (title === query) value += 600;
      else if (title.indexOf(query) !== -1) value += 300;
      groups.forEach(function (group) {
        if (matches(title, group)) value += 80;
        if (matches(keywords, group)) value += 140;
        var positions = group.map(function (term) { return haystack.indexOf(term); }).filter(function (position) { return position !== -1; });
        var first = positions.length ? Math.min.apply(Math, positions) : -1;
        if (first !== -1) value += Math.max(0, 30 - Math.floor(first / 120));
      });
      if (relaxed) value -= (groups.length - hitCount) * 120;
      return value;
    }
    function renderSearch() {
      var query = normalized(input.value).trim();
      var groups = queryGroups(query);
      if (!query) {
        items.forEach(function (item) { item.hidden = true; });
        results.hidden = true;
        if (directory) directory.hidden = false;
        if (empty) empty.hidden = true;
        if (status) status.textContent = 'Alle Themenseiten sind unten aufgeführt.';
        return;
      }
      var matches = items.map(function (item) { return { item: item, score: score(item, query, groups, false), order: +(item.getAttribute('data-search-order') || 0) }; })
        .filter(function (entry) { return entry.score >= 0; })
        .sort(function (a, b) { return b.score - a.score || a.order - b.order; });
      if (!matches.length && groups.length > 1) {
        matches = items.map(function (item) { return { item: item, score: score(item, query, groups, true), order: +(item.getAttribute('data-search-order') || 0) }; })
          .filter(function (entry) { return entry.score >= 0; })
          .sort(function (a, b) { return b.score - a.score || a.order - b.order; });
      }
      items.forEach(function (item) { item.hidden = true; });
      matches.slice(0, limit).forEach(function (entry) { entry.item.hidden = false; results.appendChild(entry.item); });
      results.hidden = matches.length === 0;
      if (directory) directory.hidden = true;
      if (empty) empty.hidden = matches.length !== 0;
      if (status) status.textContent = matches.length === 0 ? 'Keine passenden Inhalte gefunden.' : (matches.length > limit ? limit + ' von ' + matches.length + ' passenden Inhalten sichtbar.' : matches.length + (matches.length === 1 ? ' passender Inhalt.' : ' passende Inhalte.'));
    }
    input.addEventListener('input', renderSearch);
    renderSearch();
  }

  function init(scope) {
    scope = scope || document;
    document.documentElement.setAttribute('data-puk-js', '');
    var map = { '[data-puk-accordion]': accordion, '[data-puk-tabs]': tabs, '[data-puk-disclosure]': disclosure, '[data-vis-build]': visBuild };
    Object.keys(map).forEach(function (sel) {
      [].forEach.call(scope.querySelectorAll(sel), function (el) {
        if (el.hasAttribute('data-enhanced')) return; map[sel](el); el.setAttribute('data-enhanced', '');
      });
    });
    [].forEach.call(scope.querySelectorAll('[data-puk-filter]'), function (el) {
      if (!el.hasAttribute('data-filter-enhanced')) filterList(el);
    });
    [].forEach.call(scope.querySelectorAll('[data-puk-search]'), function (el) {
      if (!el.hasAttribute('data-search-enhanced')) siteSearch(el);
    });
    dialogs(scope);
  }
  /* Druck: aufklappbare Vertiefungen (details) vollständig drucken, danach Zustand wiederherstellen.
     Der Starter bindet das Skript deshalb auf jeder Seite mit details ein (Prüfbefund W3-01, 11.10.2026);
     Rückfall ohne Skript: details::details-content in den Druckregeln von bundle.css. */
  var printed = [];
  window.addEventListener('beforeprint', function () { printed = [].filter.call(document.querySelectorAll('details:not([open])'), function (d) { d.open = true; return true; }); });
  window.addEventListener('afterprint', function () { printed.forEach(function (d) { d.open = false; }); printed = []; });

  /* Ein direkter Link muss eine geschlossene Details-Box öffnen und den Fokus an
     das Ziel setzen. Das macht Sprunglinks auch per Tastatur nachvollziehbar. */
  function revealHashTarget() {
    if (!window.location.hash) return;
    var target;
    try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch (e) { return; }
    if (!target) return;
    var details = target.closest('details');
    var opened = false;
    for (var d = details; d; d = d.parentElement && d.parentElement.closest('details')) { if (!d.open) { d.open = true; opened = true; } }
    var focusTarget = target.matches('summary, a, button, input, select, textarea, [tabindex]') ? target : (details ? details.querySelector('summary') : target);
    if (!focusTarget) return;
    var addedTabindex = !focusTarget.matches('summary, a, button, input, select, textarea, [tabindex]');
    if (addedTabindex) focusTarget.setAttribute('tabindex', '-1');
    window.requestAnimationFrame(function () {
      /* Browser ohne natives Aufklappen beim Fragment-Sprung (z. B. Safari vor 26.2) scrollen nicht zum Ziel */
      if (opened) target.scrollIntoView({ block: 'start' });
      focusTarget.focus({ preventScroll: true });
      if (addedTabindex) focusTarget.addEventListener('blur', function () { focusTarget.removeAttribute('tabindex'); }, { once: true });
    });
  }
  window.addEventListener('hashchange', revealHashTarget);

  window.PUKInteraktion = { init: init, reducedMotion: reduced };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); revealHashTarget(); }); else { init(); revealHashTarget(); }
})();
