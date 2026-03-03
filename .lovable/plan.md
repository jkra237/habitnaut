

## Plan: Merge Reflections/Insights into Gentle Observations

### Current State
- **Gentle Observations** (active): Pattern-based, shown in `ObservationCard` at the bottom of the dashboard with the eye icon. Has its own detection, selection, and cooldown logic.
- **Reflections/Insights** (dead code): `generateInsights()` is never called anywhere. `InsightCard` is never imported. The settings UI for frequency exists but controls nothing visible.

### What to Do

**1. Integrate insight generation into the ObservationCard system**
- Modify `use-observations.ts` to also call `generateInsights()` and convert its output into the same format shown in the `ObservationCard`
- Both gentle observations and reflections/insights will appear in the same card slot at the bottom of the dashboard (eye icon area)
- They share the same daily/weekly limits (max 1/day, 3/week)

**2. Respect the "never" frequency setting**
- When `insightFrequency` is set to `'never'`, suppress both observations AND insights in the combined system
- Rename the settings label to cover both (e.g., "Reflections & Observations" / "Reflexionen & Beobachtungen")

**3. Unified display in ObservationCard**
- Extend `ObservationCard` to also render insight-type content (correlations, patterns, prompts) using the same visual style — eye icon, dismissible card, same gradient
- Add a small label distinction at the bottom: either "Gentle Observation" or the insight sub-type label (e.g., "Connection noticed" / "Pattern emerged")

**4. Clean up dead code**
- Remove `InsightCard.tsx` (no longer needed as a separate component)
- Keep `insight-generator.ts` as the logic engine but wire it into the observation hook
- Remove `DEMO_INSIGHTS` export

### Files to Change
- `src/hooks/use-observations.ts` — add insight generation, respect frequency setting
- `src/components/observations/ObservationCard.tsx` — support rendering both types
- `src/components/settings/Settings.tsx` — update label text for the frequency setting
- `src/lib/i18n/translations.ts` — update setting labels in EN/DE/ES
- `src/components/insights/InsightCard.tsx` — delete (dead code)

### Files Unchanged
- `src/lib/insight-generator.ts` — keep as-is, just import from hook
- `src/lib/observations/*` — keep as-is
- `src/components/dashboard/Dashboard.tsx` — no changes needed, `ObservationCard` already in place

