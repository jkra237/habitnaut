// Observation Library - 70+ Gentle Observations
// All observations are non-judgmental, awareness-focused, and never prescriptive

import type { Observation } from '@/types/observations';

export const observations: Observation[] = [
  // ============================================
  // CATEGORY: Entry & Return (Einstieg & Rückkehr)
  // ============================================
  {
    id: 'entry-1',
    category: 'entry-return',
    conditions: { patternType: 'soft-return', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'You returned to this habit—without rushing.',
      de: 'Du bist zu dieser Gewohnheit zurückgekehrt – ohne Eile.',
      es: 'Has vuelto a este hábito, sin prisa.',
    },
  },
  {
    id: 'entry-2',
    category: 'entry-return',
    conditions: { patternType: 'soft-return', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit found space again.',
      de: 'Diese Gewohnheit hat wieder Raum gefunden.',
      es: 'Este hábito ha encontrado espacio de nuevo.',
    },
  },
  {
    id: 'entry-3',
    category: 'entry-return',
    conditions: { patternType: 'soft-return', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'After a pause, you reconnected here.',
      de: 'Nach einer Pause hast du hier wieder angeknüpft.',
      es: 'Después de una pausa, has reconectado aquí.',
    },
  },
  {
    id: 'entry-4',
    category: 'entry-return',
    conditions: { patternType: 'soft-return', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'You picked up this habit again, in your own way.',
      de: 'Du hast diese Gewohnheit erneut aufgegriffen, auf deine Weise.',
      es: 'Has retomado este hábito a tu manera.',
    },
  },
  {
    id: 'entry-5',
    category: 'entry-return',
    conditions: { patternType: 'multiple-restart', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'Sometimes things simply begin again.',
      de: 'Manchmal beginnt etwas einfach wieder.',
      es: 'A veces las cosas simplemente vuelven a empezar.',
    },
  },

  // ============================================
  // CATEGORY: Rhythm & Time (Rhythmus & Zeit)
  // ============================================
  {
    id: 'rhythm-1',
    category: 'rhythm-time',
    conditions: { patternType: 'same-time', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'This habit seems to show up more easily at certain times of day.',
      de: 'Diese Gewohnheit scheint sich zu bestimmten Tageszeiten leichter zu zeigen.',
      es: 'Este hábito parece aparecer más fácilmente a ciertas horas del día.',
    },
  },
  {
    id: 'rhythm-2',
    category: 'rhythm-time',
    conditions: { patternType: 'same-time', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'There is a time of day that welcomes this habit especially.',
      de: 'Es gibt eine Tageszeit, die dieser Gewohnheit besonders entgegenkommt.',
      es: 'Hay un momento del día que acoge especialmente este hábito.',
    },
  },
  {
    id: 'rhythm-3',
    category: 'rhythm-time',
    conditions: { patternType: 'varied-time', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'This habit spreads freely across the day.',
      de: 'Diese Gewohnheit verteilt sich frei über den Tag.',
      es: 'Este hábito se distribuye libremente a lo largo del día.',
    },
  },
  {
    id: 'rhythm-4',
    category: 'rhythm-time',
    conditions: { patternType: 'same-time', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'Some times invite this habit more than others.',
      de: 'Manche Zeiten laden diese Gewohnheit mehr ein als andere.',
      es: 'Algunos momentos invitan más a este hábito que otros.',
    },
  },
  {
    id: 'rhythm-5',
    category: 'rhythm-time',
    conditions: { patternType: 'varied-time', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: "This habit doesn't follow a fixed time—it comes when it fits.",
      de: 'Diese Gewohnheit folgt keinem festen Zeitpunkt – sie kommt, wenn es passt.',
      es: 'Este hábito no sigue un horario fijo, llega cuando encaja.',
    },
  },

  // ============================================
  // CATEGORY: Weekday & Cycles (Wochentage & Zyklen)
  // ============================================
  {
    id: 'weekday-1',
    category: 'weekday-cycle',
    conditions: { patternType: 'weekday-weekend-diff', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'During the week, this habit shows itself differently than on weekends.',
      de: 'Unter der Woche zeigt sich diese Gewohnheit anders als am Wochenende.',
      es: 'Durante la semana, este hábito se muestra de forma diferente que los fines de semana.',
    },
  },
  {
    id: 'weekday-2',
    category: 'weekday-cycle',
    conditions: { patternType: 'weekday-weekend-diff', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Certain days seem to give this habit more room.',
      de: 'Bestimmte Tage scheinen dieser Gewohnheit mehr Raum zu geben.',
      es: 'Ciertos días parecen dar más espacio a este hábito.',
    },
  },
  {
    id: 'weekday-3',
    category: 'weekday-cycle',
    conditions: { patternType: 'weekday-weekend-diff', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit appears on similar weekdays.',
      de: 'Diese Gewohnheit taucht an ähnlichen Wochentagen auf.',
      es: 'Este hábito aparece en días de la semana similares.',
    },
  },
  {
    id: 'weekday-4',
    category: 'weekday-cycle',
    conditions: { patternType: 'weekday-weekend-diff', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'The week has its own rhythm for this habit.',
      de: 'Die Woche hat ihren eigenen Rhythmus für diese Gewohnheit.',
      es: 'La semana tiene su propio ritmo para este hábito.',
    },
  },
  {
    id: 'weekday-5',
    category: 'weekday-cycle',
    conditions: { patternType: 'weekday-weekend-diff', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: "This habit adapts to the week's flow.",
      de: 'Diese Gewohnheit passt sich dem Verlauf der Woche an.',
      es: 'Este hábito se adapta al transcurso de la semana.',
    },
  },

  // ============================================
  // CATEGORY: Quiet Regularity (Leise Regelmäßigkeit)
  // ============================================
  {
    id: 'quiet-1',
    category: 'quiet-regularity',
    conditions: { patternType: 'quiet-consistency', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit is quietly present, without fanfare.',
      de: 'Diese Gewohnheit ist still präsent, ohne viel Aufhebens.',
      es: 'Este hábito está presente en silencio, sin aspavientos.',
    },
  },
  {
    id: 'quiet-2',
    category: 'quiet-regularity',
    conditions: { patternType: 'quiet-consistency', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'You meet this habit regularly, without holding on too tight.',
      de: 'Du begegnest dieser Gewohnheit regelmäßig, ohne sie festzuhalten.',
      es: 'Te encuentras con este hábito regularmente, sin aferrarte.',
    },
  },
  {
    id: 'quiet-3',
    category: 'quiet-regularity',
    conditions: { patternType: 'quiet-consistency', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit accompanies you unobtrusively.',
      de: 'Diese Gewohnheit begleitet dich unauffällig.',
      es: 'Este hábito te acompaña discretamente.',
    },
  },
  {
    id: 'quiet-4',
    category: 'quiet-regularity',
    conditions: { patternType: 'quiet-consistency', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'There is a quiet reliability in this habit.',
      de: 'Es gibt eine leise Verlässlichkeit in dieser Gewohnheit.',
      es: 'Hay una fiabilidad silenciosa en este hábito.',
    },
  },
  {
    id: 'quiet-5',
    category: 'quiet-regularity',
    conditions: { patternType: 'quiet-consistency', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: "This habit doesn't need to be loud to be there.",
      de: 'Diese Gewohnheit muss nicht laut sein, um da zu sein.',
      es: 'Este hábito no necesita ser ruidoso para estar ahí.',
    },
  },

  // ============================================
  // CATEGORY: Pause & Breaks (Pausen & Unterbrechungen)
  // ============================================
  {
    id: 'pause-1',
    category: 'pause-break',
    conditions: { patternType: 'natural-break', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit is allowed to have pauses.',
      de: 'Diese Gewohnheit darf auch Pausen haben.',
      es: 'Este hábito también puede tener pausas.',
    },
  },
  {
    id: 'pause-2',
    category: 'pause-break',
    conditions: { patternType: 'natural-break', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Not every day invites this habit.',
      de: 'Nicht jeder Tag lädt diese Gewohnheit ein.',
      es: 'No todos los días invitan a este hábito.',
    },
  },
  {
    id: 'pause-3',
    category: 'pause-break',
    conditions: { patternType: 'natural-break', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Space is emerging between the moments.',
      de: 'Hier entsteht Raum zwischen den Momenten.',
      es: 'Aquí surge espacio entre los momentos.',
    },
  },
  {
    id: 'pause-4',
    category: 'pause-break',
    conditions: { patternType: 'natural-break', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit moves at its own tempo.',
      de: 'Diese Gewohnheit bewegt sich in ihrem eigenen Tempo.',
      es: 'Este hábito se mueve a su propio ritmo.',
    },
  },
  {
    id: 'pause-5',
    category: 'pause-break',
    conditions: { patternType: 'natural-break', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Interruptions are part of this flow too.',
      de: 'Auch Unterbrechungen gehören zu diesem Verlauf.',
      es: 'Las interrupciones también forman parte de este flujo.',
    },
  },

  // ============================================
  // CATEGORY: Conscious Skip (Bewusst ausgelassen)
  // ============================================
  {
    id: 'skip-1',
    category: 'conscious-skip',
    conditions: { patternType: 'conscious-skip', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'You consciously chose not to pursue this habit.',
      de: 'Du hast diese Gewohnheit bewusst nicht verfolgt.',
      es: 'Elegiste conscientemente no seguir este hábito.',
    },
  },
  {
    id: 'skip-2',
    category: 'conscious-skip',
    conditions: { patternType: 'conscious-skip' },
    cooldownDays: 10,
    text: {
      en: 'Something else was more important today.',
      de: 'Heute war etwas anderes wichtiger.',
      es: 'Hoy había algo más importante.',
    },
  },
  {
    id: 'skip-3',
    category: 'conscious-skip',
    conditions: { patternType: 'conscious-skip', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'This habit was allowed to rest today.',
      de: 'Diese Gewohnheit durfte heute ruhen.',
      es: 'Este hábito pudo descansar hoy.',
    },
  },
  {
    id: 'skip-4',
    category: 'conscious-skip',
    conditions: { patternType: 'conscious-skip' },
    cooldownDays: 10,
    text: {
      en: 'You set a conscious pause here.',
      de: 'Du hast hier eine bewusste Pause gesetzt.',
      es: 'Has establecido una pausa consciente aquí.',
    },
  },
  {
    id: 'skip-5',
    category: 'conscious-skip',
    conditions: { patternType: 'conscious-skip' },
    cooldownDays: 10,
    text: {
      en: 'Not everything has to happen today.',
      de: 'Nicht alles muss heute stattfinden.',
      es: 'No todo tiene que suceder hoy.',
    },
  },

  // ============================================
  // CATEGORY: Change Over Time (Veränderung über Zeit)
  // ============================================
  {
    id: 'change-1',
    category: 'change-over-time',
    conditions: { patternType: 'slight-increase', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit is showing up a bit more often than before.',
      de: 'Diese Gewohnheit zeigt sich etwas häufiger als zuvor.',
      es: 'Este hábito aparece un poco más a menudo que antes.',
    },
  },
  {
    id: 'change-2',
    category: 'change-over-time',
    conditions: { patternType: 'slight-decrease', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit is appearing a bit less at the moment.',
      de: 'Diese Gewohnheit tritt momentan seltener in Erscheinung.',
      es: 'Este hábito aparece un poco menos en este momento.',
    },
  },
  {
    id: 'change-3',
    category: 'change-over-time',
    conditions: { patternType: 'slight-increase', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'The way you engage with this habit is shifting.',
      de: 'Der Umgang mit dieser Gewohnheit verändert sich.',
      es: 'La forma en que te relacionas con este hábito está cambiando.',
    },
  },
  {
    id: 'change-4',
    category: 'change-over-time',
    conditions: { patternType: 'slight-decrease', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit is in motion.',
      de: 'Diese Gewohnheit befindet sich in Bewegung.',
      es: 'Este hábito está en movimiento.',
    },
  },
  {
    id: 'change-5',
    category: 'change-over-time',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Something about this habit is changing.',
      de: 'Etwas an dieser Gewohnheit ist im Wandel.',
      es: 'Algo en este hábito está cambiando.',
    },
  },

  // ============================================
  // CATEGORY: Multiple Habits (Mehrere Gewohnheiten)
  // ============================================
  {
    id: 'multi-1',
    category: 'multi-habit',
    conditions: { patternType: 'habits-together', requiresMultiHabit: true },
    cooldownDays: 14,
    text: {
      en: '{habitA} and {habitB} often appear together.',
      de: '{habitA} und {habitB} tauchen oft gemeinsam auf.',
      es: '{habitA} y {habitB} suelen aparecer juntos.',
    },
  },
  {
    id: 'multi-2',
    category: 'multi-habit',
    conditions: { patternType: 'habits-together', requiresMultiHabit: true },
    cooldownDays: 14,
    text: {
      en: '{habitA} seems to find space alongside {habitB}.',
      de: '{habitA} scheint neben {habitB} Raum zu finden.',
      es: '{habitA} parece encontrar espacio junto a {habitB}.',
    },
  },
  {
    id: 'multi-3',
    category: 'multi-habit',
    conditions: { patternType: 'habits-together', requiresMultiHabit: true },
    cooldownDays: 14,
    text: {
      en: 'There is a connection between {habitA} and {habitB}.',
      de: 'Es gibt eine Verbindung zwischen {habitA} und {habitB}.',
      es: 'Hay una conexión entre {habitA} y {habitB}.',
    },
  },
  {
    id: 'multi-4',
    category: 'multi-habit',
    conditions: { patternType: 'habits-together', requiresMultiHabit: true },
    cooldownDays: 14,
    text: {
      en: '{habitA} and {habitB} often meet on the same day.',
      de: '{habitA} und {habitB} begegnen sich oft am selben Tag.',
      es: '{habitA} y {habitB} a menudo se encuentran el mismo día.',
    },
  },
  {
    id: 'multi-5',
    category: 'multi-habit',
    conditions: { patternType: 'habits-together', requiresMultiHabit: true },
    cooldownDays: 14,
    text: {
      en: '{habitA} and {habitB} seem to accompany each other.',
      de: '{habitA} und {habitB} scheinen sich gegenseitig zu begleiten.',
      es: '{habitA} y {habitB} parecen acompañarse mutuamente.',
    },
  },

  // ============================================
  // CATEGORY: Sequence (Reihenfolge & Vorbereitung)
  // ============================================
  {
    id: 'seq-1',
    category: 'sequence',
    conditions: { patternType: 'habit-sequence', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit often appears after another.',
      de: 'Diese Gewohnheit taucht oft nach einer anderen auf.',
      es: 'Este hábito suele aparecer después de otro.',
    },
  },
  {
    id: 'seq-2',
    category: 'sequence',
    conditions: { patternType: 'habit-sequence', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Something seems to precede this habit.',
      de: 'Etwas scheint dieser Gewohnheit vorauszugehen.',
      es: 'Algo parece preceder a este hábito.',
    },
  },
  {
    id: 'seq-3',
    category: 'sequence',
    conditions: { patternType: 'habit-sequence', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'This habit follows a certain moment.',
      de: 'Diese Gewohnheit folgt auf einen bestimmten Moment.',
      es: 'Este hábito sigue a un momento determinado.',
    },
  },
  {
    id: 'seq-4',
    category: 'sequence',
    conditions: { patternType: 'habit-sequence', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: 'Some things create space for this habit.',
      de: 'Manche Dinge bereiten Raum für diese Gewohnheit.',
      es: 'Algunas cosas crean espacio para este hábito.',
    },
  },
  {
    id: 'seq-5',
    category: 'sequence',
    conditions: { patternType: 'habit-sequence', requiresHabit: true },
    cooldownDays: 14,
    text: {
      en: "This habit doesn't arise in isolation.",
      de: 'Diese Gewohnheit entsteht nicht isoliert.',
      es: 'Este hábito no surge de forma aislada.',
    },
  },

  // ============================================
  // CATEGORY: Effortless (Mühelosigkeit & Einladung)
  // ============================================
  {
    id: 'effort-1',
    category: 'effortless',
    conditions: { patternType: 'effortless-moment', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'This habit sometimes seems to arise on its own.',
      de: 'Diese Gewohnheit scheint manchmal von selbst zu entstehen.',
      es: 'Este hábito a veces parece surgir por sí solo.',
    },
  },
  {
    id: 'effort-2',
    category: 'effortless',
    conditions: { patternType: 'effortless-moment', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'There are moments when this habit comes easily.',
      de: 'Es gibt Momente, in denen diese Gewohnheit leicht fällt.',
      es: 'Hay momentos en que este hábito resulta fácil.',
    },
  },
  {
    id: 'effort-3',
    category: 'effortless',
    conditions: { patternType: 'effortless-moment', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: "This habit doesn't always need a reminder.",
      de: 'Diese Gewohnheit braucht nicht immer eine Erinnerung.',
      es: 'Este hábito no siempre necesita un recordatorio.',
    },
  },
  {
    id: 'effort-4',
    category: 'effortless',
    conditions: { patternType: 'effortless-moment' },
    cooldownDays: 10,
    text: {
      en: 'Some days simply invite this habit.',
      de: 'Manche Tage laden diese Gewohnheit einfach ein.',
      es: 'Algunos días simplemente invitan a este hábito.',
    },
  },
  {
    id: 'effort-5',
    category: 'effortless',
    conditions: { patternType: 'effortless-moment', requiresHabit: true },
    cooldownDays: 10,
    text: {
      en: 'This habit finds its way.',
      de: 'Diese Gewohnheit findet ihren Weg.',
      es: 'Este hábito encuentra su camino.',
    },
  },

  // ============================================
  // CATEGORY: Relationship (Gesamtbild & Beziehung)
  // ============================================
  {
    id: 'rel-1',
    category: 'relationship',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'Your relationship with this habit is not linear.',
      de: 'Deine Beziehung zu dieser Gewohnheit ist nicht linear.',
      es: 'Tu relación con este hábito no es lineal.',
    },
  },
  {
    id: 'rel-2',
    category: 'relationship',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'This habit is part of your everyday—in your own way.',
      de: 'Diese Gewohnheit gehört zu deinem Alltag – auf deine Weise.',
      es: 'Este hábito forma parte de tu día a día, a tu manera.',
    },
  },
  {
    id: 'rel-3',
    category: 'relationship',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: "What's showing here is not a goal, but a process.",
      de: 'Hier zeigt sich kein Ziel, sondern ein Prozess.',
      es: 'Lo que se muestra aquí no es una meta, sino un proceso.',
    },
  },
  {
    id: 'rel-4',
    category: 'relationship',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'This habit is part of your personal rhythm.',
      de: 'Diese Gewohnheit ist Teil deines persönlichen Rhythmus.',
      es: 'Este hábito forma parte de tu ritmo personal.',
    },
  },
  {
    id: 'rel-5',
    category: 'relationship',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'You engage with this habit without fixed expectations.',
      de: 'Du begegnest dieser Gewohnheit ohne feste Erwartungen.',
      es: 'Te relacionas con este hábito sin expectativas fijas.',
    },
  },

  // ============================================
  // CATEGORY: Meta Observations (Meta-Beobachtungen)
  // ============================================
  {
    id: 'meta-1',
    category: 'meta',
    conditions: { patternType: 'general', minDataDays: 7 },
    cooldownDays: 21,
    text: {
      en: 'Not every observation needs a consequence.',
      de: 'Nicht jede Beobachtung braucht eine Konsequenz.',
      es: 'No toda observación necesita una consecuencia.',
    },
  },
  {
    id: 'meta-2',
    category: 'meta',
    conditions: { patternType: 'general', minDataDays: 7 },
    cooldownDays: 21,
    text: {
      en: 'Some things are allowed to simply be seen.',
      de: 'Manches darf einfach gesehen werden.',
      es: 'Algunas cosas simplemente pueden ser vistas.',
    },
  },
  {
    id: 'meta-3',
    category: 'meta',
    conditions: { patternType: 'general', minDataDays: 7 },
    cooldownDays: 21,
    text: {
      en: "This habit isn't telling a story of performance.",
      de: 'Diese Gewohnheit erzählt keine Leistungsgeschichte.',
      es: 'Este hábito no cuenta una historia de rendimiento.',
    },
  },
  {
    id: 'meta-4',
    category: 'meta',
    conditions: { patternType: 'general', minDataDays: 7 },
    cooldownDays: 21,
    text: {
      en: 'This is about perception, not progress.',
      de: 'Hier geht es um Wahrnehmung, nicht um Fortschritt.',
      es: 'Se trata de percepción, no de progreso.',
    },
  },
  {
    id: 'meta-5',
    category: 'meta',
    conditions: { patternType: 'general', minDataDays: 7 },
    cooldownDays: 21,
    text: {
      en: 'This habit is allowed to be just as it is.',
      de: 'Diese Gewohnheit darf so sein, wie sie gerade ist.',
      es: 'Este hábito puede ser tal como es ahora.',
    },
  },

  // ============================================
  // CATEGORY: Open End (Abschluss & Weite)
  // ============================================
  {
    id: 'open-1',
    category: 'open-end',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'This habit remains open.',
      de: 'Diese Gewohnheit bleibt offen.',
      es: 'Este hábito permanece abierto.',
    },
  },
  {
    id: 'open-2',
    category: 'open-end',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'There is no fixed endpoint for this habit.',
      de: 'Es gibt keinen festen Endpunkt für diese Gewohnheit.',
      es: 'No hay un punto final fijo para este hábito.',
    },
  },
  {
    id: 'open-3',
    category: 'open-end',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'This habit is a companion, not a project.',
      de: 'Diese Gewohnheit ist ein Begleiter, kein Projekt.',
      es: 'Este hábito es un compañero, no un proyecto.',
    },
  },
  {
    id: 'open-4',
    category: 'open-end',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: "You don't have to hold on to this habit.",
      de: 'Du musst diese Gewohnheit nicht festhalten.',
      es: 'No tienes que aferrarte a este hábito.',
    },
  },
  {
    id: 'open-5',
    category: 'open-end',
    conditions: { patternType: 'general', requiresHabit: true },
    cooldownDays: 21,
    text: {
      en: 'This habit is allowed to come and go.',
      de: 'Diese Gewohnheit darf kommen und gehen.',
      es: 'Este hábito puede ir y venir.',
    },
  },
];

export function getObservationById(id: string): Observation | undefined {
  return observations.find(o => o.id === id);
}

export function getObservationsByCategory(category: Observation['category']): Observation[] {
  return observations.filter(o => o.category === category);
}

export function getObservationsByPattern(patternType: Observation['conditions']['patternType']): Observation[] {
  return observations.filter(o => o.conditions.patternType === patternType);
}
