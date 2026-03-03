

## Plan: Remove Vague Observations and Insights

### Analysis

I reviewed all 65 observations and all insight messages. Many are philosophical platitudes that don't tell the user anything about their actual behavior. The rule: **keep only items that reflect specific, data-driven patterns back to the user**.

### Observations to REMOVE (25 items)

**Entire "Relationship" category (rel-1 to rel-5)** — generic philosophy, no data connection:
- "Your relationship with this habit is not linear"
- "This habit is part of your everyday—in your own way"
- "What's showing here is not a goal, but a process"
- "This habit is part of your personal rhythm"
- "You engage with this habit without fixed expectations"

**Entire "Meta" category (meta-1 to meta-5)** — self-referential platitudes:
- "Not every observation needs a consequence"
- "Some things are allowed to simply be seen"
- "This habit isn't telling a story of performance"
- "This is about perception, not progress"
- "This habit is allowed to be just as it is"

**Entire "Open End" category (open-1 to open-5)** — vague, no behavioral mirror:
- "This habit remains open"
- "There is no fixed endpoint for this habit"
- "This habit is a companion, not a project"
- "You don't have to hold on to this habit"
- "This habit is allowed to come and go"

**Individual vague items from other categories:**
- entry-5: "Sometimes things simply begin again"
- change-4: "This habit is in motion"
- change-5: "Something about this habit is changing"
- effort-5: "This habit finds its way"
- quiet-5: "This habit doesn't need to be loud to be there"
- pause-3: "Space is emerging between the moments"

### Observations to KEEP (40 items)
All remaining items in: entry-return (4), weekday-cycle (5), quiet-regularity (4), pause-break (4), conscious-skip (5), change-over-time (3), multi-habit (5), effortless (4) — these all reflect specific detected patterns.

### Insights to REMOVE (7 message keys)

**Generic prompt fallbacks** — platitudes triggered when nothing specific is found:
- `prompts.smallMomentsCount` ("Even small moments of practice count as awareness")
- `prompts.patternsNoticing` ("What patterns are you noticing?")
- `prompts.gentleReminder` ("This is a space for observation, not optimization")
- `prompts.celebrateConsistency` ("Notice how some habits have become part of your rhythm")
- `prompts.restIsProgress` ("Rest and pauses are part of the journey too")
- `prompts.energyWavesPeaks` ("Notice the natural rhythm of your energy" — no specific data)

**Overly easy trigger:**
- `patterns.consistentDays` — fires at just 5 days with a generic "Your rhythm has been steady" message. Too low a bar, not insightful.

### Insights to KEEP
- Time anchor patterns (morningAnchor, middayAnchor, eveningAnchor) — specific
- moreCheckinsThisWeek — week-over-week comparison
- consciousSkips — reflects specific user choices
- All correlations (highEnergy, lowEnergy, goodMoodHabit, habitsTogether) — data-driven
- prompts.whatDidHabitBring — tied to a specific habit
- prompts.easiestMoment — tied to a specific habit
- prompts.morningRhythmAligned — personality-aware
- prompts.mostNaturalHabit — kept as single fallback (specific enough)
- prompts.weekReflection — kept as single fallback

### Files to Change
- `src/lib/observations/observation-library.ts` — remove 25 observations, remove unused category helper
- `src/lib/insight-generator.ts` — remove `consistentDays` pattern, remove 6 generic prompt fallbacks, simplify fallback to 2 kept prompts
- `src/lib/i18n/translations.ts` — remove translation keys for deleted items
- `src/types/observations.ts` — remove `relationship`, `meta`, `open-end` from `ObservationCategory` type

