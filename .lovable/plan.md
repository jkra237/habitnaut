

# AddHabitDialog über dem Kalender-Dialog anzeigen

## Problem
Der Kalender-Dialog (radix Dialog) nutzt `z-50`. Der AddHabitDialog hat seinen Backdrop auf `z-40` und den Content auf `z-50` — er erscheint dadurch hinter oder auf gleicher Ebene wie der Kalender-Dialog.

## Lösung
Die z-index Werte im `AddHabitDialog.tsx` erhöhen:
- Backdrop: `z-40` → `z-[60]`
- Content-Container: `z-50` → `z-[70]`

Das stellt sicher, dass der AddHabitDialog immer als oberster Layer erscheint, egal ob er vom Kalender oder direkt geöffnet wird.

### Datei: `src/components/habits/AddHabitDialog.tsx`
- Zeile 72: `z-40` → `z-[60]`
- Zeile 80: `z-50` → `z-[70]`

