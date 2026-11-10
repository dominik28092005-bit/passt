# OSDS Quiz

Lernspiel zur Vorlesung *Operating Systems and Distributed Systems*: 179 Multiple-Choice-Fragen in 12 Kapiteln (Prozesse, Threads, Scheduling, Deadlocks, Memory Management, File Systems, I/O & RAID, Virtualisierung, HTTP/3 & QUIC …).

Optimiert fürs Smartphone, funktioniert aber auch am Desktop.

## Starten
- **Lokal:** `index.html` im Browser öffnen.
- **Am Handy:** GitHub Pages aktivieren (*Settings → Pages → Branch `main` / root*), die URL im Handy-Browser öffnen und „Zum Home-Bildschirm hinzufügen“ – dann startet das Quiz wie eine App im Vollbild.

## Features
- Themenauswahl mit Lernstand pro Kapitel
- Modi: Klassisch, Zeitdruck (20 s), Schwächen üben
- Serien-Multiplikator, Auswertung pro Thema
- Bei falscher Antwort: Erklärung, warum genau diese Antwort falsch ist, plus die richtige Lösung
- „Falsche wiederholen“ nach jeder Runde
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)

## Fragen bearbeiten
Alle Fragen stehen in `questions.js`, die Erklärungen zu den falschen Optionen in `why.js` (gleiche Reihenfolge). Format:
```js
{t:"mem", q:"Frage?", o:["richtig","falsch","falsch","falsch"], a:0, e:"Erklärung"}
```
`a` ist der Index der richtigen Antwort – die Optionen werden beim Spielen gemischt.
