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
