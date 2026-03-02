

## Settings aufräumen: "Habits & Reminders" ersetzen

### Problem
- Die Sektion "Habits & Reminders" enthält keine Reminder-Funktion
- Die "Experience"-Einstellungen (Insight-Frequenz, Wochenstart) sind nicht über das Hauptmenü erreichbar
- Die Habits-Unterseite hat nur wenige Einträge

### Lösung
Die Habits-Unterseite wird zur zentralen Einstellungsseite für alle App-Einstellungen (ausser Profil, Sprache, Datenschutz):

1. **Sektionsname ändern**: "Habits & Reminders" wird zu **"App Settings"** (bzw. "App-Einstellungen" / "Configuración")
2. **Experience-Einstellungen integrieren**: Insight-Frequenz und Wochenstart werden in die Habits-Unterseite verschoben
3. **Tägliches Zitat** bleibt dort
4. **Experience-Sektion entfernen** (da alles zusammengeführt wird)

### Aufbau der neuen Unterseite

```text
App-Einstellungen
├── Gewohnheiten: X beobachtet (Y aktiv, Z pausiert)
├── Wochenstart: [Montag] [Sonntag]
├── Tägliches Zitat: [Toggle]
├── Insight-Häufigkeit: [Selten / Gelegentlich / Wöchentlich]
└── Info-Box: Beschreibung der Insight-Typen
```

### Technische Änderungen

**`src/components/settings/Settings.tsx`**:
- Zeile 380: Sektionsüberschrift von `habitsReminders` auf neuen Key ändern
- `renderHabits()`: Experience-Inhalte (Insight-Frequenz, Wochenstart) aus `renderExperience()` hierhin verschieben
- `renderExperience()` kann entfernt werden (wird nirgends aufgerufen)

**`src/lib/i18n/translations.ts`**:
- Sektionsname `habitsReminders` ersetzen durch z.B. `appSettings` mit Übersetzungen:
  - EN: "App Settings"
  - DE: "App-Einstellungen" 
  - ES: "Configuración"
- Habits-Untertitel anpassen (z.B. "Customize your experience" / "Passe dein Erlebnis an" / "Personaliza tu experiencia")
