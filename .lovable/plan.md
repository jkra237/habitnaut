## Variante C – Hybrid Experiment-Overview auf der Mainpage

Bringt die Selbstexperimente sanft auf's Dashboard, ohne die ruhige Ästhetik zu stören.

### Neue Komponente: `ActiveExperimentCard.tsx`
Platzierung im Dashboard **zwischen `DailyCheckin` und `HabitMatrix`** (prominent, aber unter dem Check-in).

Drei Zustände:

**1. Aktives Experiment vorhanden**
- Card mit Emoji, Titel, „Tag X von Y" 
- Dünne Progress-Bar (sage-Ton, kein Rot)
- Reflexionsfrage als sanfter Prompt („Beobachtung des Tages: …")
- Klick öffnet den bestehenden `SelfExperimentsDialog`

**2. Kein aktives Experiment**
- Einzeilige, subtile Empty-State-Zeile mit Beaker-Icon
- Text: „Magst du ein kleines Experiment probieren?" + gentle Button „Entdecken"
- Klick öffnet den Dialog

**3. Abgeschlossene Experimente** (nur wenn vorhanden)
- Neue Sektion **nach `GratitudeJournal`**: horizontale Scroll-Row
- Chips mit Emoji + Titel + optionalem Mood-Delta (z. B. „🌱 +1")
- Klick öffnet den Dialog auf dem jeweiligen Experiment

### Änderungen im Detail

**`src/components/dashboard/ActiveExperimentCard.tsx`** (neu)
- Nutzt `useFlowNautStore` um `experiments` zu lesen
- Nutzt `useTranslations`
- Öffnet `SelfExperimentsDialog` via State-Prop oder Callback

**`src/components/dashboard/CompletedExperimentsRow.tsx`** (neu)
- Horizontale Scroll-Row mit `overflow-x-auto`
- Zeigt letzte ~6 abgeschlossene Experimente

**`src/components/dashboard/Dashboard.tsx`**
- `ActiveExperimentCard` zwischen DailyCheckin und HabitMatrix einfügen
- `CompletedExperimentsRow` nach GratitudeJournal einfügen (nur wenn completed > 0)
- Öffnen des Dialogs an die neuen Karten anschließen (State-Lifting oder Callback-Prop)

**`src/lib/i18n/translations.ts`**
- Neue Keys unter `experiments`: `overviewDayProgress` („Tag {current} von {total}"), `overviewObservationPrompt` („Beobachtung des Tages"), `overviewEmptyPrompt` („Magst du ein kleines Experiment probieren?"), `overviewDiscover` („Entdecken"), `overviewCompletedTitle` („Abgeschlossene Experimente")
- Für DE, EN, ES

### Design-Konventionen
- Sage/Terracotta/Cream Tokens, keine hardcoded Farben
- Fraunces für Titel, Inter für Body
- Keine Warnungen, keine Zahlen-Optimierung – Reflexionsfrage steht im Vordergrund
- Progress-Bar sanft (bg-primary/30 auf bg-secondary)

### Nicht enthalten
- Kein neues Routing
- Keine Änderung am `SelfExperimentsDialog` selbst
- Keine Backend-Änderungen
