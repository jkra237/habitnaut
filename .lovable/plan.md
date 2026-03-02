

## Problem

Die App zeigt Beobachtungen wie "Habits often show up in the Evening" an. Das ist irrefuehrend, weil die App **keine Uhrzeiten trackt**. Der Pattern-Detektor nutzt nur den statischen "Time Anchor" (die Einstellung, die der Nutzer beim Erstellen waehlt) und gibt das als "erkanntes Muster" aus. Der Code hat sogar einen Kommentar, der das Problem beschreibt: `return true; // Simplified - the habit has a time anchor`.

## Loesung

Alle zeit-basierten Beobachtungen und Patterns entfernen, da sie ohne echtes Uhrzeit-Tracking keinen Mehrwert bieten und Nutzer irrefuehren.

## Technische Aenderungen

### 1. Pattern-Detektor bereinigen (`src/lib/observations/pattern-detector.ts`)

Folgende Pattern-Erkennungen entfernen:
- **B1: Same Time Pattern** (Zeilen 118-134) — gibt immer `return true` zurueck, komplett sinnlos
- **B2: Varied Time** (Zeilen 136-142) — basiert nur darauf, ob Time Anchor auf "none" steht
- **E2: Habit Sequence** (Zeilen 293-320) — nutzt Time Anchors statt echte Zeitdaten

### 2. Observation-Bibliothek bereinigen (`src/lib/observations/observation-library.ts`)

Alle Eintraege der Kategorie `rhythm-time` entfernen (IDs: rhythm-1 bis rhythm-5), da sie auf den entfernten Patterns basieren.

### 3. Types pruefen (`src/types/observations.ts`)

Die PatternTypes `same-time`, `varied-time` und `habit-sequence` aus dem Type entfernen, falls sie dort definiert sind.

## Ergebnis

Keine irrefuehrenden Beobachtungen mehr. Alle verbleibenden Observations basieren auf echtem Nutzerverhalten (Tage, Frequenz, Pausen, Korrelationen).
