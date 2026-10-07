window.LESSONS = window.LESSONS || {};

window.LESSONS.menu = {
  title: 'Menu nawigacyjne',
  intro: 'Zbudujesz menu strony w 5 promptach: od gołej listy linków do wersji z logo, efektami i przyciskiem ☰ na telefonie. ' +
    'Klikaj „Następny krok” i obserwuj, jak AI dopisuje kod, a strona zmienia się na żywo.',
  steps: [
    {
      title: 'Szkielet menu',
      prompt: 'Zrób prostą stronę z menu na górze. W menu mają być linki: Start, O mnie, Projekty, Kontakt. ' +
        'Pod menu dodaj nagłówek „Witaj na mojej stronie!”.',
      reply: 'Gotowe! Strona jest w pliku `index.html`. Menu siedzi w znaczniku `<nav>`, a linki są ułożone jako lista. ' +
        'Na razie wygląda surowo, bo nie ma jeszcze stylów (CSS). Zajmiemy się tym w kolejnym kroku.',
      terms: [
        ['HTML', 'Szkielet strony: mówi, co na niej jest (nagłówek, lista, link), ale nie jak to wygląda.'],
        ['<nav>', 'Znacznik oznaczający nawigację, czyli menu strony.'],
        ['<ul> i <li>', 'Lista (ul) i jej elementy (li). Menu to w praktyce lista linków.'],
        ['<a>', 'Link: tekst, który po kliknięciu przenosi w inne miejsce.']
      ],
      tip: {
        bad: 'zrób menu',
        good: 'Zrób menu na górze strony z linkami: Start, O mnie, Projekty, Kontakt.',
        why: 'AI nie zgadnie, jakie pozycje chcesz mieć ani gdzie ma stać menu. Im konkretniej, tym mniej poprawek.'
      },
      code: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja strona</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#">Start</a></li>
      <li><a href="#">O mnie</a></li>
      <li><a href="#">Projekty</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>

  <main>
    <h1>Witaj na mojej stronie!</h1>
    <p>Tu wkrótce pojawi się treść.</p>
  </main>
</body>
</html>`
    },
    {
      title: 'Kolory i układ',
      prompt: 'Ułóż linki obok siebie, w poziomie. Pasek menu niech ma ciemnogranatowe tło, ' +
        'a napisy białe i bez podkreślenia.',
      reply: 'Dodana sekcja `<style>`, czyli CSS. `display: flex` układa linki w rzędzie, a `gap` robi między nimi odstęp. ' +
        'Kropki listy i podkreślenia linków zostały usunięte.',
      terms: [
        ['CSS', 'Wygląd strony: kolory, odstępy, czcionki, ułożenie elementów.'],
        ['flex (flexbox)', 'Sposób układania elementów w rzędzie lub kolumnie. Najczęstszy sposób na menu.'],
        ['padding / margin', 'Padding to odstęp wewnątrz elementu, margin odstęp na zewnątrz.'],
        ['#1e293b', 'Kolor zapisany w formacie HEX. Możesz też pisać AI po prostu „ciemnogranatowy”.']
      ],
      tip: {
        bad: 'zrób ładniej',
        good: 'Pasek menu z ciemnogranatowym tłem, białe napisy bez podkreślenia, linki w poziomie.',
        why: '„Ładnie” każdy rozumie inaczej. Podawaj kolory, rozmiary i ułożenie.'
      },
      code: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja strona</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    nav {
      background: #1e293b;
    }
    nav ul {
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 0 16px;
      list-style: none;
    }
    nav a {
      display: block;
      padding: 16px 12px;
      color: white;
      text-decoration: none;
    }
    main {
      padding: 24px;
    }
  </style>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#">Start</a></li>
      <li><a href="#">O mnie</a></li>
      <li><a href="#">Projekty</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>

  <main>
    <h1>Witaj na mojej stronie!</h1>
    <p>Tu wkrótce pojawi się treść.</p>
  </main>
</body>
</html>`
    },
    {
      title: 'Efekt najechania',
      prompt: 'Gdy najadę myszką na link, niech jego tło lekko się rozjaśni. ' +
        'Link „Start” oznacz jako aktywny: niebieskim kolorem i kreską pod spodem.',
      reply: 'Dodany efekt `:hover` (najechanie myszką) z płynnym przejściem `transition` oraz klasa `active` dla bieżącej strony. ' +
        'Najedź myszką na menu w podglądzie!',
      terms: [
        ['hover', 'Stan, gdy kursor myszy jest nad elementem. W CSS zapisywany jako :hover.'],
        ['klasa (class)', 'Etykieta nadana elementowi, np. class="active", żeby nadać mu osobny styl.'],
        ['aktywny link', 'Wyróżniony link strony, na której właśnie jesteś.'],
        ['transition', 'Płynne przejście zmiany (np. koloru) zamiast nagłego przeskoku.']
      ],
      tip: {
        bad: 'dodaj jakieś efekty',
        good: 'Gdy najadę myszką na link, niech jego tło lekko się rozjaśni.',
        why: 'Opisuj zachowanie: co robi użytkownik i co ma się wtedy stać.'
      },
      code: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja strona</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    nav {
      background: #1e293b;
    }
    nav ul {
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 0 16px;
      list-style: none;
    }
    nav a {
      display: block;
      padding: 16px 12px;
      color: white;
      text-decoration: none;
      transition: background 0.2s;
    }
    nav a:hover {
      background: #334155;
    }
    nav a.active {
      color: #38bdf8;
      border-bottom: 3px solid #38bdf8;
    }
    main {
      padding: 24px;
    }
  </style>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#" class="active">Start</a></li>
      <li><a href="#">O mnie</a></li>
      <li><a href="#">Projekty</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>

  <main>
    <h1>Witaj na mojej stronie!</h1>
    <p>Tu wkrótce pojawi się treść.</p>
  </main>
</body>
</html>`
    },
    {
      title: 'Logo',
      prompt: 'Dodaj logo „🚀 MojaMarka” po lewej stronie paska, a linki przesuń do prawej krawędzi.',
      reply: 'Logo jest teraz pierwszym elementem w `<nav>`. Dzięki `justify-content: space-between` logo trzyma się lewej strony, ' +
        'a lista linków prawej. `align-items: center` wyrównuje je w pionie.',
      terms: [
        ['logo', 'Znak lub nazwa marki, zwykle w lewym górnym rogu i klikalne (prowadzi na stronę główną).'],
        ['justify-content', 'Mówi, jak rozłożyć elementy w poziomie: do lewej, do prawej, na środek albo na boki.'],
        ['align-items', 'Wyrównanie elementów w pionie, np. do środka paska.'],
        ['selektor', 'Część CSS przed klamrą, np. nav a. Mówi, których elementów dotyczy styl.']
      ],
      tip: {
        bad: 'przesuń to tam',
        good: 'Logo po lewej stronie paska, linki przy prawej krawędzi.',
        why: 'AI nie widzi Twojego ekranu. Nazywaj elementy i używaj kierunków: lewo, prawo, góra, dół.'
      },
      code: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja strona</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      background: #1e293b;
    }
    .logo {
      font-weight: bold;
      font-size: 20px;
    }
    nav ul {
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    nav a {
      display: block;
      padding: 16px 12px;
      color: white;
      text-decoration: none;
      transition: background 0.2s;
    }
    nav a:hover {
      background: #334155;
    }
    nav a.active {
      color: #38bdf8;
      border-bottom: 3px solid #38bdf8;
    }
    main {
      padding: 24px;
    }
  </style>
</head>
<body>
  <nav>
    <a href="#" class="logo">🚀 MojaMarka</a>
    <ul>
      <li><a href="#" class="active">Start</a></li>
      <li><a href="#">O mnie</a></li>
      <li><a href="#">Projekty</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>

  <main>
    <h1>Witaj na mojej stronie!</h1>
    <p>Tu wkrótce pojawi się treść.</p>
  </main>
</body>
</html>`
    },
    {
      title: 'Wersja na telefon',
      prompt: 'Na telefonie menu się nie mieści. Na wąskim ekranie schowaj linki i pokaż przycisk ☰ (hamburger), ' +
        'który po kliknięciu rozwija listę pionowo.',
      reply: 'Dodana reguła `@media`, która działa tylko na ekranach węższych niż 600px, oraz krótki skrypt JavaScript: ' +
        'po kliknięciu ☰ dodaje liście klasę `open` i ją pokazuje. Przełącz podgląd na 📱 Telefon i kliknij ☰!',
      terms: [
        ['responsywność', 'Strona dopasowuje się do szerokości ekranu: inaczej wygląda na komputerze, inaczej na telefonie.'],
        ['@media', 'Reguła CSS „tylko gdy…”, np. tylko gdy ekran jest węższy niż 600px.'],
        ['hamburger ☰', 'Przycisk z trzema kreskami, który chowa i pokazuje menu na małych ekranach.'],
        ['JavaScript', 'Język, który dodaje stronie zachowanie: reaguje na kliknięcia, pokazuje i chowa elementy.'],
        ['zdarzenie click', 'Sygnał „ktoś kliknął”. Skrypt nasłuchuje go i wtedy wykonuje akcję.']
      ],
      tip: {
        bad: 'napraw menu na telefonie',
        good: 'Na wąskim ekranie schowaj linki i pokaż przycisk ☰, który po kliknięciu rozwija listę pionowo.',
        why: 'Opisz problem (co jest źle) i oczekiwany efekt (jak ma być). To najlepszy przepis na każdą poprawkę.'
      },
      code: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja strona</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      background: #1e293b;
    }
    .logo {
      font-weight: bold;
      font-size: 20px;
    }
    nav ul {
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    nav a {
      display: block;
      padding: 16px 12px;
      color: white;
      text-decoration: none;
      transition: background 0.2s;
    }
    nav a:hover {
      background: #334155;
    }
    nav a.active {
      color: #38bdf8;
      border-bottom: 3px solid #38bdf8;
    }
    .burger {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 28px;
      cursor: pointer;
    }
    @media (max-width: 600px) {
      .burger {
        display: block;
      }
      nav {
        flex-wrap: wrap;
      }
      nav ul {
        display: none;
        width: 100%;
        flex-direction: column;
      }
      nav ul.open {
        display: flex;
      }
    }
    main {
      padding: 24px;
    }
  </style>
</head>
<body>
  <nav>
    <a href="#" class="logo">🚀 MojaMarka</a>
    <button class="burger" aria-label="Menu">☰</button>
    <ul>
      <li><a href="#" class="active">Start</a></li>
      <li><a href="#">O mnie</a></li>
      <li><a href="#">Projekty</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>

  <main>
    <h1>Witaj na mojej stronie!</h1>
    <p>Tu wkrótce pojawi się treść.</p>
  </main>

  <script>
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('nav ul');
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  </script>
</body>
</html>`
    }
  ]
};
