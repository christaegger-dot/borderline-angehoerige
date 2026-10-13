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

  function init(scope) {
    scope = scope || document;
    document.documentElement.setAttribute('data-puk-js', '');
    var map = { '[data-puk-accordion]': accordion, '[data-puk-tabs]': tabs, '[data-puk-disclosure]': disclosure, '[data-vis-build]': visBuild };
    Object.keys(map).forEach(function (sel) {
      [].forEach.call(scope.querySelectorAll(sel), function (el) {
        if (el.hasAttribute('data-enhanced')) return; map[sel](el); el.setAttribute('data-enhanced', '');
      });
    });
    dialogs(scope);
  }
  /* Druck: aufklappbare Vertiefungen (details) vollständig drucken, danach Zustand wiederherstellen.
     Der Starter bindet das Skript deshalb auf jeder Seite mit details ein (Prüfbefund W3-01, 11.10.2026);
     Rückfall ohne Skript: details::details-content in den Druckregeln von bundle.css. */
  var printed = [];
  window.addEventListener('beforeprint', function () { printed = [].filter.call(document.querySelectorAll('details:not([open])'), function (d) { d.open = true; return true; }); });
  window.addEventListener('afterprint', function () { printed.forEach(function (d) { d.open = false; }); printed = []; });

  /* Ein direkter Link auf einen Begriff muss dessen geschlossene Details-Box öffnen. */
  function revealHashTarget() {
    if (!window.location.hash) return;
    var target;
    try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch (e) { return; }
    if (!target) return;
    var details = target.closest('details');
    if (details) details.open = true;
  }
  window.addEventListener('hashchange', revealHashTarget);

  window.PUKInteraktion = { init: init, reducedMotion: reduced };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); revealHashTarget(); }); else { init(); revealHashTarget(); }
})();
