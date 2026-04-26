## Plan: Selbst-Experimente Feature

Ich implementiere einen neuen separaten Menüpunkt direkt neben dem Zahnrad im Dashboard. Darüber können Nutzer ruhige 1-4 Wochen-Selbstexperimente starten, begleiten und am Ende einen Vorher/Nachher-Stimmungsvergleich sehen.

### 1. Neuer Dashboard-Menüpunkt

- Neben dem Zahnrad kommt ein eigener Icon-Button für „Experimente“.
- Der Button öffnet eine mobile-freundliche Vollbild-/Dialogansicht im bestehenden App-Stil.
- Die Position bleibt bewusst prominent, aber ruhig: kein Badge, kein Druck, keine Gamification.

### 2. Experiment-Übersicht

Die neue Ansicht enthält:

- kurze Erklärung: „Ein Experiment ist eine Selbstbeobachtung, kein Zieltest.“
- aktives Experiment, falls vorhanden
- Liste bisheriger abgeschlossener Experimente
- Einstieg in eine Ideensammlung mit 30 passenden Experimenten

### 3. Liste mit 30 Selbstexperimenten

Ich erstelle eine kuratierte Liste im HabitNaut-Ton, z. B. in Bereichen wie:

- Morgen & Start in den Tag
- Ruhe & Reizreduktion
- Bewegung & Körpergefühl
- Fokus & digitale Gewohnheiten
- Abend & Reflexion
- Beziehungen & Umwelt

Alle Vorschläge werden sanft formuliert, z. B. „Beobachte, wie es dir geht, wenn …“ statt „Optimiere …“. Jeder Vorschlag enthält:

- Titel
- kurze Beschreibung
- optionales Icon/Emoji
- Reflexionsfrage für den Abschluss

### 4. Experiment starten

Beim Start eines Experiments speichert die App:

- ausgewähltes Experiment
- Startdatum
- automatisches Enddatum nach 7-28 Tagen
- Vorher-Stimmung als 1–5 Skala
- optionale Notiz: „Was möchtest du beobachten?“

Es wird vorerst ein aktives Experiment gleichzeitig unterstützt, damit die UX einfach bleibt.

### 5. Während des Experiments

Für das aktive Experiment zeige ich:

- Tag X von X
- verbleibende Tage
- Start-Stimmung
- kurze, nicht-wertende Erinnerung an die Beobachtungsfrage
- Möglichkeit, das Experiment sanft zu beenden oder ruhen zu lassen

### 6. Abschluss mit Vorher/Nachher-Vergleich

Nach X Tagen oder manuell am Ende kann der Nutzer erfassen:

- Nachher-Stimmung als 1–5 Skala
- kurze Abschlussnotiz

Danach zeigt die App eine kleine Auswertung:

- Vorher-Stimmung
- Nachher-Stimmung
- Differenz, bewusst neutral formuliert
- Abschlussfrage des Experiments
- Hinweis, dass es eine Beobachtung ist, kein Urteil

### 7. Speicherung und Export

- Die Experimente werden lokal im bestehenden Zustand gespeichert.
- Der JSON-Export/Import wird erweitert, damit Experimente nicht verloren gehen.
- Keine neue Backend-Tabelle nötig, da das Feature zunächst lokal und privat bleibt – passend zur bestehenden App-Philosophie.

### 8. Mehrsprachigkeit

- Ich ergänze die UI-Texte mindestens in Deutsch, Englisch und Spanisch, passend zur bestehenden i18n-Struktur.
- Die 30 Experimentideen werden ebenfalls lokalisiert oder so eingebunden, dass sie sauber je Sprache angezeigt werden können.

### 9. Mobile UX und Layout

- Die Ansicht wird für gängige Mobilgrößen optimiert.
- Buttons stapeln sich auf kleinen Screens.
- Listen bekommen ausreichend Touch-Flächen.
- Lange Experimenttitel dürfen umbrechen, ohne Layout-Overflow.

## Technische Umsetzung

Betroffene Bereiche:

- `src/types/flownaut.ts`: neue Typen für Selbstexperimente
- `src/store/flownaut-store.ts`: State + Aktionen für Start, Abschluss, Abbruch und Import/Export
- neuer Komponentenbereich, z. B. `src/components/experiments/`
- `src/components/dashboard/Dashboard.tsx`: neuer Button neben dem Zahnrad und Dialog-State
- `src/lib/i18n/translations.ts`: Texte und 30 Experimentideen in der bestehenden Übersetzungsstruktur

Keine Datenbankmigration ist geplant, weil das Feature lokal funktioniert und keine Cloud-Strukturänderung benötigt.