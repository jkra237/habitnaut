

## Habit-Namen zweizeilig anzeigen

Aktuell wird der Habit-Name mit `truncate` abgeschnitten, wenn er zu lang ist. Die Änderung erlaubt bis zu zwei Zeilen.

### Änderung in `src/components/habits/HabitMatrix.tsx`

- Klasse `truncate` entfernen (verhindert Mehrzeiligkeit)
- Stattdessen `line-clamp-2` hinzufügen (begrenzt auf max. 2 Zeilen mit Ellipsis)
- `leading-tight` beibehalten für kompakte Zeilenhöhe

```
// Vorher:
"text-[9px] sm:text-[13px] font-medium text-foreground truncate flex-1 leading-tight text-left"

// Nachher:
"text-[9px] sm:text-[13px] font-medium text-foreground line-clamp-2 flex-1 leading-tight text-left"
```

Eine einzelne Zeile Änderung in einer Datei.

