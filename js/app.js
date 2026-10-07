(() => {
  'use strict';

  // Spis treści. Zwykły tekst = dział w przygotowaniu, { title, lesson } = gotowa lekcja.
  const SECTIONS = [
    { icon: '📁', title: 'Podstawy komputera', desc: 'Pliki, foldery, rozszerzenia i ścieżki, czyli to, po czym porusza się każdy projekt.',
      items: ['Pliki i foldery', 'Rozszerzenia plików', 'Ścieżki', 'Czym jest index.html'] },
    { icon: '🎨', title: 'Grafika', desc: 'Bitmapa czy wektor? Który format wybrać i dlaczego obrazek się rozmazuje.',
      items: ['Bitmapa vs wektor', 'Formaty: PNG, JPG, SVG, WebP', 'Przezroczystość i rozdzielczość'] },
    { icon: '🧭', title: 'Słownik UI/UX', desc: 'Nazwy elementów interfejsu, żebyś wiedział(a), jak je nazwać w prompcie.',
      items: ['UI vs UX', 'Menu, okno, modal', 'Snap, dropdown, tooltip, toast', 'Responsywność'] },
    { icon: '🎛️', title: 'Inputy HTML', desc: 'Wszystkie 22 typy pól formularza do przetestowania na żywo.',
      items: ['Galeria 22 typów inputów'] },
    { icon: '🧩', title: 'CSS i JS po ludzku', desc: 'Selektory i podstawy JavaScriptu na poziomie „co to jest i jak o to poprosić”.',
      items: ['Selektory CSS', 'Podstawy JavaScriptu'] },
    { icon: '⚡', title: 'Lekcje: Prompt → Efekt', desc: 'Budujesz prawdziwe elementy strony prompt po prompcie i widzisz efekt na żywo.',
      items: [{ title: 'Menu nawigacyjne', lesson: 'menu' }, 'Formularz kontaktowy', 'Galeria zdjęć', 'Kalkulator', 'Mała gra'] },
    { icon: '🛠️', title: 'Warsztat vibecodera', desc: 'Co robić, gdy coś nie działa: błędy, konsola, cofanie zmian.',
      items: ['Jak opisać błąd AI', 'Konsola (F12)', 'Cofanie zmian', 'Kiedy zacząć od nowa'] },
    { icon: '🧰', title: 'Narzędzia', desc: 'Edytor, repozytorium, baza danych i asystent AI, czyli warsztat pracy.',
      items: ['VS Code', 'GitHub i GitHub Pages', 'Supabase', 'Claude.ai'] }
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // Fragmenty w `backtickach` pokazujemy jako kod.
  const richText = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* brak pamięci przeglądarki — trudno */ } }
  };

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignoruj */ }
      ta.remove();
    }
    const old = btn.textContent;
    btn.textContent = '✓ Skopiowano';
    setTimeout(() => { btn.textContent = old; }, 1500);
  }

  // ---------- Motyw i spis treści ----------

  function initChrome() {
    const saved = store.get('theme');
    if (saved) document.documentElement.dataset.theme = saved;
    $('.theme-toggle').addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store.set('theme', next);
    });

    $('.toc-toggle').addEventListener('click', () => document.body.classList.toggle('toc-open'));
    $('.backdrop').addEventListener('click', () => document.body.classList.remove('toc-open'));

    $('#sidebar').innerHTML = '<a class="toc-home" href="#/">🏠 Strona główna</a>' + SECTIONS.map(sec => `
      <div class="toc-section">
        <p class="toc-title"><span aria-hidden="true">${sec.icon}</span> ${esc(sec.title)}</p>
        <ul>${sec.items.map(it => typeof it === 'string'
          ? `<li><span class="toc-soon" title="W przygotowaniu">${esc(it)}</span></li>`
          : `<li><a href="#/lekcja/${it.lesson}">${esc(it.title)}</a></li>`).join('')}</ul>
      </div>`).join('');
  }

  // ---------- Strona główna ----------

  function renderHome() {
    $('#app').innerHTML = `
      <section class="hero">
        <p class="eyebrow">Poradnik dla osób, które nie umieją programować</p>
        <h1>Twórz strony i aplikacje, <span class="grad">opisując je słowami</span></h1>
        <p class="lead">Vibe coding to programowanie przez rozmowę z AI. Ty mówisz, co chcesz zbudować, AI pisze kod,
          a Ty od razu widzisz efekt i prosisz o poprawki. Ten poradnik pokazuje, jak to robić dobrze.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/lekcja/menu">▶ Zacznij od pierwszej lekcji</a>
          <button class="btn" type="button" data-scroll="mapa">Zobacz wszystkie działy</button>
        </div>
      </section>

      <section class="how" aria-label="Jak działa vibe coding">
        <div class="how-card"><span class="how-num">1</span><h3>💬 Opisujesz</h3><p>Piszesz zwykłym językiem, co ma powstać: „zrób menu z czterema linkami”.</p></div>
        <div class="how-card"><span class="how-num">2</span><h3>🤖 AI pisze kod</h3><p>Asystent zamienia opis na HTML, CSS i JavaScript. Nie musisz znać składni.</p></div>
        <div class="how-card"><span class="how-num">3</span><h3>👁 Widzisz efekt</h3><p>Sprawdzasz wynik w przeglądarce i prosisz o poprawki, aż będzie dobrze.</p></div>
      </section>

      <section id="mapa" class="map">
        <h2>Co znajdziesz w poradniku</h2>
        <div class="cards">${SECTIONS.map(sec => `
          <article class="card">
            <h3><span aria-hidden="true">${sec.icon}</span> ${esc(sec.title)}</h3>
            <p>${esc(sec.desc)}</p>
            <ul>${sec.items.map(it => typeof it === 'string'
              ? `<li class="soon">${esc(it)} <span class="badge">wkrótce</span></li>`
              : `<li><a href="#/lekcja/${it.lesson}">${esc(it.title)} →</a></li>`).join('')}</ul>
          </article>`).join('')}
        </div>
      </section>`;
    $('[data-scroll]').addEventListener('click', e =>
      document.getElementById(e.currentTarget.dataset.scroll).scrollIntoView({ behavior: 'smooth' }));
  }

  // ---------- Kolorowanie składni (proste, linia po linii) ----------

  const wrap = (cls, s) => `<span class="t-${cls}">${esc(s)}</span>`;

  function tokenize(line, re, fn) {
    let out = '', last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(line))) {
      if (!m[0]) { re.lastIndex++; continue; }
      out += esc(line.slice(last, m.index)) + fn(m);
      last = m.index + m[0].length;
    }
    return out + esc(line.slice(last));
  }

  const RE_HTML = /(<!--.*?(?:-->|$))|(<\/?)([\w!-]+)|([\w-]+)(=)("[^"]*"?)|(\/?>)/g;
  const RE_JS = /(\/\/.*$)|('[^']*'?|"[^"]*"?)|\b(const|let|var|function|return|if|else)\b|(=>)|(\.?)([A-Za-z_]\w*)(?=\()/g;

  function highlight(line) {
    const t = line.trim();
    if (!t) return '';
    if (t.startsWith('<')) {
      return tokenize(line, RE_HTML, m => {
        if (m[1]) return wrap('com', m[1]);
        if (m[3]) return wrap('pun', m[2]) + wrap('tag', m[3]);
        if (m[5]) return wrap('attr', m[4]) + wrap('pun', '=') + wrap('str', m[6]);
        return wrap('pun', m[7]);
      });
    }
    if (t === '}') return wrap('pun', line);
    if (/^[^';=]*\{$/.test(t)) {
      const i = line.lastIndexOf('{');
      return wrap('sel', line.slice(0, i)) + wrap('pun', '{');
    }
    const css = line.match(/^(\s*)([\w-]+)(\s*:\s*)([^:]*?)(;?)$/);
    if (css) return esc(css[1]) + wrap('prop', css[2]) + wrap('pun', css[3]) + wrap('val', css[4]) + wrap('pun', css[5]);
    return tokenize(line, RE_JS, m => {
      if (m[1]) return wrap('com', m[1]);
      if (m[2]) return wrap('str', m[2]);
      if (m[3] || m[4]) return wrap('kw', m[0]);
      return esc(m[5]) + wrap('fn', m[6]);
    });
  }

  // Diff linii (LCS): które linie kodu są nowe względem poprzedniego kroku.
  function diffLines(prev, next) {
    const A = prev ? prev.split('\n') : [];
    const B = next.split('\n');
    const n = A.length, m = B.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const out = [];
    let i = 0, j = 0;
    while (j < m) {
      if (i < n && A[i] === B[j]) { out.push({ text: B[j], isNew: false }); i++; j++; }
      else if (i < n && dp[i + 1][j] >= dp[i][j + 1]) i++;
      else { out.push({ text: B[j], isNew: true }); j++; }
    }
    return out;
  }

  // ---------- Odtwarzacz lekcji ----------

  function renderLesson(id) {
    const lesson = (window.LESSONS || {})[id];
    if (!lesson) {
      $('#app').innerHTML = `<section class="hero"><h1>Nie ma takiej lekcji</h1>
        <p class="lead">Ta lekcja jeszcze nie powstała.</p><a class="btn btn-primary" href="#/">← Wróć na stronę główną</a></section>`;
      return null;
    }
    const steps = lesson.steps;
    $('#app').innerHTML = `
      <section class="lesson">
        <header class="lesson-head">
          <p class="eyebrow">⚡ Lekcja · Prompt → Efekt</p>
          <h1>${esc(lesson.title)}</h1>
          <p class="lead">${esc(lesson.intro)}</p>
        </header>

        <div class="stepper">
          <button class="btn btn-ghost" type="button" data-act="prev">◀ Wstecz</button>
          <ol class="dots">${steps.map((s, i) =>
            `<li><button type="button" data-step="${i}" title="${esc(s.title)}" aria-label="Krok ${i + 1}: ${esc(s.title)}">${i + 1}</button></li>`).join('')}</ol>
          <button class="btn btn-primary" type="button" data-act="next">Następny krok ▶</button>
          <span class="step-title"></span>
          <div class="stepper-tools">
            <button class="btn btn-ghost only-playing" type="button" data-act="skip">⏭ Pomiń animację</button>
            <button class="btn btn-ghost only-idle" type="button" data-act="replay">↻ Powtórz krok</button>
            <button class="btn btn-ghost" type="button" data-act="code" aria-pressed="true">🧩 Kod</button>
          </div>
        </div>

        <div class="panes" data-code="shown">
          <div class="pane pane-chat">
            <div class="pane-head">💬 Rozmowa z AI</div>
            <div class="chat" aria-live="polite"></div>
          </div>
          <div class="pane pane-code">
            <div class="pane-head">🧩 Kod <span class="file">index.html</span><span class="legend"><i></i> nowe linie</span></div>
            <pre class="code"><code></code></pre>
          </div>
          <div class="pane pane-preview">
            <div class="pane-head">👁 Podgląd
              <div class="seg" role="group" aria-label="Rozmiar ekranu">
                <button type="button" data-device="desktop" aria-pressed="true">🖥 Komputer</button>
                <button type="button" data-device="phone" aria-pressed="false">📱 Telefon</button>
              </div>
            </div>
            <div class="stage" data-device="desktop">
              <div class="device">
                <iframe class="frame is-front" sandbox="allow-scripts" title="Podgląd strony"></iframe>
                <iframe class="frame" sandbox="allow-scripts" title="Podgląd strony (bufor)" aria-hidden="true" tabindex="-1"></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="step-notes"></div>
      </section>`;
    return createPlayer($('.lesson'), lesson);
  }

  function createPlayer(root, lesson) {
    const steps = lesson.steps;
    const el = {
      chat: $('.chat', root),
      pre: $('.code', root),
      code: $('.code code', root),
      frames: $$('.frame', root),
      panes: $('.panes', root),
      stage: $('.stage', root),
      notes: $('.step-notes', root),
      title: $('.step-title', root)
    };
    let current = -1;
    let run = 0;          // każdy nowy krok zwiększa licznik i przerywa poprzednią animację
    let skipping = false;

    // --- Podgląd: dwa iframe'y na zmianę, żeby nie migało przy odświeżaniu ---
    let front = 0, loading = false, pending = null;
    function setPreview(html) {
      pending = html;
      if (!loading) flushPreview();
    }
    function flushPreview() {
      if (pending === null) return;
      const html = pending;
      pending = null;
      const back = el.frames[1 - front];
      loading = true;
      back.onload = () => {
        back.classList.add('is-front');
        el.frames[front].classList.remove('is-front');
        front = 1 - front;
        loading = false;
        flushPreview();
      };
      back.srcdoc = html;
    }

    // --- Kod ---
    function paintCode(lines, budget) {
      let left = budget, html = '', done = 0;
      const text = [];
      for (const l of lines) {
        if (!l.isNew) {
          html += `<span class="ln">${highlight(l.text) || ' '}</span>`;
          text.push(l.text);
          continue;
        }
        if (left <= 0) continue;
        const need = l.text.length + 1;
        if (left >= need) {
          left -= need;
          done++;
          html += `<span class="ln added">${highlight(l.text) || ' '}</span>`;
          text.push(l.text);
        } else {
          const part = l.text.slice(0, left);
          left = 0;
          html += `<span class="ln added">${highlight(part)}<span class="caret"></span></span>`;
          text.push(part);
        }
      }
      el.code.innerHTML = html;
      const caret = $('.caret', el.code);
      if (caret) keepVisible(caret);
      return { text: text.join('\n'), done };
    }

    function keepVisible(node) {
      const pre = el.pre;
      const top = node.offsetTop;
      if (top < pre.scrollTop + 24 || top > pre.scrollTop + pre.clientHeight - 48) {
        pre.scrollTop = Math.max(0, top - pre.clientHeight / 2);
      }
    }

    async function typeCode(lines, alive) {
      const total = lines.reduce((s, l) => s + (l.isNew ? l.text.length + 1 : 0), 0);
      let shown = 0, lastDone = -1;
      while (shown < total && !skipping) {
        if (!alive()) return;
        shown = Math.min(total, shown + 3);
        const r = paintCode(lines, shown);
        if (r.done !== lastDone) { lastDone = r.done; setPreview(r.text); }
        await sleep(16);
      }
      if (!alive()) return;
      setPreview(paintCode(lines, Infinity).text);
    }

    // --- Czat ---
    function addUser(i) {
      const div = document.createElement('div');
      div.className = 'msg msg-user';
      div.innerHTML = `<div class="msg-meta">Ty · krok ${i + 1}</div><p class="msg-text"></p>
        <button class="copy" type="button">📋 Kopiuj prompt</button>`;
      $('.copy', div).addEventListener('click', e => copyText(steps[i].prompt, e.currentTarget));
      el.chat.appendChild(div);
      scrollChat();
      return $('.msg-text', div);
    }
    function addAI(i) {
      const div = document.createElement('div');
      div.className = 'msg msg-ai';
      div.innerHTML = `<div class="msg-meta">🤖 AI</div><p class="msg-text">${richText(steps[i].reply)}</p>`;
      el.chat.appendChild(div);
      scrollChat();
    }
    function addThinking() {
      const div = document.createElement('div');
      div.className = 'msg msg-ai thinking';
      div.innerHTML = '<div class="msg-meta">🤖 AI</div><p class="msg-text"><span class="dots-anim"><i></i><i></i><i></i></span> piszę kod…</p>';
      el.chat.appendChild(div);
      scrollChat();
      return div;
    }
    function scrollChat() { el.chat.scrollTop = el.chat.scrollHeight; }

    async function typeInto(node, text, alive) {
      for (let i = 2; i < text.length + 2; i += 2) {
        if (!alive()) return;
        if (skipping) break;
        node.textContent = text.slice(0, i);
        scrollChat();
        await sleep(18);
      }
      node.textContent = text;
    }

    async function pause(ms, alive) {
      const end = Date.now() + ms;
      while (Date.now() < end && alive() && !skipping) await sleep(30);
    }

    // --- Notatki pod panelami ---
    function renderNotes(i) {
      const s = steps[i];
      const last = i === steps.length - 1;
      el.notes.innerHTML = `
        <div class="note">
          <h3>📖 Słówka z tego kroku</h3>
          <dl>${s.terms.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
        </div>
        <div class="note">
          <h3>🎯 Słaby vs dobry prompt</h3>
          <div class="cmp bad"><span>✗ Słabo</span><p>„${esc(s.tip.bad)}”</p></div>
          <div class="cmp good"><span>✓ Lepiej</span><p>„${esc(s.tip.good)}”</p></div>
          <p class="why">💡 ${esc(s.tip.why)}</p>
        </div>
        ${last ? `<div class="note note-done">
          <h3>🎉 To już koniec lekcji!</h3>
          <p>Pięć zdań i masz działające, responsywne menu. Teraz spróbuj sam(a): skopiuj wszystkie prompty,
            wklej je po kolei do Claude.ai i porównaj wynik. Zmień kolory albo nazwy linków na swoje.</p>
          <button class="btn btn-primary" type="button" data-copy-all>📋 Kopiuj wszystkie prompty</button>
        </div>` : ''}`;
      const all = $('[data-copy-all]', el.notes);
      if (all) all.addEventListener('click', e =>
        copyText(steps.map((st, k) => `${k + 1}. ${st.prompt}`).join('\n\n'), e.currentTarget));
    }

    function updateStepper(playing) {
      root.classList.toggle('is-playing', playing);
      $('[data-act=prev]', root).disabled = current <= 0;
      $('[data-act=next]', root).disabled = current >= steps.length - 1;
      $$('.dots button', root).forEach((b, k) => {
        b.classList.toggle('on', k === current);
        b.classList.toggle('done', k < current);
        b.setAttribute('aria-current', k === current ? 'step' : 'false');
      });
      el.title.textContent = `Krok ${current + 1} z ${steps.length}: ${steps[current].title}`;
    }

    async function go(i, animate) {
      if (i < 0 || i >= steps.length) return;
      const my = ++run;
      const alive = () => my === run;
      current = i;
      skipping = !animate;
      updateStepper(animate);
      renderNotes(i);

      el.chat.innerHTML = '';
      for (let k = 0; k < i; k++) {
        addUser(k).textContent = steps[k].prompt;
        addAI(k);
      }
      const lines = diffLines(i ? steps[i - 1].code : '', steps[i].code);

      if (!animate) {
        addUser(i).textContent = steps[i].prompt;
        addAI(i);
        setPreview(paintCode(lines, Infinity).text);
        const first = $('.added', el.code);
        if (first) keepVisible(first);
        updateStepper(false);
        return;
      }

      // Najpierw stan sprzed kroku, potem prompt, „myślenie” i pisanie kodu.
      setPreview(paintCode(lines, 0).text);
      el.pre.scrollTop = 0;
      await typeInto(addUser(i), steps[i].prompt, alive);
      if (!alive()) return;
      const thinking = addThinking();
      await pause(600, alive);
      if (!alive()) return;
      await typeCode(lines, alive);
      if (!alive()) return;
      thinking.remove();
      addAI(i);
      skipping = false;
      updateStepper(false);
    }

    // --- Sterowanie ---
    root.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || !root.contains(b)) return;
      if (b.dataset.step !== undefined) {
        const k = Number(b.dataset.step);
        go(k, k === current + 1);
      } else if (b.dataset.device) {
        el.stage.dataset.device = b.dataset.device;
        $$('[data-device]', root).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      } else switch (b.dataset.act) {
        case 'prev': go(current - 1, false); break;
        case 'next': go(current + 1, true); break;
        case 'skip': skipping = true; break;
        case 'replay': go(current, true); break;
        case 'code': {
          const hidden = el.panes.dataset.code === 'shown';
          el.panes.dataset.code = hidden ? 'hidden' : 'shown';
          b.setAttribute('aria-pressed', String(!hidden));
          store.set('showCode', hidden ? '0' : '1');
          break;
        }
      }
    });

    function onKey(e) {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight' && current < steps.length - 1) go(current + 1, true);
      if (e.key === 'ArrowLeft' && current > 0) go(current - 1, false);
    }
    document.addEventListener('keydown', onKey);

    if (store.get('showCode') === '0') {
      el.panes.dataset.code = 'hidden';
      $('[data-act=code]', root).setAttribute('aria-pressed', 'false');
    }

    go(0, true);

    return {
      destroy() {
        run++;
        document.removeEventListener('keydown', onKey);
      }
    };
  }

  // ---------- Router ----------

  let player = null;
  function route() {
    if (player) { player.destroy(); player = null; }
    const hash = location.hash || '#/';
    const m = hash.match(/^#\/lekcja\/([\w-]+)/);
    if (m) player = renderLesson(m[1]);
    else renderHome();
    $$('#sidebar a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
    document.body.classList.remove('toc-open');
    window.scrollTo(0, 0);
  }

  initChrome();
  window.addEventListener('hashchange', route);
  route();
})();
