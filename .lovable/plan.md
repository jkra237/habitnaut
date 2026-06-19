## Verbesserungsvorschläge für HabitNaut

### 1. Visueller Hinweis auf aktives Experiment im Dashboard
Der Beaker-Button im Header zeigt aktuell nicht an, wenn ein Experiment läuft. Ein dezenter Punkt oder eine sanfte Animation würde den Nutzer subtil daran erinnern, ohne aufdringlich zu sein.

### 2. Kategorisierte Experiment-Bibliothek
Die 30 Experiment-Ideen sind aktuell als flaches Grid angezeigt. Eine Gruppierung nach Bereichen (Morgen, Ruhe, Bewegung, Fokus, Abend, Beziehungen) würde die Auswahl übersichtlicher machen und dem Nutzer helfen, passende Experimente schneller zu finden.

### 3. „Experiment wieder aufwecken“ Funktion
Analog zu „ruhende Gewohnheiten“ (wakeHabit) fehlt ein `wakeExperiment`, das ein ruhendes Experiment fortsetzen lässt. Aktuell werden ruhende Experimente in der UI gar nicht angezeigt.

### 4. Kleiner Fortschrittsbalken im aktiven Experiment
Statt nur „Tag 5 von 14“ könnte ein sanfter visueller Fortschrittsbalken das Zeitgefühl unterstützen – bewusst ohne Druck, sondern als sanfte Orientierung.

### 5. Experiment-Hinweis im Onboarding-Abschluss
Die neue Tipp-Box zum Ende des Onboardings könnte auch einen kurzen Hinweis auf die Selbst-Experimente enthalten („Oder starte ein kleines Experiment, um etwas Neues zu beobachten“), damit neue Nutzer das Feature entdecken.

### 6. Button-Labels auf Mobile für bessere Auffindbarkeit
Beaker und Zahnrad im Header haben nur Icons. Auf kleinen Screens könnten kurze Labels („Experimente“, „Einstellungen“) oder zumindest Tooltips die Auffindbarkeit verbessern – besonders für Screenreader-Nutzer.

### 7. Ruhende Experimente in der Übersicht anzeigen
Aktuell filtert die UI auf `active` und `completed`. Ruhende Experimente verschwinden komplett aus dem Dialog. Ein eigener kleiner Abschnitt „Zurzeit ruhend“ würde Konsistenz mit dem Gewohnheiten-System schaffen.

---

### Technische Details (falls gewünscht)
- **Punkt 1**: Zustandsabfrage aus `flownaut-store` im Dashboard-Header, CSS-Punkt oder Ring um Icon.
- **Punkt 2**: `self-experiment-ideas.ts` hat bereits Kategorien, die Gruppierung wäre rein UI-seitig.
- **Punkt 3**: Store-Erweiterung `wakeExperiment` + UI-Integration in `SelfExperimentsDialog`.
- **Punkt 4**: Tailwind-basierter Balken, reines Frontend, keine Datenänderung.
- **Punkt 5**: Erweiterung der Onboarding-Abschluss-Karte um einen zusätzlichen Satz.
- **Punkt 6**: Entweder sichtbare Labels unter den Icons (nur auf Mobile) oder Tooltip-Komponente.
- **Punkt 7**: Filter auf `resting` analog zu `completed` im Dialog.

**Frage an dich**: Welche dieser Punkte sollen priorisiert umgesetzt werden? Alle, oder eine Auswahl?