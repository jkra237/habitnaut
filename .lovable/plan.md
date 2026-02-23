

## Stimmungsfarben im Aktivitäten-Kalender

### Was wird gemacht?
Wenn du an einem Tag eine Stimmung festgehalten hast, wird das Kalenderfeld in einer passenden Hintergrundfarbe eingefärbt. Ohne Stimmung bleibt das Feld wie bisher (neutral grau).

### Farbschema (Mood 1-5)
```text
1 (😔 Schwer)    -> Rot         (bg: #fee2e2 / dark: rgba(239,68,68,0.2))
2 (😐 Niedrig)   -> Orange      (bg: #ffedd5 / dark: rgba(249,115,22,0.2))
3 (🙂 Neutral)   -> Gelb        (bg: #fef9c3 / dark: rgba(234,179,8,0.2))
4 (😊 Gut)       -> Hellgrün    (bg: #dcfce7 / dark: rgba(34,197,94,0.2))
5 (✨ Strahlend) -> Dunkelgrün  (bg: #bbf7d0 / dark: rgba(22,163,74,0.25))
```

### Änderungen

**1. `src/components/calendar/ActivityCalendar.tsx`**
- Die `activityMap` wird erweitert, um auch `mood` aus dem jeweiligen `DayEntry` zu speichern
- Eine Hilfsfunktion `getMoodBgColor(mood: number)` liefert die passende Tailwind-Hintergrundklasse
- Im Kalender-Grid: Wenn ein Tag eine Stimmung hat, wird die Mood-Farbe als Hintergrund verwendet (statt dem bisherigen `bg-primary/10` oder `bg-muted/30`)
- Die Aktivitäts-Dots bleiben wie gehabt erhalten
- In der Detailansicht (wenn man auf einen Tag klickt) wird zusätzlich das Stimmungs-Emoji angezeigt
- In der Legende wird eine zusätzliche Zeile mit den 5 Stimmungsfarben hinzugefügt

### Technische Details

Die Mood-Farben werden als inline `style` mit `backgroundColor` gesetzt, um sowohl im Light- als auch Dark-Mode gut auszusehen (mit Transparenz). Die bisherige Dot-Logik für Habits bleibt unverändert bestehen -- die Dots erscheinen weiterhin innerhalb des farbigen Feldes.

Priorität der Hintergrundfarbe:
- Selektiert -> `bg-primary/20` (wie bisher)
- Stimmung vorhanden -> Mood-Farbe
- Habits erledigt (ohne Mood) -> `bg-primary/10` (wie bisher)
- Nichts -> `bg-muted/30` (wie bisher)

