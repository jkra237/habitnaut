

# Feste Uhrzeit für Gewohnheiten

## Übersicht
Jede Gewohnheit bekommt ein optionales Zeitfeld (z.B. "07:30"), das neben dem Habit-Emoji in der Matrix und in den Optionen angezeigt wird.

## Änderungen

### 1. Type erweitern — `src/types/flownaut.ts`
- `Habit` Interface: neues optionales Feld `scheduledTime?: string` (Format "HH:mm")

### 2. Store erweitern — `src/store/flownaut-store.ts`
- `AddHabitOptions`: `scheduledTime?: string` hinzufügen
- `addHabit`: `scheduledTime` beim Erstellen übernehmen
- Neue Action `updateHabitTime(habitId: string, time?: string)` zum nachträglichen Ändern/Entfernen
- `updateHabitRoutine` ggf. erweitern oder separate Funktion

### 3. AddHabitDialog — `src/components/habits/AddHabitDialog.tsx`
- Neuer optionaler Toggle-Button (🕐 Icon) unter dem Routine-Toggle
- Zeigt ein `<input type="time">` Feld an, gestylt passend zum Dialog
- Wert wird beim Submit als `scheduledTime` übergeben

### 4. HabitOptions — `src/components/habits/HabitOptions.tsx`
- Neuer Button "Uhrzeit" mit Clock-Icon, ähnlich wie der Routine-Button
- Aufklappbar mit Time-Input zum Setzen/Ändern/Entfernen der Uhrzeit
- Bestehende Uhrzeit als Badge anzeigen (z.B. "🕐 07:30")

### 5. HabitMatrix — `src/components/habits/HabitMatrix.tsx`
- Wenn `habit.scheduledTime` gesetzt ist: kleine Uhrzeitanzeige (z.B. `07:30`) als dezentes Badge unter oder neben dem Habit-Namen anzeigen
- Styling: `text-[8px] text-muted-foreground` damit es nicht zu viel Platz einnimmt

### 6. Übersetzungen — `src/lib/i18n/translations.ts`
- Neue Keys: `addHabitDialog.time`, `addHabitDialog.setTime`, `addHabitDialog.removeTime`, `addHabitDialog.timeOptional`

### 7. Cloud Sync & Import — `src/lib/cloud-sync.ts`, `src/lib/import-validation.ts`
- `scheduledTime` in Sync-Logik und Import-Validierung aufnehmen

