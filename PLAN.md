# Plan poradnika — Vibe Coding

Interaktywny poradnik (HTML/CSS/JS) do vibecodingu dla osób, które **nie umieją programować** i dopiero zaczynają.
Główna myśl, którą poradnik ma pokazać: **opisujesz słowami → AI pisze kod → widzisz efekt → prosisz o poprawki**.

---

## 1. Forma: interaktywne lekcje „Prompt → Efekt”

Każda lekcja ma trzy panele:

```
┌──────────────┬──────────────────────┬─────────────────────┐
│ 💬 PROMPT     │ 🧩 KOD (zwijany)      │ 👁 PODGLĄD NA ŻYWO   │
│ "Zrób menu   │ <nav>...             │ [menu buduje się    │
│  na górze…"  │ (pisze się sam)      │  krok po kroku]     │
│ [◀ krok 2/5 ▶]                                             │
└──────────────┴──────────────────────┴─────────────────────┘
```

- **Krok po kroku zamiast jednej animacji.** Prompt nr 1 daje gołe menu, nr 2 je koloruje, nr 3 dodaje efekty, nr 5 robi wersję na telefon.
  Tak wygląda prawdziwy vibecoding: rozmowa i poprawki, a nie jeden magiczny prompt.
- **Panel z kodem jest zwijany.** Początkujący nie musi go czytać, ciekawski widzi, jak kod „pisze się sam”.
  Nowe linie w danym kroku są podświetlone na zielono.
- **Podgląd na żywo** (iframe) odświeża się w trakcie pisania kodu, więc widać, jak strona się buduje.
  Przełącznik 🖥 Komputer / 📱 Telefon pokazuje responsywność.
- **Przycisk „Kopiuj prompt”**, żeby czytelnik od razu mógł wkleić go do Claude/ChatGPT i spróbować sam.
- **„Słaby vs dobry prompt”** przy każdym kroku. To najcenniejsza wiedza w całym poradniku.
- **„Słówka z tego kroku”**: krótki słowniczek pojęć użytych w kroku (np. hover, flex, @media).

## 2. Struktura działów

1. **📁 Podstawy komputera**: pliki, foldery, rozszerzenia, ścieżki, czym jest `index.html`, jak otworzyć stronę w przeglądarce.
2. **🎨 Grafika**: bitmapa vs wektor (interaktywny suwak zoomu: PNG się pikseluje, SVG zostaje ostre),
   formaty PNG / JPG / SVG / WebP, przezroczystość, rozdzielczość.
3. **🧭 Słownik UI/UX**: UI vs UX, menu, okno, modal, snap, dropdown, tooltip, toast, responsywność.
   Każde pojęcie ma **klikalne mini-demo**, bo bez nazwy nie da się o tym napisać w prompcie.
4. **🎛️ Inputy HTML**: galeria wszystkich 22 typów `<input>`. Każdy działa na żywo, a obok jest gotowe zdanie do promptu
   (np. „dodaj suwak od 0 do 100”).
   Typy: `button`, `checkbox`, `color`, `date`, `datetime-local`, `email`, `file`, `hidden`, `image`, `month`, `number`,
   `password`, `radio`, `range`, `reset`, `search`, `submit`, `tel`, `text`, `time`, `url`, `week`.
5. **🧩 CSS i JS po ludzku**: selektory CSS i podstawy JS, tylko na poziomie „co to jest i jak to nazwać w prompcie”, bez nauki składni.
6. **⚡ Lekcje „Prompt → Efekt”**: menu ✅ (prototyp), formularz, galeria, kalkulator, mała gra.
7. **🛠️ Warsztat vibecodera**: jak opisać błąd AI, jak wkleić komunikat z konsoli (F12), jak cofnąć zmiany, kiedy zacząć od nowa.
8. **🧰 Narzędzia** (do dopisania):
   - **VS Code**: instalacja, otwieranie folderu, eksplorator plików, podgląd strony (Live Server), terminal w minimalnym zakresie.
   - **GitHub**: czym jest repozytorium, commit, push, historia zmian jako „cofnij”, **GitHub Pages**, czyli darmowa publikacja strony.
   - **Supabase**: kiedy strona potrzebuje bazy danych i logowania, tabele po ludzku, klucze API (co wolno pokazać, czego nie).
   - **Claude.ai**: czat, artefakty, projekty, Claude Code, jak pisać dobre prompty, jak wklejać błędy i zrzuty ekranu.

## 3. Pomysły na interaktywne dema

- Bitmapa vs wektor: ten sam obrazek w PNG i SVG plus suwak powiększenia.
- Galeria inputów z polem „zdanie do promptu” i przyciskiem kopiuj.
- Demo „snap”: przeciąganie okienka, które przykleja się do krawędzi / siatki.
- Demo modala, dropdownu, tooltipa i toasta, każde z wyjaśnieniem w jednym zdaniu.
- Drzewko folderów do klikania (pliki, foldery, ścieżki względne).

## 4. Technika

- **Czysty HTML/CSS/JS bez frameworka.** Działa na GitHub Pages i po otwarciu `index.html` z dysku; sam poradnik jest przykładem tego, czego uczy.
- **Lekcje jako dane, a nie osobne strony.** Plik `js/lessons/<nazwa>.js` dopisuje lekcję do `window.LESSONS`.
  Jeden silnik (`js/app.js`) renderuje czat, kod i podgląd. Nową lekcję dodajesz bez ruszania silnika.
- **Animacja „budowania”**: nowe linie kodu (wykryte diffem względem poprzedniego kroku) wpisują się znak po znaku,
  a podgląd odświeża się po każdej ukończonej linii (podwójny iframe, bez migania).
- **Mobile**: panele układają się jeden pod drugim, a spis treści chowa się pod ☰.

### Format lekcji

```js
window.LESSONS = window.LESSONS || {};
window.LESSONS.menu = {
  title: 'Tytuł lekcji',
  intro: 'Krótki opis.',
  steps: [
    {
      title: 'Krótki tytuł kroku',
      prompt: 'Treść promptu, który wpisuje użytkownik',
      reply: 'Odpowiedź AI. Fragmenty w `backtickach` są pokazane jako kod.',
      terms: [['pojęcie', 'wyjaśnienie'], ...],
      tip: { bad: 'słaby prompt', good: 'dobry prompt', why: 'dlaczego' },
      code: `pełna zawartość index.html po tym kroku`
    }
  ]
};
```

Po dodaniu pliku lekcji trzeba go podpiąć w `index.html` (`<script src="js/lessons/...">`)
i w spisie treści w `js/app.js` (tablica `SECTIONS`, element `{ title, lesson }`).

## 5. Status

- [x] Plan i struktura repo
- [x] Strona główna + spis treści
- [x] Silnik lekcji „Prompt → Efekt”
- [x] Lekcja: Menu nawigacyjne (5 kroków)
- [ ] Podstawy komputera
- [ ] Grafika (bitmapa vs wektor)
- [ ] Słownik UI/UX z mini-demami
- [ ] Galeria 22 inputów
- [ ] CSS i JS po ludzku
- [ ] Kolejne lekcje: formularz, galeria, kalkulator, gra
- [ ] Warsztat vibecodera
- [ ] Narzędzia: VS Code, GitHub, Supabase, Claude.ai
