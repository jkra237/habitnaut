

## Fix: Transparenz beim Scrollen in der Achievements-Ansicht

### Problem
Der sticky Header im Settings-Modal hat keinen `z-index`. Wenn man in der Achievements-Ansicht nach unten scrollt, wird der scrollende Inhalt hinter dem Header sichtbar, was einen transparenten Effekt erzeugt.

### Loesung
Eine einzige Aenderung in `src/components/settings/Settings.tsx` (Zeile 928): Dem sticky Header ein `z-10` hinzufuegen, damit er ueber dem scrollenden Inhalt bleibt.

### Technische Details
- Datei: `src/components/settings/Settings.tsx`
- Zeile 928: `className` von `"sticky top-0 bg-card border-b border-border/50 ..."` aendern zu `"sticky top-0 z-10 bg-card border-b border-border/50 ..."`

