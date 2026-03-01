

## Achievements-System

### Übersicht
Ein sanftes, nicht-bewertendes Achievement-System mit 30 dauerhaften Achievements, das in einem eigenen Bereich der App lebt. Achievements basieren auf Wochen-Präsenz, gehen nie verloren und zeigen keine Zahlen.

### Neue Dateien

**1. `src/types/achievements.ts`**
- Interface `Achievement` mit: id, key, category (A-F), emoji, unlocked, unlockedAt
- Interface `AchievementDefinition` mit: key, category, emoji, check-Funktion
- Alle 30 Achievement-Keys als Union-Type

**2. `src/lib/achievements/achievement-definitions.ts`**
- Array mit allen 30 Achievement-Definitionen inkl. Emoji und Kategorie-Zuordnung
- Jede Definition enthält eine `check(state: UserState): boolean` Funktion

Die 30 Achievements mit ihrer Prüflogik:

```text
A) Einstieg
  First Step        -> habits.length >= 1
  First Mark        -> mindestens 1 Entry mit 'done'
  Getting Started   -> >= 3 Check-ins (done) insgesamt
  Showing Up        -> 1 Kalenderwoche mit >= 1 done
  Back Again        -> nach 7+ Tagen Pause wieder ein done

B) Wochen-Präsenz
  Quiet Week        -> 1 Woche mit done an >= 3 Tagen
  Gentle Continuity -> 2 verschiedene Wochen mit je >= 1 done
  Still Going       -> 3 verschiedene Wochen mit je >= 1 done
  Soft Rhythm       -> 4 verschiedene Wochen mit je >= 1 done
  Reliable Return   -> >= 2 Pausen (7+ Tage) mit Rückkehr

C) Einzelne Gewohnheiten
  Old Friend        -> 1 Habit >= 30 Tage alt, jede Woche >= 1 done
  Long Companion    -> 1 Habit >= 60 Tage alt, jede Woche >= 1 done
  Steady Presence   -> 1 Habit >= 90 Tage alt, regelmäßig
  Letting It Rest   -> 1 Habit auf isResting gesetzt
  Picking It Up Again -> 1 Habit war resting, jetzt aktiv + done

D) Mehrere Gewohnheiten
  Small Circle      -> 1-2 aktive Habits über 3+ Wochen
  Balanced Set      -> 3-4 aktive Habits über 3+ Wochen
  Focused Practice  -> alle aktiven Habits in 1 Woche done
  Changing Needs    -> >= 1 Habit geruht + neuer Habit angelegt
  Trying Things Out -> >= 4 verschiedene Habits angelegt

E) Muster
  Gentle Pair       -> 2 Habits an >= 5 selben Tagen done
  Supportive Set    -> 3 Habits an >= 3 selben Tagen done
  Recurring Pattern -> wiederkehrendes Wochenmuster (ähnliche Tage)
  Natural Flow      -> Habits ohne softFrequency='daily' trotzdem regelmäßig
  Own Pace          -> unregelmäßig aber über 4+ Wochen präsent

F) Langfristig
  Staying With It   -> App-Nutzung über 4+ Wochen (Entries)
  Quiet Consistency -> 6+ Wochen mit je >= 1 done
  Gentle Commitment -> 8+ Wochen mit Präsenz
  Living With Habits -> 3+ Habits über 60+ Tage
  Aware Practice    -> 10+ Wochen Nutzung
```

**3. `src/lib/achievements/achievement-checker.ts`**
- Funktion `checkAchievements(state: UserState): AchievementKey[]` die alle freigeschalteten Keys zurückgibt
- Interne Hilfsfunktionen für Wochen-Gruppierung, Pausen-Erkennung etc.

**4. `src/components/achievements/AchievementsView.tsx`**
- Vollbild-Overlay (wie Settings), geöffnet über einen Button im Dashboard
- 6 Kategorien als Sektionen (A-F) mit Titel
- Jedes Achievement als Karte: Emoji + Name + kurze Beschreibung
- Freigeschaltet: farbig, mit sanfter Animation
- Noch nicht freigeschaltet: ausgegraut, Name sichtbar, Beschreibung verborgen ("?")
- Kein Fortschrittsbalken, keine Zahlen
- Übersetzungen für EN/DE/ES

### Bestehende Dateien ändern

**5. `src/store/flownaut-store.ts`**
- Neues Feld `unlockedAchievements: string[]` in UserState
- Neue Action `checkAndUnlockAchievements()` die den Checker aufruft und neue Achievements speichert
- In `initialState`: `unlockedAchievements: []`

**6. `src/types/flownaut.ts`**
- `unlockedAchievements: string[]` zu `UserState` hinzufügen

**7. `src/components/dashboard/Dashboard.tsx`**
- Import und Button für Achievements-Bereich (Trophy-Icon neben Settings)
- State `isAchievementsOpen`
- Achievement-Check wird bei jedem Render des Dashboards getriggert (via useEffect)

**8. `src/lib/i18n/translations.ts`**
- Neuer Abschnitt `achievements` mit:
  - Titel ("Achievements" / "Errungenschaften" / "Logros")
  - Kategorie-Namen
  - 30 Achievement-Namen + Beschreibungen in 3 Sprachen

### Technische Details

- Achievements werden bei jedem Dashboard-Mount geprüft (useEffect mit Dependencies auf entries, habits)
- Die Check-Logik ist rein lokal (kein Backend nötig), da alle Daten im Zustand Store liegen
- Unlocked Achievements werden per Zustand persist gespeichert
- Keine Toast/Push-Benachrichtigungen bei neuen Achievements
- Interne Streak-Berechnungen sind erlaubt, werden aber nie als Zahl angezeigt

### Nicht enthalten (bewusst ausgeschlossen)
- Tageszeit-basierte Achievements
- Streak-Zahlen in der UI
- Push-Benachrichtigungen
- Fortschrittsbalken
- Verlustlogik

