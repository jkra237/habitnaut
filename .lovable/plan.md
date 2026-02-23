

## Dankbarkeitsjournal: Paginierung der vergangenen Einträge

### Was wird gemacht?
Im Verlaufsbereich des Dankbarkeitsjournals werden nur die letzten 10 vergangenen Einträge angezeigt. Mit "Ältere laden"-Button kann man weitere 10 Einträge nachladen.

### Änderungen in `src/components/gratitude/GratitudeJournal.tsx`

1. Neuen State `visibleCount` einführen (Startwert: 10)
2. Die `pastEntries`-Liste im Verlauf auf `pastEntries.slice(0, visibleCount)` begrenzen
3. Einen "Ältere Einträge laden"-Button am Ende der Liste anzeigen, wenn es mehr Einträge gibt als aktuell sichtbar
4. Beim Klick: `visibleCount` um 10 erhöhen
5. `visibleCount` zurücksetzen wenn der Verlauf geschlossen/geöffnet wird

### Technische Details

- State: `const [visibleCount, setVisibleCount] = useState(10)`
- Anzeige: `pastEntries.slice(0, visibleCount)`
- Button nur sichtbar wenn `visibleCount < pastEntries.length`
- Beim Öffnen/Schließen des Verlaufs wird `visibleCount` auf 10 zurückgesetzt
- Anzeige eines kleinen Zählers: z.B. "5 von 23 Einträgen"

