
## Taegliches Zitat-Feature

### Was sich aendert

Das Personality-Hint-Feld im Dashboard (das aktuell Saetze wie "You come alive as the day winds down" anzeigt) wird durch ein taegliches Zitat mit Urheber ersetzt.

### Rotation-Logik

- Jeden Tag wird **ein** Zitat angezeigt (deterministisch basierend auf dem Datum, nicht zufaellig bei jedem Refresh)
- Jedes Zitat wird nur **einmal** angezeigt, bis alle 300 durchgelaufen sind
- Danach wird der Pool zurueckgesetzt und beginnt von vorn
- Der Zustand (welche Zitate schon gezeigt wurden) wird im persistierten Zustand gespeichert

### Technische Umsetzung

#### 1. Zitat-Datenbank erstellen (`src/lib/quotes/daily-quotes.ts`)

- Alle 300 Zitate als Array mit dreisprachigen Texten (DE, EN, ES) und Urheber
- Typ-Definition: `{ id: number; de: string; en: string; es: string; author: string }`

#### 2. Zitat-Auswahl-Logik (`src/lib/quotes/quote-selector.ts`)

- Funktion `getDailyQuote(shownQuoteIds: number[], language: string)` 
- Nutzt das aktuelle Datum als Seed fuer deterministische Auswahl
- Filtert bereits gezeigte Zitate heraus
- Wenn alle 300 gezeigt: Reset (leere Liste zurueck)
- Gibt Zitat-Text + Urheber in der richtigen Sprache zurueck

#### 3. Store erweitern (`src/store/flownaut-store.ts`)

- Neues Feld `shownQuoteIds: number[]` im State
- Neues Feld `lastQuoteDate: string` (YYYY-MM-DD)
- Aktion `markQuoteShown(quoteId: number, date: string)` 
- Wird automatisch persistiert (Zustand im localStorage)

#### 4. Dashboard anpassen (`src/components/dashboard/Dashboard.tsx`)

- Das Personality-Hint-Feld (Zeilen 88-116) ersetzen
- Neues Design: Zitat-Text in Anfuehrungszeichen + Urheber darunter
- Wird **immer** angezeigt (nicht nur wenn `personality` vorhanden)
- Sprachauswahl basiert auf `preferences.language`

#### 5. Uebersetzungen (`src/lib/i18n/translations.ts`)

- Neue Keys: `dashboard.dailyQuote` (Label/Titel falls gewuenscht)
- Die Zitate selbst sind direkt dreisprachig in der Datenbank

### Design

Das Zitat-Feld behält das bestehende Layout (abgerundete Box mit dezenter Hintergrundfarbe) und zeigt:
- Ein kleines Zitat-Icon (z.B. `Quote` von Lucide)
- Den Zitat-Text in Kursivschrift
- Den Urheber in kleinerer Schrift darunter
